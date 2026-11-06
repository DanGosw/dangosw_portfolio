<script setup lang="ts">
import { profile } from "@/data/profile";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollReveal } from "@/composables/useScrollReveal";

const { t } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
const { isVisible } = useScrollReveal(sectionRef);

const capabilityKeys = [ "architecture", "apis", "performance", "business" ] as const;

const records = computed(() => [
	{ label: t("about.record.locationLabel"), value: t("about.record.locationValue") },
	{ label: t("about.record.educationLabel"), value: t("about.record.educationValue") },
	{ label: t("about.record.languagesLabel"), value: t("about.record.languagesValue") },
	{ label: t("about.record.workLabel"), value: t("about.record.workValue") }
]);
</script>

<template>
	<section id="about" class="section" style="border-top: 1px solid var(--border-color);">
		<div class="shell">
			<div ref="sectionRef" class="reveal" :class="{ 'is-visible': isVisible }">
				<div class="grid gap-8 lg:grid-cols-12 lg:gap-10">
					<div class="lg:col-span-4">
						<h2 class="section-title">{{ t("about.title") }}</h2>
					</div>
					<div class="lg:col-span-8">
						<p class="lead">{{ t("about.lead") }}</p>
						<div class="mt-6">
							<p class="body-copy">{{ t("about.p1") }}</p>
							<p class="body-copy">{{ t("about.p2") }}</p>
						</div>
					</div>
				</div>

				<div class="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
					<div class="lg:col-span-4">
						<h3 class="text-[1.05rem] font-semibold tracking-[-0.02em]" style="color: var(--fg);">
							{{ t("about.capabilitiesTitle") }}
						</h3>
					</div>
					<div class="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
						<div v-for="key in capabilityKeys" :key="key" class="capability">
							<h3>{{ t(`about.capabilities.${ key }.title`) }}</h3>
							<p>{{ t(`about.capabilities.${ key }.description`) }}</p>
						</div>
					</div>
				</div>

				<div class="mt-16 grid gap-8 pt-8 lg:grid-cols-12 lg:gap-10" style="border-top: 1px solid var(--border-color);">
					<div class="lg:col-span-4">
						<h3 class="text-[1.05rem] font-semibold tracking-[-0.02em]" style="color: var(--fg);">
							{{ t("about.recordTitle") }}
						</h3>
					</div>
					<div class="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
						<dl class="m-0">
							<div v-for="item in records" :key="item.label" class="record-row">
								<dt>{{ item.label }}</dt>
								<dd>{{ item.value }}</dd>
							</div>
						</dl>
						<div>
							<p class="meta">{{ t("about.stackTitle") }}</p>
							<div class="mt-3 flex flex-wrap gap-1.5">
								<span v-for="tech in profile.stack" :key="tech" class="tech-chip">
									{{ tech }}
								</span>
							</div>
							<p class="mt-5 text-[0.92rem] leading-6" style="color: var(--fg-muted);">
								{{ t("contact.availability") }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
