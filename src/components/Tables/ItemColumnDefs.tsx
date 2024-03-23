import { createColumnHelper } from "@tanstack/react-table";
import { type Item } from "~/types/Item";

const columnHelper = createColumnHelper<Item>();

export const itemColumnDefs = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Nome</span>,
  }),
  columnHelper.accessor((row) => row.quantityUnit, {
    id: "quantityUnit",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Quantidade (unidades)</span>,
  }),
  columnHelper.accessor((row) => row.quantityBox, {
    id: "quantityBox",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Quantidade (caixas)</span>,
  }),
  columnHelper.accessor((row) => row.Total, {
    id: "total",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Total</span>,
  }),
];
