import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { type NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";
import { alertColumnDefs } from "../Tables/AlertColumnDefs";
import Pagination from "../Tables/Pagination";

const AlertModal: NextPage = () => {
  const data = api.alerts.getAll.useQuery();
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns: alertColumnDefs,
    data: data.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });
  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;
  if (data)
    return (
      <div>
        <input type="checkbox" id="my-modal-7" className="modal-toggle" />
        <label htmlFor="my-modal-7" className="modal cursor-pointer">
          <label className="modal-box relative w-11/12 max-w-5xl">
            <div className="overflow-x-auto">
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination table={table} />
            </div>
          </label>
        </label>
      </div>
    );
  return <div></div>;
};

export default AlertModal;
