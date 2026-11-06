<script setup lang="ts">
import { watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import SiteHeader from "@/components/layout/SiteHeader.vue";
import SiteFooter from "@/components/layout/SiteFooter.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import ProjectsSection from "@/components/sections/ProjectsSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";

const { t, locale } = useI18n();

function setMeta(selector: string, content: string) {
	document.querySelector(selector)?.setAttribute("content", content);
}

watchEffect(() => {
	const title = t("meta.title");
	const description = t("meta.description");

	document.documentElement.lang = locale.value;
	document.title = title;

	setMeta('meta[name="description"]', description);
	setMeta('meta[property="og:title"]', title);
	setMeta('meta[property="og:description"]', description);
	setMeta('meta[name="twitter:title"]', title);
	setMeta('meta[name="twitter:description"]', description);
});
</script>

<template>
	<!-- Ambient animated background -->
	<div class="bg-orbs" aria-hidden="true">
		<div class="bg-orb bg-orb--1" />
		<div class="bg-orb bg-orb--2" />
		<div class="bg-orb bg-orb--3" />
	</div>
	<div class="bg-grid" aria-hidden="true" />

	<a class="skip-link" href="#main">{{ t("skip") }}</a>
	<SiteHeader />
	<main id="main">
		<HeroSection />
		<AboutSection />
		<ProjectsSection />
		<ContactSection />
	</main>
	<SiteFooter />
</template>
