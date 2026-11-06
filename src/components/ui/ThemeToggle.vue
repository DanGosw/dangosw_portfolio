<script setup lang="ts">
import { computed } from "vue";
import { Monitor, Moon, Sun } from "@lucide/vue";
import { useI18n } from "vue-i18n";
import { type Theme, useTheme } from "@/composables/useTheme";

const { theme, setTheme } = useTheme();
const { t } = useI18n();

const options = computed(() => [
	{ id: "system" as Theme, icon: Monitor, label: t("nav.themeSystem") },
	{ id: "light" as Theme, icon: Sun, label: t("nav.themeLight") },
	{ id: "dark" as Theme, icon: Moon, label: t("nav.themeDark") }
]);

</script>

<template>
	<div class="theme-toggle" role="group" :aria-label="t('nav.themeLabel')">
		<button v-for="opt in options" :key="opt.id" type="button" class="theme-toggle__btn" :aria-pressed="theme === opt.id"
		        :title="opt.label" @click="setTheme(opt.id)">
			<component :is="opt.icon" class="h-3.5 w-3.5" aria-hidden="true"/>
			<span class="sr-only">{{ opt.label }}</span>
		</button>
	</div>
</template>

<style scoped>

.theme-toggle {
	display: inline-flex;
	align-items: center;
	border: 1px solid var(--border-color);
	background: var(--surface-raised);
	border-radius: 6px;
	overflow: hidden;
	padding: 2px;
	gap: 2px;
}

.theme-toggle__btn {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.35rem 0.45rem;
	border: 0;
	border-radius: 4px;
	background: transparent;
	color: var(--fg-muted);
	cursor: pointer;
	transition: background-color 160ms ease, color 160ms ease, transform 120ms ease;
}

.theme-toggle__btn:hover {
	color: var(--fg);
	background: var(--accent-muted);
}

.theme-toggle__btn[aria-pressed="true"] {
	background: var(--accent);
	color: #ffffff;
}
</style>
