import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { type Dispatch, type SetStateAction, useState } from "react";
import { api } from "~/utils/api";
import Filter from "./ColumnFilter";
import { itemColumnDefs } from "./ItemColumnDefs";
import Pagination from "./Pagination";

interface objectState {
  setObjectId: Dispatch<SetStateAction<string>>;
}

const ClientSideTable = ({ setObjectId }: objectState) => {
  const data = api.items.getAll.useQuery().data;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns: itemColumnDefs,
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

  const headers = table?.getFlatHeaders();
  const rows = table?.getRowModel().rows;

  const handleClick = (id: string) => {
    setObjectId(id);
  };
  if (rows && headers && data)
    return (
      <div className="overflow-x-auto">
        <table className="table-zebra my-4 table  w-full">
          <thead>
            <tr>
              {headers.map((header) => {
                const direction = header.column.getIsSorted();
                const arrow = {
                  asc: "ð¼",
                  desc: "ð½",
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
                <label
                  htmlFor="my-modal-4"
                  className="btn-accent btn-md btn ml-6  w-3/4 text-xs"
                  onClick={() => handleClick(data[Number(row.id)]!.id)}
                >
                  Movimentar
                </label>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination table={table} />
      </div>
    );
  return <div></div>;
};

export default ClientSideTable;
