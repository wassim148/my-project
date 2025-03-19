# Datiumsass Dashboard

This is a dashboard template with pre-configured components. You can use this template to build your own dashboard.

## Features

- Pre-configured components
- Responsive design
- Easy to use and customize

## How to use

1. Clone this repository
2. Install dependencies with `npm install` or `yarn install`
3. Start the development server with `npm run dev` or `yarn dev`
4. Open the dashboard in your web browser at `http://localhost:3000`





// Initialize table properly
// const tableInstance = useVueTable({
//   columns: props.columns,
//   data: props.data,
//   getCoreRowModel: computed(() => employeeStore.getCoreRowModel()),
//   getPaginationRowModel: computed(() => employeeStore.getPaginationRowModel()),
//   debugAll: false, // Add this line
// })

// // Watch for data changes and update table
// watch(
//   () => props.data,
//   (newData) => {
//     tableInstance.setData(newData)
//   },
//   { deep: true }
// )

// // Expose table instance for toolbar integration
// defineExpose({
//   table: tableInstance,
// })
// const table = useVueTable({
//     get data() {
//         return props.data
//     },
//     get columns() {
//         return props.columns
//     },
//     state: {
//         get sorting() {
//             return sorting.value
//         },
//         get columnFilters() {
//             return columnFilters.value
//         },
//         get columnVisibility() {
//             return columnVisibility.value
//         },
//         get rowSelection() {
//             return rowSelection.value
//         },
//     },
//     enableRowSelection: true,
//     onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
//     onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
//     onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
//     onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
// })
// </script>

// <template>
//   <div class="w-full">
//     <!-- Table Container -->
//     <div class="rounded-md border bg-card text-card-foreground shadow">
//       <table class="w-full">
//         <thead>
//           <tr>
//             <th v-for="column in tableInstance.getVisibleLeafColumns()" :key="column.id" class="px-4 py-3">
//               <DataTableColumnHeader
//                 v-if="column.getCanSort()"
//                 :column="column"
//                 :title="column.columnDef.header as string"
//               />
//               <span v-else class="flex items-center h-full">{{ column.columnDef.header }}</span>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr
//             v-for="row in tableInstance.getRowModel().rows"
//             :key="row.id"
//             class="border-b last:border-b-0 hover:bg-muted/50 transition-colors"
//           >
//             <td
//               v-for="cell in row.getVisibleCells()"
//               :key="cell.id"
//               class="px-4 py-3"
//             >
//               <div v-if="cell.column.id === 'actions'">
//                 <EmployeeDropdownAction :employee="row.original" />
//               </div>
//               <div v-else class="flex items-center">
//                 {{ cell.getValue() }}
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>

//     <!-- Pagination Controls -->
//     <div class="flex items-center justify-between px-4 py-4">
//       <div class="flex items-center space-x-2">
//         <!-- Previous Button -->
//         <button
//           @click="tableInstance.previousPage()"
//           :disabled="!tableInstance.getCanPreviousPage()"
//           class="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
//         >
//           Précédent
//         </button>

//         <!-- Page Info -->
//         <span class="text-sm text-muted-foreground">
//           Page {{ tableInstance.getState().pagination.pageIndex + 1 }} sur
//           {{ tableInstance.getPageCount() }}
//         </span>

//         <!-- Next Button -->
//         <button
//           @click="tableInstance.nextPage()"
//           :disabled="!tableInstance.getCanNextPage()"
//           class="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
//         >
//           Suivant
//         </button>
//       </div>
//     </div>
//   </div>
// </template>





// const sorting = ref<SortingState>([])
// const columnFilters = ref<ColumnFiltersState>([])
// const columnVisibility = ref<VisibilityState>({})
// const rowSelection = ref({})
// const table = useVueTable({
//     get data() {
//         return props.data
//     },
//     get columns() {
//         return props.columns
//     },
//     state: {
//         get sorting() {
//             return sorting.value
//         },
//         get columnFilters() {
//             return columnFilters.value
//         },
//         get columnVisibility() {
//             return columnVisibility.value
//         },
//         get rowSelection() {
//             return rowSelection.value
//         },
//     },
//     enableRowSelection: true,
//     onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
//     onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
//     onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
//     onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
// })
// </script>

// <template>
//     <div>
//         <DataTableToolbar copy-key="name" :table="table" />
//         <Table>
//             <TableHeader>
//                 <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
//                     <TableHead v-for="header in headerGroup.headers" :key="header.id">
//                         <FlexRender
//                             v-if="!header.isPlaceholder"
//                             :render="header.column.columnDef.header"
//                             :props="header.getContext()"
//                         />
//                     </TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 <template v-if="table.getRowModel().rows?.length">
//                     <TableRow
//                         v-for="row in table.getRowModel().rows"
//                         :key="row.id"
//                         :data-state="row.getIsSelected() ? 'selected' : undefined">
//                         <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
//                             <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
//                         </TableCell>
//                     </TableRow>
//                 </template>
//                 <template v-else>
//                     <TableRow>
//                         <TableCell :colspan="columns.length" class="h-24 text-center"> No results. </TableCell>
//                     </TableRow>
//                 </template>
//             </TableBody>
//         </Table>
//     </div>
// </template>


