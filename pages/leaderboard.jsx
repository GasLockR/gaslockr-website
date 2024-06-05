import React, { useState, useEffect } from "react"
import {
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
import { Loader2 } from "lucide-react"
import { Container } from "@/components/Container"
import { PersonIcon } from "@radix-ui/react-icons"

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
  const [filteredTotalRows, setFilteredTotalRows] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  const loadData = async (
    newPage = page,
    newSearchTerm = debouncedSearchTerm
  ) => {
    setLoading(true)
    try {
      const result = await fetchData(newPage, pageSize, newSearchTerm)
      setData(result.data)
      setFilteredTotalRows(result.filteredTotalRows)
      setTotalPages(result.totalPages)
      if (totalRows === 0) {
        setTotalRows(result.totalRows)
      }
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setPage(0)
  }

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
    manualPagination: true,
    onPaginationChange: (pagination) => {
      setPage(pagination.pageIndex)
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <Container className="p-4 max-w-7xl">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex flex-row gap-2 items-center p-2">
          <PersonIcon className="text-[#57C5B6] h-8 w-8" />
          <div className="text-[#57C5B6] text-2xl">{totalRows}</div>
        </div>
        <div className="flex items-center">
          <Input
            placeholder="Search by address"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="relative overflow-auto rounded-md border h-[600px]">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-md z-10">
            <Loader2 className="animate-spin h-10 w-10 text-[#159895]" />
          </div>
        )}
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
            {table.getRowModel().rows.length ? (
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
            if (page < Math.ceil(filteredTotalRows / pageSize) - 1) {
              setPage(page + 1)
            }
          }}
          disabled={
            page >= Math.ceil(filteredTotalRows / pageSize) - 1 || loading
          }
        >
          Next
        </Button>
      </div>
    </Container>
  )
}

export default Leaderboard
