import { type NextPage } from "next";
import Navbar from "~/components/Navbar/Navbar";
import { supplierColumnDefs } from "~/components/Tables/SupplierColumnDefs";
import TableDefs from "~/components/Tables/TableDefs";
import { api } from "~/utils/api";

const Table: NextPage = () => {
  const data = api.suppliers.getAll.useQuery().data;

  if (data)
    return (
      <div>
        <Navbar />
        <div className="mt-10">
          <TableDefs data={data} columnDefs={supplierColumnDefs} />
        </div>
      </div>
    );

  return <div>Loading</div>;
};

export default Table;
