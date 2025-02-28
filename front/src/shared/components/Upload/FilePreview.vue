<script setup lang="ts">
import { createReusableTemplate, useVModel } from '@vueuse/core';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { FILES } from '@/core/constants';
import Button from '../ui/button/Button.vue';
import Dialog from '../ui/dialog/Dialog.vue';
import DialogTrigger from '../ui/dialog/DialogTrigger.vue';
import DialogContent from '../ui/dialog/DialogContent.vue';
import DialogHeader from '../ui/dialog/DialogHeader.vue';
import DialogTitle from '../ui/dialog/DialogTitle.vue';
import DialogDescription from '../ui/dialog/DialogDescription.vue';
import DialogFooter from '../ui/dialog/DialogFooter.vue';

export type FileUploadProps = {
    fileList: {
        name: string;
        type: string;
        icon: string;
        src: string;
    }[]
}

const props = withDefaults(defineProps<FileUploadProps>(), {
    fileList: () => [] as {
        name: string;
        type: string;
        icon: string;
        src: string;
    }[]
})

const emits = defineEmits<{
    (e: 'delete', payload: string): void
}>()


function deleteItem(name: string) {
    const fileData = props.fileList.find((val) => val.name == name)
    if (fileData != undefined)
        URL.revokeObjectURL(fileData.src)
    emits('delete', name)
}
</script>
<template>
    <div class="flex flex-col w-full">
        <div class="flex flex-row w-full pt-5 pr-5 items-center" v-for="file in props.fileList">
            <div class="flex-1 flex items-center">
                <img v-if="file.src != ''" :src="file.src" :alt="file.name" :title="file.name" class="h-6 w-6" />
                <Icon v-else :icon="file.icon" class="text-primary h-6 w-6"></Icon>
                <span class="font-normal text-xs text-primary pl-3">
                    {{ file.name }}
                </span>
            </div>
            <div class="flex items-center">
                <Dialog v-if="file.src != ''">
                    <DialogTrigger as-child>
                        <Button variant="ghost" type="button">
                            <Icon icon="ph:eye" class="text-secondary-foreground h-4 w-6"></Icon>
                        </Button>

                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle class="text-sm">{{ file.name }}</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <img :src="file.src" :alt="file.name" :title="file.name" />
                        <DialogFooter>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Button variant="ghost" type="button" @click="deleteItem(file.name)">
                    <Icon icon="ph:trash-duotone" class="text-destructive h-4 w-6"></Icon>
                </Button>
            </div>
        </div>
    </div>
</template>