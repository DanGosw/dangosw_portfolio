export interface SocialLink {
	id: "email" | "linkedin" | "github" | "whatsapp";
	href: string;
	handle: string;
	external: boolean;
}

export interface CvLink {
	id: "cvEs" | "cvEn";
	href: string;
	lang: "es" | "en";
}

export const profile = {
	name: "Daniel Paredes Mendoza",
	alias: "DevRunner",
	email: "dannyslowgoswell@gmail.com",
	phone: "+51 912 117 458",
	phoneRaw: "+51912117458",
	whatsappHref: "https://wa.me/51912117458",
	website: "https://dangosw.netlify.app/",
	location: {
		city: "Moyobamba",
		region: "San Martín",
		country: "Perú"
	},
	stack: [
		"Vue 3",
		"TypeScript",
		"Tailwind CSS",
		"Vite",
		"Pinia",
		"PrimeVue",
		"Naive UI",
		"Apache ECharts",
		"Shadcn/Vue"
	],
	socials: [
		{
			id: "email",
			href: "mailto:dannyslowgoswell@gmail.com",
			handle: "dannyslowgoswell@gmail.com",
			external: false
		},
		{
			id: "whatsapp",
			href: "https://wa.me/51912117458",
			handle: "+51 912 117 458",
			external: true
		},
		{
			id: "linkedin",
			href: "https://www.linkedin.com/in/daniel-paredes-a17b89344/",
			handle: "daniel-paredes",
			external: true
		},
		{
			id: "github",
			href: "https://github.com/DanGosw",
			handle: "DanGosw",
			external: true
		}
	] satisfies SocialLink[],
	cvs: [
		{
			id: "cvEs",
			href: "/cv/Daniel_Paredes_Desarrollador_Frontend_ES.pdf",
			lang: "es"
		},
		{
			id: "cvEn",
			href: "/cv/Daniel_Paredes_Frontend_Developer_EN.pdf",
			lang: "en"
		}
	] satisfies CvLink[]
};

export function getCvHref(locale: string) {
	return (
		profile.cvs.find((cv) => cv.lang === locale)?.href ?? profile.cvs[0].href
	);
}
