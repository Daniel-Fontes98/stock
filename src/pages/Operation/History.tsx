import TableDefs from "../../components/Tables/TableDefs";
import { type NextPage } from "next";
import { operationColumnDefs } from "~/components/Tables/OperationColumnDefs";
import { api } from "~/utils/api";
import Navbar from "~/components/Navbar/Navbar";

const History: NextPage = () => {
  const data = api.operations.getAll.useQuery().data;
  console.log(data);
  if (data)
    return (
      <div>
        <Navbar />
        <label className=" max-w-5xl">
          <TableDefs data={data} columnDefs={operationColumnDefs} />
        </label>
      </div>
    );

  return <div>Loading...</div>;
};

export default History;
