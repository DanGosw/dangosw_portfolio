<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut, X } from "@lucide/vue";

const props = defineProps<{
	images: string[];
	alt?: string;
}>();

const currentIndex = ref(0);
const isLightbox = ref(false);
const zoomLevel = ref(1);
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });
const dragOffset = ref({ x: 0, y: 0 });
const imagePosition = ref({ x: 0, y: 0 });

const currentImage = computed(() => props.images[currentIndex.value]);
const canZoom = computed(() => zoomLevel.value > 1);

function next() {
	if (currentIndex.value < props.images.length - 1) {
		currentIndex.value++;
	} else {
		currentIndex.value = 0;
	}
	resetZoom();
}

function prev() {
	if (currentIndex.value > 0) {
		currentIndex.value--;
	} else {
		currentIndex.value = props.images.length - 1;
	}
	resetZoom();
}

function goTo(index: number) {
	currentIndex.value = index;
	resetZoom();
}

function openLightbox() {
	isLightbox.value = true;
	resetZoom();
	document.body.style.overflow = "hidden";
}

function closeLightbox() {
	isLightbox.value = false;
	resetZoom();
	document.body.style.overflow = "";
}

function toggleZoom() {
	if (zoomLevel.value === 1) {
		zoomLevel.value = 2.5;
	} else {
		resetZoom();
	}
}

function resetZoom() {
	zoomLevel.value = 1;
	dragOffset.value = { x: 0, y: 0 };
	imagePosition.value = { x: 0, y: 0 };
}

function onWheel(e: WheelEvent) {
	e.preventDefault();
	if (e.deltaY < 0) {
		zoomLevel.value = Math.min(zoomLevel.value + 0.3, 4);
	} else {
		zoomLevel.value = Math.max(zoomLevel.value - 0.3, 1);
	}
	if (zoomLevel.value <= 1) {
		dragOffset.value = { x: 0, y: 0 };
		imagePosition.value = { x: 0, y: 0 };
	}
}

function onMouseDown(e: MouseEvent) {
	if (!canZoom.value) return;
	isDragging.value = true;
	dragStart.value = { x: e.clientX - dragOffset.value.x, y: e.clientY - dragOffset.value.y };
}

function onMouseMove(e: MouseEvent) {
	if (!isDragging.value || !canZoom.value) return;
	dragOffset.value = {
		x: e.clientX - dragStart.value.x,
		y: e.clientY - dragStart.value.y
	};
}

function onMouseUp() {
	isDragging.value = false;
}

function onKeydown(e: KeyboardEvent) {
	if (!isLightbox.value) return;
	if (e.key === "Escape") closeLightbox();
	if (e.key === "ArrowRight") next();
	if (e.key === "ArrowLeft") prev();
	if (e.key === " ") {
		e.preventDefault();
		toggleZoom();
	}
}

onMounted(() => {
	document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
	document.removeEventListener("keydown", onKeydown);
	document.body.style.overflow = "";
});

watch(isLightbox, (val) => {
	if (!val) {
		document.body.style.overflow = "";
	}
});
</script>

