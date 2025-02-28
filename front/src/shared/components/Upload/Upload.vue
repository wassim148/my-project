<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, HTMLAttributes } from 'vue';
import { FILES } from '@/core/constants';
import { cn } from '@/shared/lib/utils';
import { uploadVariant, UploadVariants } from './UploadVariant';
import Dropable from '../Dropable/Dropable.vue';

export type FileUploadProps = {
    modelValue?: File[];
    file?: File
    multiple?: boolean,
    id?: string
    class?: HTMLAttributes['class']
    size?: UploadVariants['size']
};
const props = withDefaults(defineProps<FileUploadProps>(), {
    multiple: false,
    size: 'sm',
    modelValue: () => []
})
const emits = defineEmits<{
    (e: 'update:modelValue', payload: any): void;
    (e: 'setErrors', message: string | string[]): void;
}>();
const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
});


function fileExist(name: string) {
    const files = modelValue.value; // Access modelValue directly
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.name == name) {
            return true;
        }
    }
    return false;
}

const handleFileUpload = async (event: any) => {
    const newFiles = event.target.files;
    const filesArray: File[] = Array.from(newFiles); // Convert to array for easier manipulation
    if (!props.multiple) {
        modelValue.value = filesArray
        return
    }
    filesArray.forEach((file) => {
        if (!fileExist(file.name)) {
            modelValue.value = [...modelValue.value, file]
        }
    });
};

function deleteFile(fileName: string): void {
    modelValue.value = modelValue.value.filter((val: File) => val.name != fileName);
}

function onDrop(e: DragEvent) {
    const newFiles = e.dataTransfer != null ? e.dataTransfer.files : [];
    const filesArray = Array.from(newFiles); // Convert to array for easier manipulation
    if (!props.multiple && filesArray.length + modelValue.value.length > 1) {
        emits('setErrors', 'Maximum of 1 file')
        return
    }
    filesArray.forEach((file) => {
        if (!fileExist(file.name)) {
            modelValue.value = [...modelValue.value, file]
        }
    });
}


const fileList = computed(() => {
    const files = props.modelValue
    const count = files.length
    const data = []

    for (var i = 0; i < count; i++) {
        var file = files[i]
        var metadata = {
            name: file.name,
            type: file.type,
            icon: FILES.ICONS(file.type),
            src: ''
        }
        if ((FILES.ALLOWED_PREVIEW_TYPES as any).includes(file.type)) {
            metadata.src = URL.createObjectURL(file)
        }
        data.push(metadata)
    }
    return data
})


</script>

<template>
    <div>
        <Dropable class="flex items-center justify-center w-full mt-5" @on-drop="onDrop">
            <div :class="cn(uploadVariant({ size }), props.class)">
                <!-- Visible Dropzone -->
                <div class="absolute inset-0 z-10 flex flex-col items-center justify-center">
                    <!-- Your slot content or custom elements -->
                    <slot></slot>
                </div>

                <!-- Hidden Input -->
                <input :id="props.id" @change="handleFileUpload" :multiple="props.multiple" type="file"
                    class="absolute inset-0 z-20 opacity-0 cursor-pointer w-full h-full" />
            </div>
        </Dropable>
        <slot name="FilePreview" :file-list="fileList" @deleteFile="deleteFile"> </slot>
    </div>
</template>

<style scoped></style>
