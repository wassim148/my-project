import { Table } from '@tanstack/vue-table'

export interface CopyProps<T> {
    table: Table<T>
    copyKey: keyof T
}

export interface DeleteProps<T> {
    table: Table<T>
}

export interface TableSearchProps<T> {
    table: Table<T>
    column: keyof T
}

export interface DataTableColumnSortProps<T> {
    table: Table<T>
    keys: (keyof T)[]
}
