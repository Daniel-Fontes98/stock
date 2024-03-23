import { createColumnHelper } from "@tanstack/react-table";
import { type Supplier } from "~/types/Supplier";

const columnHelper = createColumnHelper<Supplier>();

export const supplierColumnDefs = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <span>Nome</span>,
  }),
  columnHelper.accessor((row) => row.contact, {
    id: "contact",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Contacto</span>,
  }),
];
