<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const stack = [
	{ key: "vue" },
	{ key: "typeScript" },
	{ key: "javaScript" },
	{ key: "tailwind" },
	{ key: "vite" },
	{ key: "saas" },
	{ key: "uiArchitecture" },
	{ key: "shadcn" },
	{ key: "primevue" },
	{ key: "naiveUI" }
];
</script>

<template>
	<section id="home" class="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 lg:gap-14 min-h-[55vh]">
		<!-- Profile -->
		<div class="relative shrink-0 hero-animate hero-animate-delay-1">
			<div class="absolute inset-0 rounded-full blur-3xl bg-indigo-500/20 scale-110 animate-glow"/>
			<div
				class="relative bg-[url(/temp-pic.jpg)] bg-cover bg-center h-40 w-40 md:h-56 md:w-56 rounded-full border-2 border-slate-700/50 shadow-2xl shadow-indigo-500/10"/>
		</div>

		<!-- Content -->
		<div class="space-y-6 max-w-2xl">
			<!-- status -->
			<div class="flex gap-2.5 hero-animate hero-animate-delay-2">
				<span class="text-label"> {{ t("hero.status") }} </span>
				<span class="relative flex size-2.5">
				<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"/>
				<span class="relative inline-flex size-2.5 rounded-full bg-green-500"></span>
				</span>
			</div>

			<!-- title -->
			<div class="space-y-4 hero-animate hero-animate-delay-3">
				<h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
					{{ t("hero.title") }}
					<span class="text-shimmer">.</span>
				</h1>
				<p class="text-lg md:text-xl text-slate-300 leading-relaxed"> {{ t("hero.subtitle") }} </p>
				<p class="text-body-light"> {{ t("hero.description") }} </p>
			</div>

			<!-- stack -->
			<div class="flex flex-wrap gap-2 hero-animate hero-animate-delay-4">
				<div v-for="(item, index) in stack" :key="item.key" class="badge" :class="`delay-${(index + 1) * 100}`">
					{{ t(`stack.${ item.key }`) }}
				</div>
			</div>

			<!-- buttons -->
			<div class="flex gap-4 pt-2 hero-animate hero-animate-delay-5">
				<a href="#projects" class="btn-primary">
					{{ t("hero.viewProjects") }}
				</a>
				<a href="#contact" class="btn-secondary">
					{{ t("hero.contact") }}
				</a>
			</div>
		</div>
	</section>
</template>
