import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface UseScrollAnimationOptions {
threshold?: number
rootMargin?: string
}

export function useScrollAnimation(
elementRef: Ref<HTMLElement | null>,
options: UseScrollAnimationOptions = {}
) {
const { threshold = 0.15, rootMargin = '0px 0px -80px 0px' } = options
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
if (!elementRef.value) return

observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
// Se repite la animación cada vez que entra/sale del viewport
isVisible.value = entry.isIntersecting
})
},
{ threshold, rootMargin }
)

observer.observe(elementRef.value)
})

onUnmounted(() => {
observer?.disconnect()
})

return { isVisible }
}
