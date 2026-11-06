/**
 * Generates responsive AVIF/WebP variants + LQIP blur placeholders.
 *
 * Sources live in media-src/ (not bundled). Output goes to public/media/,
 * and a manifest is written to src/data/media.generated.json.
 *
 * Run: pnpm images
 */
import { readdir, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "media-src", "projects");
const profileSource = path.join(root, "media-src", "profile.jpg");
const outDir = path.join(root, "public", "media");
const manifestPath = path.join(root, "src", "data", "media.generated.json");

const PROJECT_WIDTHS = [160, 480, 800, 1200, 1600];
const PROFILE_WIDTHS = [160, 320, 480, 640, 960];

async function blurDataUrl(image) {
	const buffer = await image
		.clone()
		.resize({ width: 20 })
		.webp({ quality: 35, effort: 4 })
		.toBuffer();

	return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function variantWidths(width, targets) {
	const widths = targets.filter((target) => target < width);
	if (!widths.includes(width)) widths.push(width);
	return [...new Set(widths)].sort((a, b) => a - b);
}

async function emitImage({ image, metadata, basePath, widths, outPath }) {
	const variants = await variantWidths(metadata.width, widths);
	const blur = await blurDataUrl(image);

	await Promise.all(
		variants.flatMap((width) => [
			image
				.clone()
				.resize({ width })
				.avif({ quality: 54, effort: 5, chromaSubsampling: "4:4:4" })
				.toFile(`${outPath}-${width}.avif`),
			image
				.clone()
				.resize({ width })
				.webp({ quality: 80, effort: 5, smartSubsample: true })
				.toFile(`${outPath}-${width}.webp`)
		])
	);

	return {
		base: basePath,
		width: metadata.width,
		height: metadata.height,
		blur,
		variants
	};
}

async function buildProjects() {
	const folders = await readdir(sourceDir, { withFileTypes: true });
	const projects = {};

	for (const folder of folders.filter((entry) => entry.isDirectory())) {
		const folderPath = path.join(sourceDir, folder.name);
		const files = (await readdir(folderPath))
			.filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
			.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

		const outputFolder = path.join(outDir, "projects", folder.name);
		await mkdir(outputFolder, { recursive: true });

		projects[folder.name] = [];

		for (const file of files) {
			const id = path.parse(file).name;
			const outPath = path.join(outputFolder, id);
			const image = sharp(path.join(folderPath, file)).rotate();
			const metadata = await image.metadata();

			projects[folder.name].push(
				await emitImage({
					image,
					metadata,
					basePath: `/media/projects/${folder.name}/${id}`,
					widths: PROJECT_WIDTHS,
					outPath
				})
			);

			process.stdout.write(`  ${folder.name}/${file}\n`);
		}
	}

	return projects;
}

async function buildProfile() {
	const outputFolder = path.join(outDir, "profile");
	await mkdir(outputFolder, { recursive: true });

	const image = sharp(profileSource).rotate();
	const metadata = await image.metadata();
	const outPath = path.join(outputFolder, "profile");

	const profile = await emitImage({
		image,
		metadata,
		basePath: "/media/profile/profile",
		widths: PROFILE_WIDTHS,
		outPath
	});

	await image
		.clone()
		.resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
		.jpeg({ quality: 82, mozjpeg: true })
		.toFile(path.join(root, "public", "og-cover.jpg"));

	return profile;
}

async function main() {
	if (!existsSync(sourceDir)) {
		throw new Error(`Missing source folder: ${sourceDir}`);
	}

	await rm(outDir, { recursive: true, force: true });
	await mkdir(outDir, { recursive: true });

	process.stdout.write("Optimizing profile image\n");
	const profile = await buildProfile();

	process.stdout.write("Optimizing project screenshots\n");
	const projects = await buildProjects();

	await writeFile(
		manifestPath,
		`${JSON.stringify({ profile, projects }, null, 2)}\n`,
		"utf8"
	);

	process.stdout.write(`\nManifest written to ${path.relative(root, manifestPath)}\n`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
