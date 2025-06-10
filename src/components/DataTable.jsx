"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/DataTablePagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DataTable({
  columns,
  data,
  isLoading,
  filters = [], // Array of filter configurations
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  // Render filter berdasarkan tipe
  const renderFilter = (filter) => {
    const column = table.getColumn(filter.columnId);
    if (!column) return null;

    switch (filter.type) {
      case "text":
        return (
          <div className="flex flex-col" key={filter.columnId}>
            <label className="text-sm font-medium mb-1">{filter.label}</label>
            <Input
              placeholder={filter.placeholder || `Filter by ${filter.label}`}
              value={column.getFilterValue() ?? ""}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
          </div>
        );
      case "select":
        return (
          <div className="flex flex-col" key={filter.columnId}>
            <label className="text-sm font-medium mb-1">{filter.label}</label>
            <Select
              value={column.getFilterValue() ?? ""}
              onValueChange={(value) => column.setFilterValue(value)}
            >
              <SelectTrigger className="max-w-sm">
                <SelectValue
                  placeholder={filter.placeholder || `Select ${filter.label}`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      // Tambahkan tipe filter lain sesuai kebutuhan (date range, number range, dll)
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Filter section */}
      {filters.length > 0 && (
        <div className="flex flex-wrap items-end gap-4 py-4">
          {filters.map(renderFilter)}
        </div>
      )}

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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
      </div>
      {!isLoading && (
        <div className="mt-2">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}
