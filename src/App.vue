<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue"
import AppBodyContent from "./components/AppBodyContent.vue"
import AppFooter from "./components/AppFooter.vue"
import AnimatedBackground from "./components/AnimatedBackground.vue"
</script>

<template>
<AnimatedBackground />
<div class="app-layout relative z-10">
<AppHeader />
<AppBodyContent />
<AppFooter />
</div>
</template>
