<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Menu, X } from "@lucide/vue";
import LanguageToggle from "./LanguageToggle.vue";

const { t } = useI18n();

const optionsHeader = computed(() => [
	{ label: t("nav.home"), to: "#home" },
	{ label: t("nav.about"), to: "#about" },
	{ label: t("nav.projects"), to: "#projects" },
	{ label: t("nav.contact"), to: "#contact" }
]);

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
	isScrolled.value = window.scrollY > 50;
	if (isMobileMenuOpen.value) {
		isMobileMenuOpen.value = false;
	}
};

const toggleMobileMenu = () => {
	isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
	isMobileMenuOpen.value = false;
};

onMounted(() => {
	window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
	<header
		:class="[ 'fixed top-0 left-0 right-0 w-full border-b transition-all duration-500 ease-in-out z-50', isScrolled ? 'bg-[#0B1120]/95 backdrop-blur-lg border-slate-800' : 'bg-transparent border-transparent']">
		<nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="h-16 flex items-center justify-between">
				<img src="/devrunner_logo.svg" alt="logo" class="h-9 shrink-0"/>

				<!-- Desktop nav -->
				<ul class="hidden md:flex items-center gap-8">
					<li v-for="header in optionsHeader" :key="header.label" class="nav-link">
						<a :href="header.to">{{ header.label }}</a>
					</li>
				</ul>

				<!-- Right side -->
				<div class="flex items-center gap-3">
					<LanguageToggle/>

					<button @click="toggleMobileMenu" aria-label="Menu"
					        class="md:hidden p-2 rounded-lg border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/30 transition-all duration-300 cursor-pointer">
						<Menu v-if="!isMobileMenuOpen" class="h-5 w-5 text-slate-400"/>
						<X v-else class="h-5 w-5 text-slate-400"/>
					</button>
				</div>
			</div>
		</nav>

		<!-- Mobile menu overlay -->
		<Transition name="fade">
			<div v-show="isMobileMenuOpen" class="md:hidden fixed inset-0 top-16 bg-[#0B1120]/80 backdrop-blur-sm"
			     @click="closeMobileMenu"/>
		</Transition>

		<!-- Mobile menu dropdown -->
		<Transition name="slide-down">
			<div v-show="isMobileMenuOpen"
			     class="md:hidden absolute top-16 left-0 right-0 mx-4 mt-2 rounded-xl border border-slate-800 bg-[#111827]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
				<ul class="py-2">
					<li v-for="header in optionsHeader" :key="header.label">
						<a :href="header.to" @click="closeMobileMenu"
						   class="flex items-center gap-3 py-3.5 px-5 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200 font-medium">
							<span class="text-indigo-500/70 text-sm">#</span>
							{{ header.label }}
						</a>
					</li>
				</ul>
			</div>
		</Transition>
	</header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
	transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
	opacity: 0;
	transform: translateY(-8px) scale(0.98);
}
</style>
