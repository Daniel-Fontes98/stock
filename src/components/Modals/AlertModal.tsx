import { type NextPage } from "next";
import { api } from "~/utils/api";
import { alertColumnDefs } from "../Tables/AlertColumnDefs";
import Table from "../Tables/TableDefs";

const AlertModal: NextPage = () => {
  const data = api.alerts.getAll.useQuery().data;
  if (data)
    return (
      <div>
        <input type="checkbox" id="my-modal-7" className="modal-toggle" />
        <label htmlFor="my-modal-7" className="modal cursor-pointer">
          <label className="modal-box relative w-11/12 max-w-5xl">
            <Table data={data} columnDefs={alertColumnDefs} />
          </label>
        </label>
      </div>
    );
  return <div></div>;
};

export default AlertModal;
