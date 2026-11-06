<script setup lang="ts">
import { ArrowUpRight, Download } from "@lucide/vue";

withDefaults(
	defineProps<{
		href: string;
		variant?: "solid" | "outline" | "quiet" | "on-dark";
		external?: boolean;
		icon?: "arrow" | "download" | "none";
		class?: string;
	}>(),
	{
		variant: "outline",
		external: false,
		icon: "arrow"
	}
);
</script>

<template>
	<a :href="href" :target="external ? '_blank' : undefined" :rel="external ? 'noopener noreferrer' : undefined" class="action"
	   :class="[
			{
				'action--solid': variant === 'solid',
				'action--quiet': variant === 'quiet',
				'action--on-dark': variant === 'on-dark'
			},
			$props.class
		]">
		<span><slot/></span>
		<Download v-if="icon === 'download'" class="action__icon" aria-hidden="true"/>
		<ArrowUpRight v-else-if="icon === 'arrow' && external" class="action__icon" aria-hidden="true"/>
	</a>
</template>
