<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const options = [ "es", "en" ] as const;

function select(next: (typeof options)[number]) {
	if (locale.value === next) return;
	locale.value = next;
	try {
		localStorage.setItem("locale", next);
	} catch {
		// Storage can be unavailable in private or restricted contexts.
	}
}
</script>

<template>
	<div class="lang-toggle" role="group" :aria-label="t('language.label')">
		<button v-for="option in options" :key="option" type="button" :aria-pressed="locale === option" @click="select(option)">
			{{ option.toUpperCase() }}
		</button>
	</div>
</template>
