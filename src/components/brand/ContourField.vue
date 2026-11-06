<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
	defineProps<{
		highlight?: number;
		lines?: number;
		seed?: number;
	}>(),
	{
		highlight: 3,
		lines: 7,
		seed: 0
	}
);

/**
 * Deterministic closed contours. The small radial wobble makes the
 * lines read as a topographic survey rather than perfect circles.
 */
function contourPath(radius: number, seed: number) {
	const centerX = 320;
	const centerY = 320;
	const points = 120;

	const coordinates = Array.from({ length: points }, (_, index) => {
		const angle = (index / points) * Math.PI * 2;
		const wobble =
			1 +
			0.07 * Math.sin(3 * angle + seed) +
			0.045 * Math.sin(5 * angle + seed * 1.7) +
			0.025 * Math.cos(7 * angle + seed * 0.6);

		return [
			centerX + Math.cos(angle) * radius * 1.12 * wobble,
			centerY + Math.sin(angle) * radius * 0.9 * wobble
		] as const;
	});

	return `${ coordinates.map(([ x, y ], index) => `${ index === 0 ? "M" : "L" }${ x.toFixed(1) } ${ y.toFixed(1) }`).join(" ") } Z`;
}

const paths = computed(() =>
	Array.from({ length: props.lines }, (_, index) => ({
		d: contourPath(44 + index * 38, props.seed + index * 1.9),
		accent: index === props.highlight,
		delay: `${ (index * 0.99).toFixed(2) }s`
	}))
);

</script>

<template>
	<svg viewBox="0 0 640 640" fill="none" aria-hidden="true" focusable="false" class="contour-svg">
		<g stroke="currentColor" stroke-width="1.1">
			<path v-for="(path, index) in paths" :key="index" :d="path.d" :class="['contour-line', { 'contour-accent': path.accent }]"
			      :style="{ animationDelay: path.delay }" :stroke-opacity="path.accent ? 0.95 : 0.5"/>
		</g>
		<g stroke="currentColor" stroke-width="1" stroke-opacity="0.45" class="contour-cross">
			<path d="M320 296v48M296 320h48"/>
		</g>
	</svg>
</template>

<style scoped>
.contour-svg {
	transform-origin: 320px 320px;
	animation: contour-drift 26s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate;
	will-change: transform;
}

.contour-line {
	transform-origin: 320px 320px;
	animation: contour-wave 9s ease-in-out infinite alternate;
	transition: stroke-opacity 300ms ease;
}

.contour-cross {
	animation: contour-pulse 6s ease-in-out infinite alternate;
}

@keyframes contour-drift {
	0% {
		transform: rotate(0deg) scale(1);
	}
	50% {
		transform: rotate(4deg) scale(1.03) translate(-4px, 4px);
	}
	100% {
		transform: rotate(-3deg) scale(0.98) translate(3px, -3px);
	}
}

@keyframes contour-wave {
	0% {
		transform: scale(1);
		opacity: 0.8;
	}
	50% {
		transform: scale(1.02);
		opacity: 1;
	}
	100% {
		transform: scale(0.985);
		opacity: 0.75;
	}
}

@keyframes contour-pulse {
	0%, 100% {
		opacity: 0.45;
	}
	50% {
		opacity: 0.85;
	}
}

@media (prefers-reduced-motion: reduce) {
	.contour-svg,
	.contour-line,
	.contour-cross {
		animation: none !important;
	}
}
</style>
