<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ArrowUp } from "@lucide/vue";
import { profile } from "@/data/profile";

const { t } = useI18n();
const year = new Date().getFullYear();

</script>

<template>
	<footer style="background: var(--dark-section-bg); color: var(--dark-section-fg);">
		<div class="shell py-6">
			<div class="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between"
			     style="border-top: 1px solid rgba(240, 240, 248, 0.1);">
				<p class="meta" style="color: rgba(240, 240, 248, 0.75);"> © {{ year }} {{ profile.name }}. {{ t("footer.rights") }} </p>
				<p class="meta" style="color: rgba(240, 240, 248, 0.75);">{{ t("footer.built") }}</p>
				<a href="#home" class="meta inline-flex items-center gap-2 transition-colors" style="color: rgba(240, 240, 248, 0.75);"
				   onmouseenter="this.style.color='var(--accent-soft)'" onmouseleave="this.style.color='rgba(240, 240, 248, 0.75)'">
					<ArrowUp class="h-3.5 w-3.5" aria-hidden="true"/>
					{{ t("footer.top") }}
				</a>
			</div>
		</div>
	</footer>
</template>
