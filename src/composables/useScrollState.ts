import { onMounted, onUnmounted, ref } from "vue";

/**
 * Tracks the scroll position once for the header state and active nav item.
 */
export function useScrollState(sectionIds: string[], offset = 140) {
	const activeSection = ref("");
	const isScrolled = ref(false);
	let frame = 0;

	function measure() {
		frame = 0;
		isScrolled.value = window.scrollY > 16;

		let active = "";
		for (const id of sectionIds) {
			const element = document.getElementById(id);
			if (!element) continue;
			if (element.getBoundingClientRect().top <= offset) active = id;
		}
		activeSection.value = active;
	}

	function onScroll() {
		if (frame) return;
		frame = window.requestAnimationFrame(measure);
	}

	onMounted(() => {
		frame = window.requestAnimationFrame(measure);
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
	});

	onUnmounted(() => {
		window.cancelAnimationFrame(frame);
		window.removeEventListener("scroll", onScroll);
		window.removeEventListener("resize", onScroll);
	});

	return { activeSection, isScrolled };
}
