<script setup lang="ts">
import { computed, ref } from "vue";
import { Maximize2 } from "@lucide/vue";
import { useI18n } from "vue-i18n";
import { fallbackSrc, srcSet, thumbnailSrc } from "@/lib/media";
import type { MediaImage } from "@/lib/media";
import ImageLightbox from "./ImageLightbox.vue";

const props = defineProps<{
	images: MediaImage[];
	title: string;
}>();

const { t } = useI18n();
const index = ref(0);
const isLightboxOpen = ref(false);

const current = computed(() => props.images[index.value]);
const sizes = "(min-width: 1240px) 900px, (min-width: 1024px) 70vw, 92vw";

</script>

<template>
	<div v-if="current">
		<button type="button" class="gallery-frame" :style="{ backgroundImage: `url(${current.blur})` }"
		        :aria-label="`${t('projects.viewImage', { current: index + 1, total: images.length })}: ${title}`"
		        @click="isLightboxOpen = true">
			<picture>
				<source type="image/avif" :srcset="srcSet(current, 'avif')" :sizes="sizes"/>
				<source type="image/webp" :srcset="srcSet(current, 'webp')" :sizes="sizes"/>
				<img :src="fallbackSrc(current)" :alt="`${title} — ${index + 1}`" :width="current.width" :height="current.height"
				     loading="lazy" decoding="async"/>
			</picture>
			<span class="gallery-frame__hint">
				<Maximize2 class="h-3 w-3" aria-hidden="true"/>
				{{ t("projects.expand") }}
			</span>
		</button>

		<div class="mt-3 flex min-w-0 items-end gap-3">
			<div class="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
				<button v-for="(image, thumbIndex) in images" :key="image.base" type="button" class="thumb"
				        :aria-current="thumbIndex === index ? 'true' : undefined"
				        :aria-label="t('projects.viewImage', { current: thumbIndex + 1, total: images.length })"
				        @click="index = thumbIndex">
					<img :src="thumbnailSrc(image)" alt="" width="68" height="42" loading="lazy" decoding="async"/>
				</button>
			</div>
			<p class="meta ml-auto shrink-0 pb-1">
				{{ String(index + 1).padStart(2, "0") }} / {{ String(images.length).padStart(2, "0") }}
			</p>
		</div>

		<ImageLightbox v-model:open="isLightboxOpen" v-model:index="index" :images="images" :title="title"/>
	</div>
</template>
