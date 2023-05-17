import { type NextPage } from "next";
import { api } from "~/utils/api";
import { operationColumnDefs } from "../Tables/OperationColumnDefs";
import Table from "../Tables/TableDefs";

const HistoryModal: NextPage = () => {
  const data = api.operations.getAll.useQuery().data;

  if (data)
    return (
      <div>
        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <label htmlFor="my-modal-6" className="modal cursor-pointer">
          <label className="modal-box relative w-11/12 max-w-5xl">
            <Table data={data} columnDefs={operationColumnDefs} />
          </label>
        </label>
      </div>
    );

  return <div></div>;
};

export default HistoryModal;
