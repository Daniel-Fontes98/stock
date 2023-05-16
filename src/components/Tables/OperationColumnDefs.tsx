import { createColumnHelper } from "@tanstack/react-table";
import { Operation } from "~/types/Operation";

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
      header: (info) => <span>Data</span>,
    }
  ),
  columnHelper.accessor((row) => row.item.name, {
    id: "itemName",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Nome</span>,
  }),
  columnHelper.accessor((row) => row.operationType, {
    id: "operationType",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Tipo</span>,
  }),
  columnHelper.accessor((row) => row.quantity, {
    id: "quantity",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Quantidade</span>,
  }),
  columnHelper.accessor((row) => row.unitType, {
    id: "unitType",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Tipo de Unidade</span>,
  }),
  columnHelper.accessor((row) => row.deliveredTo, {
    id: "deliveredTo",
    cell: (info) => <span>{info.getValue()}</span>,
    header: (info) => <span>Entregue a</span>,
  }),
];
