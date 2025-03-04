import { h } from 'vue'

export default {
    quotes: h('h1', { class: 'text-secondary text-lg font-bold' }, [
        '“In the world of manufacturing, every second counts. Our maintenance tracking solution ensures your Users are always in top shape, preventing costly downtimes and keeping your production line running smoothly.',
        h('span', { class: 'text-primary' }, 'Because when your Users thrive, your business does too.'),"”"
    ]),
}
