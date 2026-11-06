export type ProjectId =
	| "zendaComercial"
	| "zendaPharma"
	| "verydis"
	| "flizzy"
	| "asTomGas";

export type ProjectGroup = "work" | "personal";

export interface Project {
	id: ProjectId;
	/** Folder name inside media-src/projects and the generated manifest. */
	folder: string;
	href: string;
	group: ProjectGroup;
	categoryKey: string;
	tech: string[];
}

export const projects: Project[] = [
	{
		id: "zendaComercial",
		folder: "zenda-comercial",
		href: "https://demozenda.tsifactur.com",
		group: "work",
		categoryKey: "retail",
		tech: ["Vue 3", "Vite", "Tailwind", "Naive UI"]
	},
	{
		id: "verydis",
		folder: "verydis",
		href: "https://demo.ampaperu.org",
		group: "work",
		categoryKey: "field",
		tech: ["Vue 3", "Vite", "Tailwind", "Pinia", "PrimeVue", "ECharts"]
	},
	{
		id: "flizzy",
		folder: "flizzy",
		href: "https://demo.flizzy.pe",
		group: "work",
		categoryKey: "pos",
		tech: ["Vue 3", "Vite", "Tailwind", "Naive UI"]
	},
	{
		id: "zendaPharma",
		folder: "zenda-pharma",
		href: "https://demofarma.tsifactur.com",
		group: "work",
		categoryKey: "pharma",
		tech: ["Vue 3", "Vite", "Tailwind", "PrimeVue", "Naive UI", "ECharts"]
	},
	{
		id: "asTomGas",
		folder: "as-tomgas",
		href: "https://biometrictraker.netlify.app/",
		group: "personal",
		categoryKey: "landing",
		tech: ["Vue 3", "Vite", "Tailwind"]
	}
];

export const workProjects = projects.filter((project) => project.group === "work");
export const personalProjects = projects.filter(
	(project) => project.group === "personal"
);
