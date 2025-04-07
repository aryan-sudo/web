"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import { proposalStatuses, formatCurrency } from "../data/data"
import { Proposal } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<Proposal>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue("title")}
        </div>
      )
    },
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <Badge variant={type === "proposal" ? "default" : "outline"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusInfo = proposalStatuses.find(s => s.value === status)
      
      // Create appropriate styling based on status
      let badgeVariant: "default" | "destructive" | "outline" | "secondary" = "outline"
      
      switch(status) {
        case "accepted":
          badgeVariant = "default"
          break
        case "rejected":
          badgeVariant = "destructive"
          break
        case "submitted":
          badgeVariant = "secondary"
          break
        default:
          badgeVariant = "outline"
      }

      return (
        <div className="flex items-center">
          {statusInfo?.icon && (
            <statusInfo.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <Badge variant={badgeVariant} className="capitalize">
            {status}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Value" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("value") as number | undefined
      return <div>{value ? formatCurrency(value) : "N/A"}</div>
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => <div>{row.getValue("dueDate") || "N/A"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
