<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollReveal } from "@/composables/useScrollReveal";
import { personalProjects, workProjects } from "@/data/projects";
import ProjectEntry from "@/components/project/ProjectEntry.vue";

const { t } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
const { isVisible } = useScrollReveal(sectionRef);

</script>

<template>
	<section id="projects" class="section" style="border-top: 1px solid var(--border-color);">
		<div class="shell">
			<div ref="sectionRef" class="reveal" :class="{ 'is-visible': isVisible }">
				<div class="grid gap-6 lg:grid-cols-12 lg:gap-10">
					<div class="lg:col-span-4">
						<h2 class="section-title">{{ t("projects.title") }}</h2>
					</div>
					<p class="body-copy max-w-[46ch] self-end lg:col-span-8"> {{ t("projects.lead") }} </p>
				</div>

				<div class="mt-14">
					<h3 class="text-[1.05rem] font-semibold tracking-[-0.02em]" style="color: var(--fg);">
						{{ t("projects.work") }}
					</h3>
					<ProjectEntry v-for="(project, index) in workProjects" :key="project.id" :project="project" :flip="index % 2 === 1"/>
				</div>

				<div class="mt-16">
					<h3 class="text-[1.05rem] font-semibold tracking-[-0.02em]" style="color: var(--fg);">
						{{ t("projects.personal") }}
					</h3>
					<ProjectEntry v-for="project in personalProjects" :key="project.id" :project="project"/>
				</div>
			</div>
		</div>
	</section>
</template>
