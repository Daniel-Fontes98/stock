import { Alert } from "~/types/Alert";
import { createColumnHelper } from "@tanstack/react-table";

const test = Intl.DateTimeFormat;

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
      header: (info) => <span>Data do Alerta</span>,
    }
  ),
  columnHelper.accessor((row) => row.item.name, {
    id: "itemName",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Nome</span>,
  }),
  columnHelper.accessor((row) => row.item.quantityUnit, {
    id: "itemQuantityUnit",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Quantidade (unidades)</span>,
  }),
  columnHelper.accessor((row) => row.item.quantityBox, {
    id: "itemQuantityBox",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Quantidade (caixas)</span>,
  }),
  columnHelper.accessor((row) => row.item.Total, {
    id: "Total",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Total</span>,
  }),
];
