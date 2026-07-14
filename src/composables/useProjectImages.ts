const imageModules = import.meta.glob<{
	default: string;
}>("/src/assets/images/projects/**/*.{png,jpg,jpeg,webp,avif,gif}", { eager: true });

const projectFolders: Record<string, string> = {
	zendaComercial: "zenda-comercial",
	zendaPharma: "zenda-pharma",
	verydis: "verydis",
	flizzy: "flizzy",
	asTomGas: "as-tomgas"
};

export function useProjectImages() {
	function getImages(projectKey: string): string[] {
		const folder = projectFolders[projectKey];
		if (!folder) return [];

		const prefix = `/src/assets/images/projects/${folder}/`;

		return Object.entries(imageModules).filter(([ path ]) => path.startsWith(prefix)).sort(([ a ], [ b ]) => a.localeCompare(b, undefined, { numeric: true })).map(([ , mod ]) => mod.default);
	}

	return { getImages };
}
