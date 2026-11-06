<script setup lang="ts">
import { ArrowUpRight, Copy, MapPin, MessageCircle } from "@lucide/vue";
import { profile } from "@/data/profile";
import { computed, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import ContourField from "@/components/brand/ContourField.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";

const { t } = useI18n();
const copiedEmail = ref(false);
const copiedPhone = ref(false);
const canCopy = typeof navigator !== "undefined" && Boolean(navigator.clipboard);
let emailResetTimer: number | undefined;
let phoneResetTimer: number | undefined;

const socials = profile.socials.filter((social) => social.id !== "email");
const socialIcons = {
	github: GitHubIcon,
	linkedin: LinkedInIcon,
	whatsapp: MessageCircle
} as const;

const copyEmailLabel = computed(() => copiedEmail.value ? t("contact.copied") : t("contact.copyEmail"));
const copyPhoneLabel = computed(() => copiedPhone.value ? t("contact.phoneCopied") : t("contact.copyPhone"));

async function copyEmail() {
	try {
		await navigator.clipboard.writeText(profile.email);
		copiedEmail.value = true;
		window.clearTimeout(emailResetTimer);
		emailResetTimer = window.setTimeout(() => {
			copiedEmail.value = false;
		}, 1800);
	} catch {
		copiedEmail.value = false;
	}
}

async function copyPhone() {
	try {
		await navigator.clipboard.writeText(profile.phone);
		copiedPhone.value = true;
		window.clearTimeout(phoneResetTimer);
		phoneResetTimer = window.setTimeout(() => {
			copiedPhone.value = false;
		}, 1800);
	} catch {
		copiedPhone.value = false;
	}
}

onUnmounted(() => {
	window.clearTimeout(emailResetTimer);
	window.clearTimeout(phoneResetTimer);
});

</script>

<template>
	<section id="contact" class="contact-section on-dark section">
		<ContourField class="contact-contour pointer-events-none absolute -right-40 -top-24 hidden h-168 w-2xl lg:block"
		              :lines="10" :highlight="10" :seed="5"/>
		<div class="shell relative">
			<div class="grid gap-12 lg:grid-cols-12 lg:gap-10">
				<div class="lg:col-span-8">
					<h2 class="section-title">{{ t("contact.title") }}</h2>
					<p class="mt-5 max-w-[44ch] text-[1.02rem] leading-7" style="color: rgba(240, 240, 248, 0.6);">
						{{ t("contact.lead") }}
					</p>

					<div class="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
						<p class="meta">{{ t("contact.emailLabel") }}</p>
						<button v-if="canCopy" type="button"
						        class="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 font-mono text-[0.72rem] underline underline-offset-4 transition-colors"
						        style="color: rgba(240, 240, 248, 0.5); text-decoration-color: rgba(240, 240, 248, 0.25);"
						        onmouseenter="this.style.color='var(--accent-soft)'"
						        onmouseleave="this.style.color='rgba(240, 240, 248, 0.5)'" @click="copyEmail">
							<Copy class="h-3 w-3" aria-hidden="true"/>
							{{ copyEmailLabel }}
						</button>
						<span class="sr-only" aria-live="polite">
							{{ copiedEmail ? t("contact.copied") : "" }}
						</span>
					</div>
					<a class="email-link mt-2" :href="`mailto:${profile.email}`">
						{{ profile.email }}
					</a>

					<div class="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
						<p class="meta">{{ t("contact.phoneLabel") }}</p>
						<button v-if="canCopy" type="button"
						        class="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 font-mono text-[0.72rem] underline underline-offset-4 transition-colors"
						        style="color: rgba(240, 240, 248, 0.5); text-decoration-color: rgba(240, 240, 248, 0.25);"
						        onmouseenter="this.style.color='var(--accent-soft)'"
						        onmouseleave="this.style.color='rgba(240, 240, 248, 0.5)'" @click="copyPhone">
							<Copy class="h-3 w-3" aria-hidden="true"/>
							{{ copyPhoneLabel }}
						</button>
						<span class="sr-only" aria-live="polite">
							{{ copiedPhone ? t("contact.phoneCopied") : "" }}
						</span>
					</div>
					<div class="mt-2 flex flex-wrap items-center gap-3">
						<a class="email-link" :href="`tel:${profile.phoneRaw}`"> {{ profile.phone }} </a>
						<a :href="profile.whatsappHref" target="_blank" rel="noopener noreferrer"
						   class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.74rem] font-medium transition-all"
						   style="background: rgba(34, 197, 94, 0.16); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.3);"
						   onmouseenter="this.style.background='rgba(34, 197, 94, 0.26)'; this.style.borderColor='#4ade80'"
						   onmouseleave="this.style.background='rgba(34, 197, 94, 0.16)'; this.style.borderColor='rgba(74, 222, 128, 0.3)'">
							<MessageCircle class="h-3.5 w-3.5" aria-hidden="true"/>
							{{ t("contact.whatsapp") }}
						</a>
					</div>

					<div class="mt-10">
						<p class="meta">{{ t("contact.cvTitle") }}</p>
						<div class="mt-3 flex flex-wrap gap-x-8 gap-y-2">
							<a v-for="cv in profile.cvs" :key="cv.id" :href="cv.href" target="_blank" rel="noopener noreferrer"
							   class="text-[0.94rem] font-medium underline decoration-1 underline-offset-4 transition-colors"
							   style="color: rgba(240, 240, 248, 0.9); text-decoration-color: rgba(240, 240, 248, 0.3);"
							   onmouseenter="this.style.color='var(--accent-soft)'; this.style.textDecorationColor='var(--accent-soft)'"
							   onmouseleave="this.style.color='rgba(240, 240, 248, 0.9)'; this.style.textDecorationColor='rgba(240, 240, 248, 0.3)'">
								{{ t(`contact.${ cv.id }`) }}
							</a>
						</div>
					</div>
				</div>

				<div class="lg:col-span-4">
					<p class="meta">{{ t("contact.networks") }}</p>
					<ul class="m-0 mt-2 list-none p-0" style="border-bottom: 1px solid rgba(240,240,248,0.1);">
						<li v-for="social in socials" :key="social.id">
							<a class="social-row" :href="social.href" :target="social.external ? '_blank' : undefined"
							   :rel="social.external ? 'noopener noreferrer' : undefined">
								<span class="flex items-center gap-2.5 text-[0.94rem] font-medium">
									<component :is="socialIcons[social.id as keyof typeof socialIcons]" class="h-4 w-4" aria-hidden="true"/>
									{{ t(`contact.${ social.id }`) }}
								</span>
								<span class="social-row__value">
									{{ social.handle }}
									<ArrowUpRight class="h-3.5 w-3.5" aria-hidden="true"/>
								</span>
							</a>
						</li>
					</ul>

					<p class="mt-8 max-w-[30ch] text-[0.92rem] leading-6" style="color: rgba(240, 240, 248, 0.6);">
						{{ t("contact.availability") }}
					</p>
					<p class="meta mt-3 flex items-center gap-2">
						<MapPin class="h-3.5 w-3.5" aria-hidden="true"/>
						{{ t("contact.location") }}
					</p>
				</div>
			</div>
		</div>
	</section>
</template>
