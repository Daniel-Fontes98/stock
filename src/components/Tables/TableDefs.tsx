import { Alert, Operation } from "@prisma/client";
import {
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import Filter from "./ColumnFilter";
import Pagination from "./Pagination";

interface TableProps {
  data: (Alert | Operation)[];
  columnDefs: any;
}

const TableDefs = ({ data, columnDefs }: TableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    columns: columnDefs,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });
  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;
  if (data)
    return (
      <div className="overflow-x-auto">
        <table className="table-zebra my-4 table w-full">
          <thead>
            <tr>
              {headers.map((header) => {
                const direction = header.column.getIsSorted();

                const arrow = {
                  asc: "🔼",
                  desc: "🔽",
                };

                const sort_indicator = direction && arrow[direction];
                return (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex cursor-pointer gap-4"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {direction && <span>{sort_indicator}</span>}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination table={table} />
      </div>
    );
  return <div></div>;
};

export default TableDefs;
