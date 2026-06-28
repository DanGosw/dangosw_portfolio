<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { Code2, Palette, Zap, Rocket, GraduationCap, Coffee } from "@lucide/vue";
import AboutMe from "@/components/AboutMe.vue";
import Projects from "@/components/Projects.vue";
import Contact from "@/components/Contact.vue";

const { t } = useI18n();

// Section refs for scroll animation
const aboutRef = ref<HTMLElement | null>(null);
const trajectoryRef = ref<HTMLElement | null>(null);
const skillsRef = ref<HTMLElement | null>(null);
const projectsRef = ref<HTMLElement | null>(null);
const contactRef = ref<HTMLElement | null>(null);

const { isVisible: aboutVisible } = useScrollAnimation(aboutRef);
const { isVisible: trajectoryVisible } = useScrollAnimation(trajectoryRef);
const { isVisible: skillsVisible } = useScrollAnimation(skillsRef);
const { isVisible: projectsVisible } = useScrollAnimation(projectsRef);
const { isVisible: contactVisible } = useScrollAnimation(contactRef);

const skills = [
	{ icon: Code2, titleKey: "about.skillsList.frontend", descKey: "about.skillsList.frontendDesc" },
	{ icon: Palette, titleKey: "about.skillsList.uiux", descKey: "about.skillsList.uiuxDesc" },
	{ icon: Zap, titleKey: "about.skillsList.performance", descKey: "about.skillsList.performanceDesc" },
	{ icon: Rocket, titleKey: "about.skillsList.saas", descKey: "about.skillsList.saasDesc" }
];
</script>

<template>
	<main class="body-app space-y-32">
		<section id="home">
			<AboutMe/>
		</section>

		<!-- Divider -->
		<div class="line-reveal"/>

		<!-- About Section -->
		<section id="about" ref="aboutRef" class="space-y-8 animate-on-scroll" :class="{ 'is-visible': aboutVisible }">
			<h2 class="text-page-title">{{ t("about.title") }}</h2>

			<!-- Trajectory -->
			<div ref="trajectoryRef" class="card p-8 animate-fade-up" :class="{ 'is-visible': trajectoryVisible }">
				<div class="flex items-center gap-3 mb-4">
					<GraduationCap class="h-6 w-6 text-indigo-400"/>
					<h3 class="text-heading">{{ t("about.trajectory") }}</h3>
				</div>
				<p class="text-body text-base leading-8"> {{ t("about.trajectoryP1") }} </p>
				<p class="text-body text-base leading-8 mt-4"> {{ t("about.trajectoryP2") }} </p>
			</div>

			<!-- Skills Grid -->
			<div ref="skillsRef" class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up" :class="{ 'is-visible': skillsVisible }">
				<div v-for="(skill, index) in skills" :key="skill.titleKey"
				     class="card group hover:border-indigo-500/30 transition-all duration-500" :class="`delay-${(index + 1) * 100}`">
					<div class="flex items-start gap-4">
						<div
							class="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
							<component :is="skill.icon" class="h-5 w-5 text-indigo-400"/>
						</div>
						<div class="space-y-1">
							<h4 class="font-semibold text-white">{{ t(skill.titleKey) }}</h4>
							<p class="text-sm text-slate-400 leading-relaxed">{{ t(skill.descKey) }}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Hobbies -->
			<div class="card p-8">
				<div class="flex items-center gap-3 mb-4">
					<Coffee class="h-6 w-6 text-indigo-400"/>
					<h3 class="text-heading">{{ t("about.passions") }}</h3>
				</div>
				<ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<li class="list-item">
						<span class="list-item-marker">▹</span>
						<span>{{ t("about.passionsList.coding") }}</span>
					</li>
					<li class="list-item">
						<span class="list-item-marker">▹</span>
						<span>{{ t("about.passionsList.ui") }}</span>
					</li>
					<li class="list-item">
						<span class="list-item-marker">▹</span>
						<span>{{ t("about.passionsList.opensource") }}</span>
					</li>
					<li class="list-item">
						<span class="list-item-marker">▹</span>
						<span>{{ t("about.passionsList.coffee") }}</span>
					</li>
				</ul>
			</div>
		</section>

		<!-- Divider -->
		<div class="line-reveal"/>

		<!-- Projects Section -->
		<section id="projects" ref="projectsRef" class="animate-on-scroll" :class="{ 'is-visible': projectsVisible }">
			<Projects/>
		</section>

		<!-- Divider -->
		<div class="line-reveal"/>

		<!-- Contact Section -->
		<section id="contact" ref="contactRef" class="animate-on-scroll" :class="{ 'is-visible': contactVisible }">
			<Contact/>
		</section>
	</main>
</template>
