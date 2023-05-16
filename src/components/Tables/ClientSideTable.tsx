import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";
import { api } from "~/utils/api";
import { itemColumnDefs } from "./ItemColumnDefs";
import Pagination from "./Pagination";

interface objectState {
  objectId: string;
  setObjectId: Dispatch<SetStateAction<string>>;
}

const ClientSideTable = ({ objectId, setObjectId }: objectState) => {
  const data = api.items.getAll.useQuery().data;
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns: itemColumnDefs,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const headers = table?.getFlatHeaders();
  const rows = table?.getRowModel().rows;

  const handleClick = (id: string) => {
    setObjectId(id);
  };
  if (rows && headers)
    return (
      <div>
        <table className="table-zebra my-4 table w-full">
          <thead>
            <tr>
              {headers.map((header) => {
                const direction = header.column.getIsSorted();
                const arrow: any = {
                  asc: "🔼",
                  desc: "🔽",
                };

                const sort_indicator = direction && arrow[direction];
                return (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
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
                  className="btn-accent btn-circle btn ml-6 w-1/2 text-xs"
                  onClick={() => handleClick(data![Number(row.id)]!.id)}
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
