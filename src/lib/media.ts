import manifest from "@/data/media.generated.json";

export interface MediaImage {
	base: string;
	width: number;
	height: number;
	blur: string;
	variants: number[];
}

type MediaFormat = "avif" | "webp";

const media = manifest as {
	profile: MediaImage;
	projects: Record<string, MediaImage[]>;
};

export function getProfileImage(): MediaImage {
	return media.profile;
}

export function getProjectImages(folder: string): MediaImage[] {
	return media.projects[folder] ?? [];
}

export function srcSet(image: MediaImage, format: MediaFormat): string {
	return image.variants
		.map((width) => `${image.base}-${width}.${format} ${width}w`)
		.join(", ");
}

export function fallbackSrc(image: MediaImage, format: MediaFormat = "webp") {
	return `${image.base}-${image.variants[image.variants.length - 1]}.${format}`;
}

export function thumbnailSrc(image: MediaImage): string {
	const width = image.variants.includes(160) ? 160 : image.variants[0];
	return `${image.base}-${width}.webp`;
}
