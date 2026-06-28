<script setup lang="ts">
import { useI18n } from "vue-i18n";
import socials from "@/data/socials.json";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";

const { t } = useI18n();

const footerSocials = socials.filter(s => s.id !== "email");

const iconMap: Record<string, any> = {
	GitHubIcon,
	LinkedInIcon
};

</script>

<template>
	<footer class="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="flex flex-col md:flex-row items-center justify-between gap-4">
				<!-- Logo -->
				<div class="flex items-center gap-3">
					<img src="/devrunner_logo.svg" alt="logo" class="h-7"/>
				</div>

				<!-- Copyright -->
				<p class="text-sm text-slate-500"> {{ t("footer.copyright") }} </p>

				<!-- Social links -->
				<div class="flex items-center gap-4">
					<a v-for="social in footerSocials" :key="social.id" :href="social.href" target="_blank" rel="noopener noreferrer"
					   class="social-link-footer" :aria-label="social.label">
						<component :is="iconMap[social.icon]" class="h-5 w-5"/>
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>