<template>
	<div class="slider-container" @click.stop>
		<!-- Slider inline -->
		<div class="relative group cursor-pointer" @click="openLightbox">
			<div class="h-44 overflow-hidden rounded-t-xl bg-slate-950">
				<img
					:src="currentImage"
					:alt="alt || 'Project screenshot'"
					class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					draggable="false"
				/>
			</div>

			<!-- Navigation arrows -->
			<template v-if="images.length > 1">
				<button
					class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
					@click.stop="prev"
				>
					<ChevronLeft class="w-4 h-4" />
				</button>
				<button
					class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
					@click.stop="next"
				>
					<ChevronRight class="w-4 h-4" />
				</button>
			</template>

			<!-- Dots -->
			<div v-if="images.length > 1" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
				<button
					v-for="(_, i) in images"
					:key="i"
					class="w-1.5 h-1.5 rounded-full transition-all duration-300"
					:class="i === currentIndex ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'"
					@click.stop="goTo(i)"
				/>
			</div>

			<!-- Fullscreen badge -->
			<div class="absolute top-2 right-2 w-6 h-6 rounded bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<Maximize2 class="w-3 h-3 text-white" />
			</div>

			<!-- Image counter -->
			<div v-if="images.length > 1" class="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				{{ currentIndex + 1 }} / {{ images.length }}
			</div>
		</div>

		<!-- Lightbox -->
		<Teleport to="body">
			<div
				v-if="isLightbox"
				class="lightbox-overlay"
				@click="closeLightbox"
			>
				<!-- Close button -->
				<button
					class="lightbox-close"
					@click="closeLightbox"
				>
					<X class="w-6 h-6" />
				</button>

				<!-- Zoom controls -->
				<div class="lightbox-zoom-controls">
					<button
						class="lightbox-zoom-btn"
						@click.stop="toggleZoom"
						:title="canZoom ? 'Reducir zoom' : 'Ampliar'"
					>
						<ZoomOut v-if="canZoom" class="w-5 h-5" />
						<ZoomIn v-else class="w-5 h-5" />
					</button>
					<span class="text-white/70 text-xs font-medium min-w-10 text-center">
						{{ Math.round(zoomLevel * 100) }}%
					</span>
				</div>

				<!-- Image container -->
				<div
					class="lightbox-image-container"
					@click.stop
					@mousedown="onMouseDown"
					@mousemove="onMouseMove"
					@mouseup="onMouseUp"
					@mouseleave="onMouseUp"
					@wheel.prevent="onWheel"
				>
					<img
						:src="currentImage"
						:alt="alt || 'Project screenshot'"
						class="lightbox-image"
						:style="{
							transform: `scale(${zoomLevel}) translate(${dragOffset.x / zoomLevel}px, ${dragOffset.y / zoomLevel}px)`,
							cursor: canZoom ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
						}"
						@dblclick.stop="toggleZoom"
						draggable="false"
					/>
				</div>

				<!-- Navigation -->
				<template v-if="images.length > 1">
					<button
						class="lightbox-nav lightbox-nav-left"
						@click.stop="prev"
					>
						<ChevronLeft class="w-8 h-8" />
					</button>
					<button
						class="lightbox-nav lightbox-nav-right"
						@click.stop="next"
					>
						<ChevronRight class="w-8 h-8" />
					</button>
				</template>

				<!-- Bottom bar -->
				<div class="lightbox-bottom" @click.stop>
					<!-- Thumbnails -->
					<div class="flex gap-2 overflow-x-auto px-4 py-2 max-w-full">
						<button
							v-for="(img, i) in images"
							:key="i"
							class="w-12 h-9 rounded overflow-hidden border-2 shrink-0 transition-all duration-200"
							:class="i === currentIndex ? 'border-indigo-400 opacity-100' : 'border-white/20 opacity-50 hover:opacity-75'"
							@click="goTo(i)"
						>
							<img :src="img" class="w-full h-full object-cover" draggable="false"  alt=""/>
						</button>
					</div>
					<div class="text-white/60 text-xs font-medium pb-1">
						{{ currentIndex + 1 }} / {{ images.length }}
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<style scoped>
.slider-container {
	width: 100%;
}
</style>

<style>
/* Lightbox styles - global since Teleport renders outside component */
.lightbox-overlay {
	position: fixed;
	inset: 0;
	z-index: 9999;
	background: rgba(0, 0, 0, 0.95);
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(8px);
	animation: fadeIn 0.2s ease;
}

.lightbox-close {
	position: absolute;
	top: 16px;
	right: 16px;
	z-index: 10;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.1);
	border: none;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.2s;
}

.lightbox-close:hover {
	background: rgba(255, 255, 255, 0.2);
}

.lightbox-zoom-controls {
	position: absolute;
	top: 16px;
	left: 16px;
	z-index: 10;
	display: flex;
	align-items: center;
	gap: 8px;
}

.lightbox-zoom-btn {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.1);
	border: none;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.2s;
}

.lightbox-zoom-btn:hover {
	background: rgba(255, 255, 255, 0.2);
}

.lightbox-image-container {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	overflow: hidden;
	user-select: none;
}

.lightbox-image {
	max-width: 90vw;
	max-height: 80vh;
	object-fit: contain;
	transition: transform 0.2s ease;
	user-select: none;
	will-change: transform;
}

.lightbox-nav {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 10;
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.1);
	border: none;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.2s;
}

.lightbox-nav:hover {
	background: rgba(255, 255, 255, 0.25);
}

.lightbox-nav-left {
	left: 16px;
}

.lightbox-nav-right {
	right: 16px;
}

.lightbox-bottom {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
	padding-top: 24px;
}

@keyframes fadeIn {
	from { opacity: 0; }
	to { opacity: 1; }
}
</style>
