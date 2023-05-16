import { createColumnHelper } from "@tanstack/react-table";
import { type Item } from "~/types/Item";

const columnHelper = createColumnHelper<Item>();

export const itemColumnDefs = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => info.getValue(),
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
  columnHelper.accessor((row) => row.quantityInBox, {
    id: "quantityInBox",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Quantidade por caixa</span>,
  }),
  columnHelper.accessor((row) => row.Total, {
    id: "Total",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Total</span>,
  }),
];
