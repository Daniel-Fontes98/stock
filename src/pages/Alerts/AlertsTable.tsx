import { type NextPage } from "next";
import { api } from "~/utils/api";
import { alertColumnDefs } from "~/components/Tables/AlertColumnDefs";
import Table from "~/components/Tables/TableDefs";
import Navbar from "~/components/Navbar/Navbar";

const AlertsTable: NextPage = () => {
  const data = api.alerts.getAll.useQuery().data;
  if (data)
    return (
      <div>
        <Navbar />
        <label className="max-w-5xl">
          <Table data={data} columnDefs={alertColumnDefs} />
        </label>
      </div>
    );
  return <div>Loading...</div>;
};

export default AlertsTable;
