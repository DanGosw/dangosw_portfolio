<script setup lang="ts">
import { getCvHref } from "@/data/profile";
import { fallbackSrc, getProfileImage, srcSet } from "@/lib/media";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { MapPin } from "@lucide/vue";
import ContourField from "@/components/brand/ContourField.vue";
import ActionLink from "@/components/ui/ActionLink.vue";

const { t, locale } = useI18n();
const portrait = getProfileImage();
const cvHref = computed(() => getCvHref(locale.value));
const portraitSizes = "(max-width: 1023px) 92vw, 460px";

const record = computed(() => [
	{ label: t("hero.record.experienceLabel"), value: t("hero.record.experienceValue") },
	{ label: t("hero.record.baseLabel"), value: t("hero.record.baseValue") },
	{ label: t("hero.record.focusLabel"), value: t("hero.record.focusValue") },
	{ label: t("hero.record.languagesLabel"), value: t("hero.record.languagesValue") }
]);

</script>

<template>
	<section id="home" class="relative overflow-hidden pb-14 pt-28 lg:pb-20 lg:pt-32">
		<!-- Animated hero gradient -->
		<div class="hero-gradient"/>

		<ContourField class="hero-contour pointer-events-none absolute -right-64 top-16 hidden h-184 w-184 lg:block"
		              :lines="10" :highlight="10" :seed="2"/>

		<div class="shell relative z-10">
			<div class="flex flex-wrap items-center justify-between gap-3 pb-4" style="border-bottom: 1px solid var(--border-color);">
				<p class="meta flex items-center gap-2">
					<MapPin class="h-3.5 w-3.5" aria-hidden="true"/>
					{{ t("hero.location") }}
				</p>
				<p class="meta flex items-center gap-2">
					<span class="h-1.5 w-1.5 rounded-full" style="background: var(--accent);" aria-hidden="true"/>
					{{ t("hero.availability") }}
				</p>
			</div>

			<div class="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-16">
				<div class="flex flex-col lg:col-span-7">
					<h1 class="display">
						<span class="hero-line"><span>{{ t("hero.titleLine1") }}</span></span>
						<span class="hero-line"><span>{{ t("hero.titleLine2") }}</span></span>
						<span class="hero-line"><span>{{ t("hero.titleLine3") }}</span></span>
						<span class="hero-line"><span style="color: var(--accent);">{{ t("hero.titleLine4") }}</span></span>
					</h1>

					<p class="hero-fade body-copy mt-7 max-w-[48ch] text-[1.04rem]"> {{ t("hero.intro") }} </p>

					<div class="hero-fade mt-8 flex flex-wrap items-center gap-3 [animation-delay:0.42s]">
						<ActionLink href="#projects" variant="solid" icon="none">
							{{ t("hero.primaryCta") }}
						</ActionLink>
						<ActionLink :href="cvHref" external icon="download">
							{{ t("hero.secondaryCta") }}
						</ActionLink>
						<ActionLink href="#contact" variant="quiet" icon="none">
							{{ t("hero.tertiaryCta") }}
						</ActionLink>
					</div>
				</div>

				<figure class="hero-portrait m-0 lg:col-span-5 lg:pl-4">
					<div class="relative">
						<div class="hero-portrait-backdrop absolute -right-3 -top-3 hidden h-full w-full lg:block" aria-hidden="true"/>
						<div class="relative p-2"
						     style="border: 1px solid var(--border-color); background: var(--surface); border-radius: 6px;">
							<div class="portrait-frame" :style="{ backgroundImage: `url(${portrait.blur})` }">
								<picture>
									<source type="image/avif" :srcset="srcSet(portrait, 'avif')" :sizes="portraitSizes"/>
									<source type="image/webp" :srcset="srcSet(portrait, 'webp')" :sizes="portraitSizes"/>
									<img :src="fallbackSrc(portrait)" :alt="t('hero.portraitAlt')" :width="portrait.width"
									     :height="portrait.height" fetchpriority="high" loading="eager" decoding="async"/>
								</picture>

								<div class="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-3">
									<span class="font-mono text-[0.68rem] leading-none text-white/90">
										{{ t("hero.portraitCaption") }}
									</span>
								</div>
							</div>
						</div>
					</div>
					<p class="meta mt-4">{{ t("hero.portraitNote") }}</p>
				</figure>
			</div>

			<dl class="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 pt-5 lg:mt-16 lg:grid-cols-4"
			    style="border-top: 1px solid var(--border-color);">
				<div v-for="item in record" :key="item.label">
					<dt class="meta">{{ item.label }}</dt>
					<dd class="mt-1 text-[0.94rem] font-medium leading-snug" style="color: var(--fg);">{{ item.value }}</dd>
				</div>
			</dl>
		</div>
	</section>
</template>
