<script lang="ts" setup>
import { useUserStore } from '@/core/stores/user.store'
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import { User } from '../columns'
import { DeleteProps } from '@/shared/interfaces/table'

const props = defineProps<DeleteProps<User>>()

const UserStore = useUserStore()
</script>

<template>
    <Button
        variant="ghost"
        size="icon"
        @click="UserStore.deleteUsers(props.table.getSelectedRowModel().rows.map((row) => row.original))"
    >
        <Icon icon="ph:trash" class="text-destructive" />
    </Button>
</template>
