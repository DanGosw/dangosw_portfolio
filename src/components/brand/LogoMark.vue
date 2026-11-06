<script setup lang="ts">
defineProps<{ class?: string }>();
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		:class="$props.class"
		role="img"
		aria-label="DevRunner"
	>
		<rect width="32" height="32" rx="8" fill="#5E6AD2" />
		<path
			d="M6 23.5 12.5 14l4.2 5.6L21 10.5l5 13"
			fill="none"
			stroke="#ffffff"
			stroke-width="2.2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<circle cx="21" cy="10.5" r="1.8" fill="rgba(255,255,255,0.85)" />
	</svg>
</template>
