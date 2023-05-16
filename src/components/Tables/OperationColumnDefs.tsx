import { createColumnHelper } from "@tanstack/react-table";
import { type Operation } from "~/types/Operation";

const columnHelper = createColumnHelper<Operation>();

export const operationColumnDefs = [
  columnHelper.accessor(
    (row) =>
      row.createdAt
        .toLocaleDateString()
        .concat(" " + row.createdAt.toLocaleTimeString()),
    {
      id: "createdAt",
      cell: (info) => info.getValue(),
      header: () => <span>Data</span>,
    }
  ),
  columnHelper.accessor((row) => row.item.name, {
    id: "itemName",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Nome</span>,
  }),
  columnHelper.accessor((row) => row.operationType, {
    id: "operationType",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Tipo</span>,
  }),
  columnHelper.accessor((row) => row.quantity, {
    id: "quantity",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Quantidade</span>,
  }),
  columnHelper.accessor((row) => row.unitType, {
    id: "unitType",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Tipo de Unidade</span>,
  }),
  columnHelper.accessor((row) => row.deliveredTo, {
    id: "deliveredTo",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Entregue a</span>,
  }),
];
