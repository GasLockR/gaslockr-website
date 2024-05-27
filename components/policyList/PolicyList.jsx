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
import { Input } from "@/components/ui/input"
import { ethers } from "ethers"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

import { useContractWrite } from "wagmi"
import { SCROLL_CONTRSCT_ADDRESS } from "@/config/address"
import { useDynamicContractAddress } from "@/hooks/useDynamicContractAddress"
import { payoutDates } from "@/config/mockData"

const PolicyList = ({ policies }) => {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const loading = !policies || policies.length === 0

  const [insured, setInsured] = useState("")
  const [id, setId] = useState("")

  const contractAddress = useDynamicContractAddress()

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_insured",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "_id",
            type: "uint256"
          }
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ],
    functionName: "claim",
    args: [insured, id]
  })

  const formatAddress = (address) => {
    if (address.length > 8) {
      return address.slice(0, 4) + "..." + address.slice(-4)
    }
    return address
  }

  const formatTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    // const hours = String(date.getHours()).padStart(2, "0")
    // const minutes = String(date.getMinutes()).padStart(2, "0")
    // const seconds = String(date.getSeconds()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  if (!policies) {
    return <div>Loading...</div>
  }

  const columns = [
    {
      accessorKey: "payer",
      header: "Payer Address",
      cell: ({ row }) => (
        <Popover>
          <PopoverTrigger>
            <Button
              variant="link"
              className="capitalize text-[#57C5B6] underline"
            >
              {formatAddress(row.getValue("payer"))}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full text-[#57C5B6]">
            {row.getValue("payer")}
          </PopoverContent>
        </Popover>
      )
    },
    {
      accessorKey: "insured",
      header: "Insured Address",
      cell: ({ row }) => (
        <Popover>
          <PopoverTrigger>
            <Button
              variant="link"
              className="capitalize text-[#57C5B6] underline"
            >
              {formatAddress(row.getValue("insured"))}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full text-[#57C5B6]">
            {row.getValue("insured")}
          </PopoverContent>
        </Popover>
      )
    },
    {
      accessorKey: "term",
      header: "Period",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("term")}</div>
      )
    },
    {
      accessorKey: "benefit",
      header: "Benefit",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("benefit")}</div>
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
          {row.getValue("isExpired") ? "Expired" : "Active"}
        </div>
      )
    },
    {
      accessorKey: "isClaimed",
      header: "Claimed",
      cell: ({ row }) => {
        const policyData = row.original

        const benefit = Number(row.getValue("benefit"))
        const isExpired = row.getValue("isExpired")
        const isClaimed = row.getValue("isClaimed")

        let buttonText = "Claim Pending"
        let buttonDisabled = true
        let handleClick = () => {}

        if (benefit !== 0 && isExpired && !isClaimed) {
          buttonText = "Claim"
          buttonDisabled = false
          handleClick = () => {
            console.log("Claim button clicked for:", row)
            // write()
          }
        } else if (benefit === 0 && isExpired && !isClaimed) {
          buttonText = "No Benefit"
          buttonDisabled = true
        } else if (isClaimed) {
          buttonText = "Already Claimed"
          buttonDisabled = true
        }

        return (
          <div>
            <Button
              className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
              variant="outline"
              disabled
              // disabled={buttonDisabled}
              onClick={handleClick}
            >
              {buttonText}
            </Button>
          </div>
        )
      }
    }
  ]

  const payoutDatesSet = new Set(
    payoutDates.map((date) => new Date(date).setUTCHours(0, 0, 0, 0))
  )

  const processedPolicies = policies.map((policy) => {
    let benefitCount = 0
    let currentDate = new Date(Number(policy.startTime) * 1000)
    currentDate.setUTCHours(0, 0, 0, 0)
    const endDate = new Date(Number(policy.endTime) * 1000)
    endDate.setUTCHours(0, 0, 0, 0)
    endDate.setDate(endDate.getDate() - 1)

    while (currentDate <= endDate) {
      if (payoutDatesSet.has(currentDate.getTime())) {
        benefitCount++
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return {
      ...policy,
      payer: policy.payer.toString(),
      insured: policy.insured.toString(),
      term: `${policy.term.toString()} Days`,
      benefit: `${(benefitCount * 0.003).toFixed(3)} ETH`,
      startTime: formatTimestampToDate(policy.startTime.toString()),
      endTime: formatTimestampToDate(policy.endTime.toString()),
      isExpired:
        Date.now() >
        new Date(
          new Date(Number(policy.endTime) * 1000).setDate(
            new Date(Number(policy.endTime) * 1000).getDate() + 1
          )
        ).setHours(0, 0, 0, 0)
    }
  })

  const table = useReactTable({
    data: processedPolicies,
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
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter Payer Address..."
          value={table.getColumn("payer")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("payer")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> */}
      <div className="pt-4">
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

export default React.memo(PolicyList)
