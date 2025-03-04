import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Checkbox from '../ui/checkbox/Checkbox.vue'
import DropdownAction from './DropdownAction.vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
export type User = {
    id: number
    username: string
    email: string
    role: string
    profission: string
}

export const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            h(Checkbox, {
                checked: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
                'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
                ariaLabel: 'Select all',
                class: 'translate-y-0.5 rounded',
            }),
        cell: ({ row }) =>
            h(Checkbox, {
                checked: row.getIsSelected(),
                'onUpdate:checked': (value) => row.toggleSelected(!!value),
                ariaLabel: 'Select row',
                class: 'translate-y-0.5 rounded',
            }),
        enableSorting: false,
        enableHiding: false,
    },
    // {
    //     accessorKey: 'id',
    //     header: () => h('div', { class: 'text-right' }, 'id'),
    //     cell: ({ row }) => {
    //         return h('div', { class: 'text-right font-medium w-20' }, row.getValue('id'))
    //     },
    // },
    {
        accessorKey: 'username',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'username' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('name'))
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'email' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('description'))
        },
    },
    {
        accessorKey: 'role',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'role' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('quantity'))
        },
    },
    {
        accessorKey: 'profission',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'price' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('price'))
        }
        // cell: ({ row }) => {
        //     const price = Number.parseFloat(row.getValue('price'))
        //     const formatted = new Intl.NumberFormat('en-US', {
        //         style: 'currency',
        //         currency: 'USD',
        //     }).format(price)

        //     return h('div', { class: 'flex items-center space-x-2 font-medium' }, formatted)
        // },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const User = row.original

            return h(
                'div',
                { class: 'relative' },
                h(DropdownAction, {
                    User,
                }),
            )
        },
    },
]
