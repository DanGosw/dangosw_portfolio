<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { Mail, Briefcase, Send } from "@lucide/vue";
import socials from "@/data/socials.json";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";

const { t } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const { isVisible } = useScrollAnimation(sectionRef);

const iconMap: Record<string, any> = { Briefcase, GitHubIcon, LinkedInIcon, Mail };

</script>

<template>
	<section ref="sectionRef" class="space-y-8 animate-on-scroll" :class="{ 'is-visible': isVisible }">
		<div class="space-y-2">
			<h2 class="text-page-title">{{ t("contact.title") }}</h2>
			<p class="text-section-subtitle">{{ t("contact.subtitle") }}</p>
		</div>

		<div class="card-bordered p-8 md:p-10 space-y-8">
			<div class="flex items-start gap-4">
				<div class="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shrink-0">
					<Send class="h-5 w-5 text-indigo-400"/>
				</div>
				<div class="space-y-2">
					<p class="text-body text-base leading-relaxed"> {{ t("contact.description") }} </p>
					<p class="text-sm text-slate-500"> {{ t("contact.openTo") }} </p>
				</div>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<a v-for="(social, index) in socials" :key="social.id" :href="social.href" target="_blank" rel="noopener noreferrer"
				   class="social-link animate-fade-up" :class="{ 'is-visible': isVisible, [`delay-${(index + 1) * 100}`]: true }">
					<component :is="iconMap[social.icon]" class="social-link-icon"/>
					<span class="social-link-label"> {{ social.label }} </span>
				</a>
			</div>
		</div>
	</section>
</template>
