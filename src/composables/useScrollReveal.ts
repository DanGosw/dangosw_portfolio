import { onMounted, onUnmounted, ref, type Ref } from "vue";

interface ScrollRevealOptions {
	threshold?: number;
	rootMargin?: string;
}

/**
 * Reveals an element once when it enters the viewport.
 * The class is never removed, so scrolling back up stays calm.
 */
export function useScrollReveal(
	elementRef: Ref<HTMLElement | null>,
	options: ScrollRevealOptions = {}
) {
	const { threshold = 0.12, rootMargin = "0px 0px -60px 0px" } = options;
	const isVisible = ref(false);
	let observer: IntersectionObserver | null = null;

	onMounted(() => {
		if (!elementRef.value) return;

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				isVisible.value = true;
				observer?.disconnect();
			});
		}, { threshold, rootMargin });

		observer.observe(elementRef.value);
	});

	onUnmounted(() => {
		observer?.disconnect();
	});

	return { isVisible };
}
