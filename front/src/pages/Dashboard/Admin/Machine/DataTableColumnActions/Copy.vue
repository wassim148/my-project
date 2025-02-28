<script setup lang="ts">
import { CopyProps } from '@interfaces/table'
import { Piece } from '../columns'
import { useToast } from '@components/ui/toast'
import { ButtonHTMLAttributes, h, ref, watch } from 'vue'
import { copyToClipBoard } from '@lib/utils'
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import PopoverTrigger from '../../ui/popover/PopoverTrigger.vue'
import PopoverContent from '../../ui/popover/PopoverContent.vue'
import Popover from '../../ui/popover/Popover.vue'
const props = defineProps<CopyProps<Piece>>()

const { toast } = useToast()
const isCopied = ref()
let reset: NodeJS.Timeout | undefined
const copy = async () => {
    if (props.table.getSelectedRowModel().rows[0]) {
        if (reset != undefined) {
            isCopied.value = false
            clearTimeout(reset)
        }
        const keyValue: string = props.table.getSelectedRowModel().rows[0].getValue(props.copyKey)
        await copyToClipBoard(keyValue)
        isCopied.value = true
        reset = setTimeout(() => {
            isCopied.value = false
        }, 1500)
    }
}
</script>

<template>
    <div class="relative w-fit">
        <Button variant="ghost" size="icon" @click="copy">
            <Icon icon="ph:copy" />
        </Button>
        <div
            v-if="isCopied"
            class="tooltip text-center absolute top-1 left-11 w-36 bg-background rounded-sm text-sm p-2 shadow-lg"
        >
            Copied {{ props.copyKey }}!
        </div>
    </div>
</template>

<style>
.tooltip::after {
    content: '';
    position: absolute;
    top: 10px; /* Adjust this value to position the triangle */
    left: -10px; /* Adjust this value to center the triangle */
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #fff transparent; /* Use the same color as bg-gray-800 */
    @apply -rotate-90;
}
</style>
