import { onMounted, onUnmounted, ref } from 'vue'

function useClickOutside(targetRef: any, callback: () => void) {
    const listener = (event: MouseEvent) => {
        if (!targetRef.value || targetRef.value.contains(event.target as Node)) {
            return
        }
        callback()
    }

    onMounted(() => {
        document.addEventListener('click', listener)
    })

    onUnmounted(() => {
        document.removeEventListener('click', listener)
    })
}

export default useClickOutside
