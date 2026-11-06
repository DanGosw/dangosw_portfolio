<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { getProjectImages } from "@/lib/media";
import type { Project } from "@/data/projects";
import ActionLink from "@/components/ui/ActionLink.vue";
import ProjectGallery from "./ProjectGallery.vue";

const props = defineProps<{
	project: Project;
	flip?: boolean;
}>();

const { t } = useI18n();
const title = computed(() => t(`projects.items.${ props.project.id }.title`));
const description = computed(() => t(`projects.items.${ props.project.id }.description`));
const category = computed(() => t(`projects.categories.${ props.project.categoryKey }`));
const images = computed(() => getProjectImages(props.project.folder));

</script>

<template>
	<article class="border-t border-line py-10 lg:py-14">
		<header class="grid gap-4 lg:grid-cols-12 lg:gap-10">
			<p class="meta lg:col-span-3">{{ category }}</p>
			<div class="lg:col-span-9">
				<h4 class="text-[clamp(1.6rem,3vw,2.35rem)] font-semibold leading-none tracking-[-0.035em]"> {{ title }} </h4>
				<p class="body-copy mt-4 max-w-[62ch] text-[0.98rem]">{{ description }}</p>
			</div>
		</header>

		<div class="mt-7 grid gap-6 lg:grid-cols-12 lg:gap-10">
			<div class="min-w-0 lg:col-span-9" :class="{ 'lg:order-2': flip }">
				<ProjectGallery :images="images" :title="title"/>
			</div>

			<aside class="flex min-w-0 flex-col items-start lg:col-span-3" :class="{ 'lg:order-1': flip }">
				<p class="meta">{{ t("about.stackTitle") }}</p>
				<ul class="project-stack mt-3">
					<li v-for="tech in project.tech" :key="tech">
						<span class="tech-chip">{{ tech }}</span>
					</li>
				</ul>
				<ActionLink :href="project.href" external class="mt-6">
					{{ t("projects.openDemo") }}
				</ActionLink>
			</aside>
		</div>
	</article>
</template>
