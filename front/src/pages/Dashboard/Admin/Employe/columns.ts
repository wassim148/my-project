import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Checkbox from '@components/ui/checkbox/Checkbox.vue'
import EmployeeDropdownAction from './EmployeeDropdownAction.vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'

export type Employee = {
  id: number
  username: string
  email: string
  role: string
  department: string
  project: string[]
  hireDate: Date
}

export const columns: ColumnDef<Employee>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
        class: 'translate-y-0.5 rounded'
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
        class: 'translate-y-0.5 rounded'
      }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'username',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Nom' }),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('username'))}
  },
  {
    accessorKey: 'email',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Email' }),
    cell: ({ row }) => {return h('div', { class: 'font-medium' }, row.getValue('email'))}
  },
  {
    accessorKey: 'role',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Rôle' }),
    cell: ({ row }) =>{ return h('div', { class: 'font-medium' }, row.getValue('role'))}
  },
  {
    accessorKey: 'department',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Département' }),
    cell: ({ row }) =>{ return h('div', { class: 'font-medium' }, row.getValue('department'))}
  },
  {
    accessorKey: 'project',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'project' }),
    cell: ({ row }) =>{ return h('div', { class: 'font-medium' }, row.getValue('project'))}
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original
      return h('div', { class: 'relative' }, h(EmployeeDropdownAction, { employee }))
    }
  }
]