<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { ExternalLink } from "@lucide/vue";

const { t } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const { isVisible } = useScrollAnimation(sectionRef);

const workProjects = [
	{
		gradient: "from-blue-500 to-cyan-500",
		key: "zendaComercial",
		link: "https://demozenda.tsifactur.com",
		tech: [ "Vue", "Vite", "Tailwind", "Naive UI" ]
	},
	{
		gradient: "from-purple-500 to-pink-500",
		key: "zendaPharma",
		link: "https://demofarma.tsifactur.com",
		tech: [ "Vue", "Vite", "Tailwind", "PrimeVue", "Naive UI", "Apache ECharts" ]
	},
	{
		gradient: "from-emerald-500 to-teal-500",
		key: "verydis",
		link: "https://demo.ampaperu.org",
		tech: [ "Vue", "Vite", "Tailwind", "Pinia", "PrimeVue", "Apache ECharts" ]
	},
	{
		gradient: "from-orange-500 to-amber-500",
		key: "flizzy",
		link: "https://demo.flizzy.pe",
		tech: [ "Vue", "Vite", "Tailwind", "Naive UI" ]
	}
];

const personalProjects = [
	{
		gradient: "from-orange-400 to-red-500",
		key: "asTomGas",
		link: "https://biometrictraker.netlify.app/",
		tech: [ "Vue", "Vite", "Tailwind" ]
	}
];
</script>

<template>
	<section ref="sectionRef" class="space-y-12 animate-on-scroll" :class="{ 'is-visible': isVisible }">
		<div class="space-y-2">
			<h2 class="text-page-title">{{ t("projects.title") }}</h2>
		</div>

		<!-- Work Projects -->
		<div class="space-y-4">
			<h3 class="text-lg font-semibold text-indigo-400 uppercase tracking-wider">{{ t("projects.work") }}</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<a v-for="(project, index) in workProjects" :key="project.key" :href="project.link" target="_blank"
				   rel="noopener noreferrer"
				   class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-slate-700 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5 animate-fade-up"
				   :class="{ 'is-visible': isVisible, [`delay-${(index + 1) * 100}`]: true }">
					<div
						:class="`h-36 bg-linear-to-br ${project.gradient} opacity-15 group-hover:opacity-25 transition-opacity duration-500`"/>
					<div class="p-6 -mt-16 relative space-y-4">
						<div class="flex items-start justify-between gap-2">
							<h4 class="text-heading group-hover:text-indigo-400 transition-colors">
								{{ t(`projects.items.${ project.key }.title`) }}</h4>
							<ExternalLink
								class="h-5 w-5 text-slate-500 group-hover:text-indigo-400 transition-all duration-300 shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
						</div>
						<p class="text-body text-sm">{{ t(`projects.items.${ project.key }.description`) }}</p>
						<div class="flex flex-wrap gap-2">
							<span v-for="tech in project.tech" :key="tech" class="badge-tech">{{ tech }}</span>
						</div>
					</div>
				</a>
			</div>
		</div>

		<!-- Personal Projects -->
		<div class="space-y-4">
			<h3 class="text-lg font-semibold text-indigo-400 uppercase tracking-wider">{{ t("projects.personal") }}</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<a v-for="(project, index) in personalProjects" :key="project.key" :href="project.link" target="_blank"
				   rel="noopener noreferrer"
				   class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-slate-700 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5 animate-fade-up"
				   :class="{ 'is-visible': isVisible, [`delay-${(index + 3) * 100}`]: true }">
					<div
						:class="`h-36 bg-linear-to-br ${project.gradient} opacity-15 group-hover:opacity-25 transition-opacity duration-500`"/>
					<div class="p-6 -mt-16 relative space-y-4">
						<div class="flex items-start justify-between gap-2">
							<h4 class="text-heading group-hover:text-indigo-400 transition-colors">
								{{ t(`projects.items.${ project.key }.title`) }}</h4>
							<ExternalLink
								class="h-5 w-5 text-slate-500 group-hover:text-indigo-400 transition-all duration-300 shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
						</div>
						<p class="text-body text-sm">{{ t(`projects.items.${ project.key }.description`) }}</p>
						<div class="flex flex-wrap gap-2">
							<span v-for="tech in project.tech" :key="tech" class="badge-tech">{{ tech }}</span>
						</div>
					</div>
				</a>
			</div>
		</div>
	</section>
</template>
