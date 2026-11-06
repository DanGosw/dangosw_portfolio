<script setup lang="ts">
import { profile } from "@/data/profile";
import { Menu, X } from "@lucide/vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollState } from "@/composables/useScrollState";
import LogoMark from "@/components/brand/LogoMark.vue";
import LanguageToggle from "@/components/ui/LanguageToggle.vue";
import ThemeToggle from "@/components/ui/ThemeToggle.vue";

const { t } = useI18n();
const { activeSection, isScrolled } = useScrollState([ "home", "about", "projects", "contact" ]);
const isMenuOpen = ref(false);

const navItems = computed(() => [
	{ id: "about", label: t("nav.about") },
	{ id: "projects", label: t("nav.projects") },
	{ id: "contact", label: t("nav.contact") }
]);

function closeMenu() {
	isMenuOpen.value = false;
}

function onKeydown(event: KeyboardEvent) {
	if (event.key === "Escape") closeMenu();
}

const desktopQuery = window.matchMedia("(min-width: 768px)");

function onDesktopChange(event: MediaQueryListEvent) {
	if (event.matches) closeMenu();
}

// Keep the page underneath from scrolling while the mobile drawer is open.
watch(isMenuOpen, (open) => {
	document.body.style.overflow = open ? "hidden" : "";
});

onMounted(() => {
	document.addEventListener("keydown", onKeydown);
	desktopQuery.addEventListener("change", onDesktopChange);
});

onUnmounted(() => {
	document.removeEventListener("keydown", onKeydown);
	desktopQuery.removeEventListener("change", onDesktopChange);
	document.body.style.overflow = "";
});

</script>

<template>
	<header class="site-header" :data-scrolled="isScrolled">
		<div class="shell">
			<div class="flex h-18 items-center justify-between gap-4">
				<a href="#home" class="flex items-center gap-3 no-underline" style="color: var(--fg);" @click="closeMenu">
					<LogoMark class="h-9 w-9 shrink-0"/>
					<span class="flex flex-col">
						<span class="text-[0.98rem] font-semibold leading-none tracking-[-0.02em]">
							{{ profile.name }}
						</span>
						<span class="meta mt-1 leading-none">{{ profile.alias }}</span>
					</span>
				</a>

				<nav class="hidden items-center gap-7 md:flex" :aria-label="t('nav.label')">
					<a v-for="item in navItems" :key="item.id" :href="`#${item.id}`" class="nav-link"
					   :aria-current="activeSection === item.id ? 'true' : undefined">
						{{ item.label }}
					</a>
				</nav>

				<div class="flex items-center gap-3">
					<p class="meta hidden items-center gap-2 xl:flex">
						<span class="h-1.5 w-1.5 shrink-0 rounded-full" style="background: var(--accent);" aria-hidden="true"/>
						{{ t("hero.availability") }}
					</p>
					<div class="hidden items-center gap-2.5 md:flex">
						<ThemeToggle/>
						<LanguageToggle/>
					</div>
					<button type="button" class="flex h-9 w-9 items-center justify-center md:hidden"
					        style="border: 1px solid var(--border-color); color: var(--fg); background: transparent; border-radius: 6px;"
					        :aria-expanded="isMenuOpen" aria-controls="mobile-navigation"
					        :aria-label="isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')" @click="isMenuOpen = !isMenuOpen">
						<X v-if="isMenuOpen" class="h-5 w-5" aria-hidden="true"/>
						<Menu v-else class="h-5 w-5" aria-hidden="true"/>
					</button>
				</div>
			</div>
		</div>

		<Transition name="menu">
			<div v-show="isMenuOpen" id="mobile-navigation" class="mobile-menu md:hidden">
				<nav class="shell flex h-full flex-col py-6" :aria-label="t('nav.label')">
					<a v-for="(item, index) in navItems" :key="item.id" :href="`#${item.id}`" class="mobile-link" @click="closeMenu">
						{{ item.label }}
						<span aria-hidden="true">{{ String(index + 1).padStart(2, "0") }}</span>
					</a>
					<div class="mt-auto flex flex-col gap-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
						<div class="flex items-center justify-between border-t border-(--border-color) pt-4">
							<span class="meta">{{ t("language.label") }} & {{ t("nav.themeLabel") }}</span>
							<div class="flex items-center gap-2">
								<ThemeToggle/>
								<LanguageToggle/>
							</div>
						</div>
						<p class="meta">{{ t("hero.availability") }}</p>
					</div>
				</nav>
			</div>
		</Transition>
	</header>
</template>
