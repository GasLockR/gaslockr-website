import React, { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

const PolicyList = ({ policies }) => {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  console.log(policies, "fuck policies")

  const loading = !policies || policies.length === 0

  const columns = [
    // normal or advance
    {
      accessorKey: "policyType",
      header: "Policy Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("policyType")}</div>
      )
    },
    {
      accessorKey: "policyTerm",
      header: "Policy Term",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("policyTerm")}</div>
      )
    },
    {
      accessorKey: "payer",
      header: "Payer Address",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("payer")}</div>
      )
    },
    {
      accessorKey: "insured",
      header: "Insured Address",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("insured")}</div>
      )
    },
    {
      accessorKey: "targetGasPrice",
      header: "Target Gas Price",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("targetGasPrice")}</div>
      )
    },
    {
      accessorKey: "volatility",
      header: "Volatitity",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("volatility")}</div>
      )
    },
    {
      accessorKey: "isClaimed",
      header: "Claimed",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("isClaimed") ? "Claimed" : "Active"}
        </div>
      )
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("startTime")}</div>
      )
    },
    {
      accessorKey: "endTime",
      header: "End Time",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("endTime")}</div>
      )
    },
    {
      accessorKey: "isExpired",
      header: "Expired",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("isExpired") ? "Expired" : "Protecting"}
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: policies,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })
  return (
    <div>
      <div>
        <div className="rounded-md border">
          {!loading ? (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : // <div className="space-y-2">
          //   <Skeleton className="h-8 w-full" />
          //   <Skeleton className="h-8 w-full" />
          //   <Skeleton className="h-8 w-full" />
          //   <Skeleton className="h-8 w-full" />
          //   <Skeleton className="h-8 w-full" />
          // </div>
          null}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicyList
