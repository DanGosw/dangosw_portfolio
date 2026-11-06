import { onMounted, ref } from "vue";

export type Theme = "system" | "dark" | "light";

const THEME_KEY = "portfolio_theme";
export const currentTheme = ref<Theme>("system");
export const isDark = ref(false);

function applyTheme(theme: Theme) {
	const root = document.documentElement;
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	if (theme === "dark") {
		root.classList.add("dark");
		root.classList.remove("light");
		isDark.value = true;
	} else if (theme === "light") {
		root.classList.add("light");
		root.classList.remove("dark");
		isDark.value = false;
	} else {
		// System mode
		root.classList.remove("dark");
		root.classList.remove("light");
		isDark.value = prefersDark;
	}
}

export function useTheme() {
	function setTheme(next: Theme) {
		currentTheme.value = next;
		try {
			if (next === "system") {
				localStorage.removeItem(THEME_KEY);
			} else {
				localStorage.setItem(THEME_KEY, next);
			}
		} catch {
			// Storage can be disabled in some environments
		}
		applyTheme(next);
	}

	function cycleTheme() {
		const order: Theme[] = ["system", "dark", "light"];
		const nextIndex = (order.indexOf(currentTheme.value) + 1) % order.length;
		setTheme(order[nextIndex]);
	}

	onMounted(() => {
		try {
			const saved = localStorage.getItem(THEME_KEY) as Theme | null;
			if (saved === "dark" || saved === "light") {
				currentTheme.value = saved;
			} else {
				currentTheme.value = "system";
			}
		} catch {
			currentTheme.value = "system";
		}
		applyTheme(currentTheme.value);

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const listener = () => {
			if (currentTheme.value === "system") {
				applyTheme("system");
			}
		};
		mediaQuery.addEventListener("change", listener);
	});

	return {
		theme: currentTheme,
		isDark,
		setTheme,
		cycleTheme
	};
}
