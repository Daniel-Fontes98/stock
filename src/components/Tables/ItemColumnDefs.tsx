import { createColumnHelper } from "@tanstack/react-table";
import { Item } from "~/types/Item";

const columnHelper = createColumnHelper<Item>();

export const itemColumnDefs = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => info.getValue(),
    header: (info) => <span>Nome</span>,
  }),
  columnHelper.accessor((row) => row.quantityUnit, {
    id: "quantityUnit",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Quantidade (unidades)</span>,
  }),
  columnHelper.accessor((row) => row.quantityBox, {
    id: "quantityBox",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Quantidade (caixas)</span>,
  }),
  columnHelper.accessor((row) => row.Total, {
    id: "Total",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Total</span>,
  }),
];
