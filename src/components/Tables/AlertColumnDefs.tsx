import { type Alert } from "~/types/Alert";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Alert>();

export const alertColumnDefs = [
  columnHelper.accessor(
    (row) =>
      row.createdAt
        .toLocaleDateString()
        .concat(" " + row.createdAt.toLocaleTimeString()),
    {
      id: "createdAt",
      cell: (info) => info.getValue(),
      header: () => <span>Data do Alerta</span>,
    }
  ),
  columnHelper.accessor((row) => row.item.name, {
    id: "itemName",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Nome</span>,
  }),
  columnHelper.accessor((row) => row.item.Total, {
    id: "Total",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Total</span>,
  }),
  columnHelper.accessor((row) => row.type, {
    id: "alert",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Tipo</span>,
  }),
];
