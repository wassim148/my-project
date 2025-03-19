<script setup lang="ts">
import { Column, Table } from '@tanstack/vue-table'
import { Icon } from '@iconify/vue'
import { cn } from '@/shared/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Button } from '@/shared/components/ui/button'
import { defineProps, ref } from 'vue'

interface DataTableColumnHeaderProps<TData> {
  column: Column<TData, any>
  title: string
}

const props = defineProps<DataTableColumnHeaderProps<any>>()

</script>

<template>
  <div v-if="props.column.getCanSort()" :class="cn('flex items-center space-x-2')">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{{ props.title }}</span>
          <Icon
            v-if="props.column.getIsSorted() === 'desc'"
            icon="ph:arrow-down"
            class="ml-2 h-4 w-4"
          />
          <Icon
            v-else-if="props.column.getIsSorted() === 'asc'"
            icon="ph:arrow-up"
            class="ml-2 h-4 w-4"
          />
          <Icon
            v-else
            icon="ph:caret-up-down"
            class="ml-2 h-4 w-4"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" class="w-56 p-2">
        <DropdownMenuItem @click="props.column.toggleSorting(false)">
          <Icon
            icon="ph:arrow-up"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          Trier croissant
        </DropdownMenuItem>
        <DropdownMenuItem @click="props.column.toggleSorting(true)">
          <Icon
            icon="ph:arrow-down"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          Trier décroissant
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="props.column.toggleVisibility(false)">
          <Icon
            icon="ph:eye"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          Masquer
        </DropdownMenuItem>
        <DropdownMenuItem @click="props.column.clearSorting()">
          <Icon
            icon="ph:trash"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          Réinitialiser le tri
        </DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu>

  </div>

 

  <div v-else class="flex items-center">
    {{ props.title }}
  </div>
</template>