<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const mousePosition = ref({ x: 0, y: 0 });

const handleMouseMove = (e: MouseEvent) => {
	mousePosition.value = {
		x: (e.clientX / window.innerWidth) * 100,
		y: (e.clientY / window.innerHeight) * 100
	};
};

onMounted(() => {
	window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
	window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
	<div class="fixed inset-0 -z-10 overflow-hidden">
		<!-- Gradiente base -->
		<div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/50 to-slate-950"/>

		<!-- Gradiente animado que sigue el mouse -->
		<div class="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
		     :style="{ background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.4) 0%, transparent 50%)`}"/>

		<!-- Blobs animados -->
		<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float"/>
		<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"/>
		<div class="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"/>

		<!-- Grid sutil -->
		<div class="absolute inset-0 opacity-[0.03]"
		     style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"/>
	</div>
</template>

<style scoped>
@keyframes float {
	0%, 100% {
		transform: translate(0, 0) scale(1);
	}
	50% {
		transform: translate(30px, -30px) scale(1.1);
	}
}

@keyframes float-delayed {
	0%, 100% {
		transform: translate(0, 0) scale(1);
	}
	50% {
		transform: translate(-30px, 30px) scale(1.05);
	}
}

@keyframes float-slow {
	0%, 100% {
		transform: translate(0, 0) scale(1);
	}
	50% {
		transform: translate(20px, 20px) scale(1.08);
	}
}

.animate-float {
	animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
	animation: float-delayed 10s ease-in-out infinite;
	animation-delay: 2s;
}

.animate-float-slow {
	animation: float-slow 12s ease-in-out infinite;
	animation-delay: 4s;
}
</style>
