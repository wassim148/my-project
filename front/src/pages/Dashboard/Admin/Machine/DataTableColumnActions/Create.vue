<script lang="ts" setup>
import { Button } from '@components/ui/button'
import { Icon } from '@iconify/vue'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@components/ui/drawer'
import { Input } from '@components/ui/input'
import { FormField, FormControl, FormLabel, FormItem } from '@components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import NumberFieldContent from '@components/ui/number-field/NumberFieldContent.vue'
import NumberFieldDecrement from '@components/ui/number-field/NumberFieldDecrement.vue'
import NumberFieldInput from '@components/ui/number-field/NumberFieldInput.vue'
import NumberFieldIncrement from '@components/ui/number-field/NumberFieldIncrement.vue'
import NumberField from '@components/ui/number-field/NumberField.vue'
import FormMessage from '@components/ui/form/FormMessage.vue'
// import { useMachineStore, usePiecesStore } from '@/core/stores'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { computed, onMounted } from 'vue'
// import { Piece } from '@components/Piece/columns'
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@components/ui/command'
import {
    TagsInput,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText,
} from '@components/ui/tags-input'
import { ref } from 'vue'
import useUserStore from '@/core/stores/user.store'

// const machinStore = useMachineStore()
// const pieceStore = usePiecesStore()
const userStore = useUserStore()

const comboboxRef = ref(null)
const formSchema = toTypedSchema(
    z.object({
        name: z.string({ message: 'Name can not be empty.' }).min(3),
        description: z.string({ message: 'Discription can not be empty' }),
        quantity: z.number().min(1),
        price: z.number(),
        employes: z.number().array(),
    }),
)
const open = ref(false)
const searchTerm = ref('')
const selected = ref<string[]>([])
const { handleSubmit, setFieldValue, values } = useForm({
    validationSchema: formSchema,
    initialValues: {
        price: 0,
        quantity: 1,
        employes: [],
    },
})
let employes = ref<any[]>()
const onSubmit = handleSubmit(async (values) => {
    const machine = await machinStore.createMachine(values)
    open.value = false
})
const filteredEmployes = computed<any[]>(() => {
    const filtered = (employes.value || []).filter((p) => !selected.value.includes(p.label))
    return filtered
})

onMounted(async () => {
    employes.value = (await userStore.fetchUsers({})).map((employees: User) => {
        return {
            value: piece.id,
            label: piece.code,
        }
    })
})
</script>
<template>
    <Drawer v-model:open="open">
        <DrawerTrigger as-child>
            <Button variant="ghost" size="icon">
                <Icon icon="ph:plus" />
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <div class="mx-auto w-full max-w-sm">
                <form @submit="onSubmit">
                    <DrawerHeader>
                        <DrawerTitle>Create machine</DrawerTitle>
                        <DrawerDescription>
                            Fill here to create a machine. Click create when you're done.</DrawerDescription>
                    </DrawerHeader>
                    <div class="grid !z-[53] gap-4 py-4">
                        <FormField v-slot="{ componentField }" name="name">
                            <FormItem v-auto-animate>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input v-bind="componentField" type="text" placeholder="CNC" class="col-span-3" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="description">
                            <FormItem v-auto-animate>
                                <FormLabel> Discription </FormLabel>
                                <FormControl>
                                    <Input v-bind="componentField" type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <Suspense>

                            <FormField name="pieces" class="" v-slot="{ setValue, value }">
                                <FormItem v-auto-animate>
                                    <FormLabel> Pieces </FormLabel>
                                    <FormControl class="relative !z-51">
                                        <TagsInput class="px-0 gap-0 relative" :model-value="selected">
                                            <div class="flex gap-2 flex-wrap items-center px-3">
                                                <TagsInputItem v-for="item in selected" :key="item" :value="item">
                                                    <TagsInputItemText />
                                                    <TagsInputItemDelete />
                                                </TagsInputItem>
                                            </div>
                                            <ComboboxRoot ref="comboboxRef" v-model="selected" 
                                                v-model:searchTerm="searchTerm" class="w-full">
                                                <ComboboxAnchor as-child>
                                                    <ComboboxInput placeholder="Pieces..." as-child>
                                                        <TagsInputInput class="w-full px-3"
                                                            :class="selected.length > 0 ? 'mt-2' : ''"
                                                            @keydown.enter.prevent />
                                                    </ComboboxInput>
                                                </ComboboxAnchor>

                                                <ComboboxPortal>
                                                    <ComboboxContent>
                                                        <CommandList position="popper"
                                                            class="w-[--radix-popper-anchor-width] !z-[51] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                                                            <CommandEmpty />
                                                            <CommandGroup>
                                                                <CommandItem v-for="piece in filteredPieces"
                                                                    :key="piece.value" :value="piece.label"
                                                                    @select.prevent="(ev) => {
                                                                        if (typeof ev.detail.value === 'string') {
                                                                            searchTerm = ''
                                                                            selected.push(ev.detail.value)
                                                                            setValue([...(value || []), piece.value])
                                                                        }
                                                                    }
                                                                        ">
                                                                    {{ piece.label }}
                                                                </CommandItem>
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </ComboboxContent>
                                                </ComboboxPortal>
                                            </ComboboxRoot>
                                        </TagsInput>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </Suspense>
                        <FormField name="price">
                            <FormItem v-auto-animate>
                                <FormLabel> price </FormLabel>
                                <NumberField class="gap-2" :min="0" :format-options="{
                                    style: 'currency',
                                    currency: 'EUR',
                                    currencyDisplay: 'symbol',
                                    currencySign: 'accounting',
                                }" @update:model-value="(v) => {
                                    if (v) {
                                        setFieldValue('price', v)
                                    } else {
                                        setFieldValue('price', undefined)
                                    }
                                }
                                    ">
                                    <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <FormControl>
                                            <NumberFieldInput />
                                        </FormControl>
                                        <NumberFieldIncrement />
                                    </NumberFieldContent>
                                </NumberField>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField name="quantity" v-slot="{ componentField }">
                            <FormItem v-auto-animate>
                                <FormLabel> quantity </FormLabel>
                                <NumberField class="gap-2" :min="1" @update:model-value="(v) => {
                                    if (v) {
                                        setFieldValue('quantity', v)
                                    } else {
                                        setFieldValue('quantity', undefined)
                                    }
                                }
                                    ">
                                    <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <FormControl>
                                            <NumberFieldInput v-bind="componentField" />
                                        </FormControl>
                                        <NumberFieldIncrement />
                                    </NumberFieldContent>
                                </NumberField>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>
                    <div class="flex py-5" v-if="values.price && values.quantity">
                        <h1 class="flex-grow">Totale:</h1>
                        <div class="min-w-10">{{ values.price * values.quantity }}$</div>
                    </div>
                    <DrawerFooter>
                        <Button type="submit"> Create machine </Button>
                    </DrawerFooter>
                </form>
            </div>
        </DrawerContent>
    </Drawer>
</template>
