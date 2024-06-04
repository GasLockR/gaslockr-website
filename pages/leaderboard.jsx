import React, { useState, useEffect } from "react"
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useDebounce } from "use-debounce"

const fetchData = async (page, pageSize, searchTerm) => {
  const response = await fetch(
    `/api/getLeaderboardData?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`
  )
  return response.json()
}

const Leaderboard = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize] = useState(100)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const [sorting, setSorting] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const result = await fetchData(page, pageSize, debouncedSearchTerm)
      setData(result.data)
      setTotalRows(result.totalRows)
      setTotalPages(result.totalPages)
      console.log(result.data, "data")
    } catch (error) {
      console.error("Failed to load data", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [page, debouncedSearchTerm])

  const columns = [
    {
      accessorKey: "rank",
      header: "Rank"
    },
    {
      accessorKey: "formattedAddress",
      header: "Address"
    },
    {
      accessorKey: "points",
      header: "Points"
    }
  ]

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: {
      sorting,
      pagination: { pageIndex: page, pageSize }
    },
    manualPagination: true, // 这里设置为手动分页
    onPaginationChange: (pagination) => {
      setPage(pagination.pageIndex)
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search by address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (page > 0) {
              setPage(page - 1)
            }
          }}
          disabled={page === 0 || loading}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (page < totalPages - 1) {
              setPage(page + 1)
            }
          }}
          disabled={page >= totalPages - 1 || loading}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Leaderboard
