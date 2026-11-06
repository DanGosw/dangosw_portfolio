<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { fallbackSrc, srcSet, thumbnailSrc } from "@/lib/media";
import { ChevronLeft, ChevronRight, X } from "@lucide/vue";
import type { MediaImage } from "@/lib/media";

const props = defineProps<{
	images: MediaImage[];
	title: string;
}>();

const open = defineModel<boolean>("open", { required: true });
const index = defineModel<number>("index", { required: true });

const { t } = useI18n();
const dialogRef = ref<HTMLDialogElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);
let lastFocused: HTMLElement | null = null;

function close() {
	open.value = false;
}

function goTo(next: number) {
	index.value = (next + props.images.length) % props.images.length;
}

function previous() {
	goTo(index.value - 1);
}

function next() {
	goTo(index.value + 1);
}

function onBackdropClick(event: MouseEvent) {
	if (event.target === dialogRef.value) close();
}

function onKeydown(event: KeyboardEvent) {
	if (event.key === "Escape") close();
	if (event.key === "ArrowLeft") previous();
	if (event.key === "ArrowRight") next();
}

function onDialogClose() {
	open.value = false;
	lastFocused?.focus();
}

watch(open, async(isOpen) => {
	const dialog = dialogRef.value;
	if ( !dialog) return;

	if (isOpen) {
		lastFocused = document.activeElement as HTMLElement | null;
		if ( !dialog.open) dialog.showModal();
		await nextTick();
		closeButtonRef.value?.focus();
	} else if (dialog.open) {
		dialog.close();
	}
});
</script>

<template>
	<dialog ref="dialogRef" class="lightbox on-dark" :aria-label="t('projects.lightboxLabel', { title })" @close="onDialogClose"
	        @click="onBackdropClick" @keydown="onKeydown">
		<!-- Mounted only while open so closed galleries never fetch full-size images. -->
		<template v-if="open">
			<div class="lightbox__bar">
				<div class="flex items-center gap-3">
					<p class="meta font-medium tracking-tight" style="color: #ffffff;">{{ title }}</p>
					<span class="rounded-full px-2 py-0.5 font-mono text-[0.68rem]"
					      style="background: rgba(94, 106, 210, 0.2); color: var(--accent-soft); border: 1px solid rgba(94, 106, 210, 0.3);">
						{{ index + 1 }} / {{ images.length }}
					</span>
				</div>

				<div class="flex items-center gap-3">
					<!-- Prominent Close Button with Keyboard Hint -->
					<button ref="closeButtonRef" type="button" class="lightbox-close-btn" :aria-label="t('projects.close')" @click="close">
						<X class="h-4 w-4" aria-hidden="true"/>
						<span class="text-[0.78rem] font-medium">{{ t("projects.close") }}</span>
						<kbd class="lightbox-close-kbd">ESC</kbd>
					</button>
				</div>
			</div>

			<div class="lightbox__stage">
				<button v-if="images.length > 1" type="button" class="lightbox__nav lightbox__nav--prev"
				        :aria-label="t('projects.previous')" @click="previous">
					<ChevronLeft class="h-6 w-6" aria-hidden="true"/>
				</button>

				<picture class="flex h-full min-h-0 w-full items-center justify-center">
					<source type="image/avif" :srcset="srcSet(images[index], 'avif')" sizes="92vw"/>
					<source type="image/webp" :srcset="srcSet(images[index], 'webp')" sizes="92vw"/>
					<img class="lightbox__image" :src="fallbackSrc(images[index])" :alt="`${title} — ${index + 1}`"
					     :width="images[index].width" :height="images[index].height" loading="eager" decoding="async"/>
				</picture>

				<button v-if="images.length > 1" type="button" class="lightbox__nav lightbox__nav--next" :aria-label="t('projects.next')"
				        @click="next">
					<ChevronRight class="h-6 w-6" aria-hidden="true"/>
				</button>
			</div>

			<div class="lightbox__thumbs">
				<button v-for="(image, thumbIndex) in images" :key="image.base" type="button" class="lightbox__thumb"
				        :aria-current="thumbIndex === index ? 'true' : undefined"
				        :aria-label="t('projects.viewImage', { current: thumbIndex + 1, total: images.length })" @click="goTo(thumbIndex)">
					<img :src="thumbnailSrc(image)" alt="" width="64" height="40" loading="lazy" decoding="async"/>
				</button>
			</div>
		</template>
	</dialog>
</template>

<style scoped>
.lightbox-close-btn {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.45rem 0.85rem;
	border-radius: 8px;
	border: 1px solid rgba(240, 240, 248, 0.2);
	background: rgba(255, 255, 255, 0.08);
	color: #ffffff;
	cursor: pointer;
	transition: all 180ms ease;
	backdrop-filter: blur(10px);
}

.lightbox-close-btn:hover {
	background: var(--accent);
	border-color: var(--accent);
	box-shadow: 0 0 16px rgba(94, 106, 210, 0.5);
	transform: translateY(-1px);
}

.lightbox-close-kbd {
	display: inline-block;
	padding: 0.1rem 0.35rem;
	border-radius: 4px;
	border: 1px solid rgba(255, 255, 255, 0.25);
	background: rgba(0, 0, 0, 0.35);
	font-family: var(--font-mono), serif;
	font-size: 0.65rem;
	line-height: 1;
	opacity: 0.8;
}
</style>
