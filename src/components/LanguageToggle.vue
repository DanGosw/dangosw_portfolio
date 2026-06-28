<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { BookA } from "@lucide/vue";

const { locale } = useI18n();

const toggleLocale = () => {
	locale.value = locale.value === "es" ? "en" : "es";
	localStorage.setItem("locale", locale.value);
};

</script>

<template>
	<button @click="toggleLocale" class="button-language">
		<BookA :size="18"/>
		{{ locale === "es" ? "EN" : "ES" }}
	</button>
</template>

<style scoped>
@import "@/style.css";

.button-language {
	@apply px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 flex items-center justify-center gap-2.5
	dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700
	hover:bg-slate-200 dark:hover:bg-slate-700/50 text-slate-700
	dark:text-slate-300 transition-all duration-300 cursor-pointer
}

</style>