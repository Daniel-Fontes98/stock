import { type Dispatch, type SetStateAction, useState } from "react";
import { api } from "~/utils/api";

interface ItemModalProps {
  setMessage: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
}

const ItemModal = ({ setMessage, setType }: ItemModalProps) => {
  const [name, setName] = useState("");
  const [alertMin, setAlertMin] = useState<number>();
  const [alertMax, setAlertMax] = useState<number>();
  const [quantityInBox, setQuantityInBox] = useState<number>();
  const mutation = api.items.insertOne.useMutation();
  const suppliers = api.suppliers.getAll.useQuery().data;
  const [supplierId, setSupplierId] = useState("");

  const createNewItem = () => {
    if (alertMin && quantityInBox && alertMax && supplierId !== "") {
      mutation.mutate({ name, alertMin, alertMax, quantityInBox, supplierId });
      setName("");
      setType("notification");
      setMessage(`Novo item ${name} adicionado`);

      setTimeout(() => {
        setType("");
        setMessage("");
        setAlertMin(0);
        window.location.reload();
      }, 5000);
    }
  };
  if (suppliers) {
    return (
      <div>
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <label htmlFor="my-modal-5" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">Adicionar Item</h3>
            <form className="form-control mt-4" onSubmit={createNewItem}>
              <div className="mt-2">
                <label className="label">
                  <span className="label-text">Nome</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Escrever aqui"
                  className="input-bordered input w-full max-w-xs"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="label">
                  <span className="label-text">Valor Minimo de alerta</span>
                </label>
                <input
                  value={alertMin}
                  onChange={(e) => setAlertMin(Number(e.target.value))}
                  type="number"
                  placeholder="Escrever aqui"
                  className="input-bordered input w-full max-w-xs"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="label">
                  <span className="label-text">Valor de Rutura</span>
                </label>
                <input
                  value={alertMax}
                  onChange={(e) => setAlertMax(Number(e.target.value))}
                  type="number"
                  placeholder="Escrever aqui"
                  className="input-bordered input w-full max-w-xs"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="label">
                  <span className="label-text">Unidades por caixa</span>
                </label>
                <input
                  value={quantityInBox}
                  onChange={(e) => setQuantityInBox(Number(e.target.value))}
                  type="number"
                  placeholder="Escrever aqui"
                  className="input-bordered input w-full max-w-xs"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="label">
                  <span className="label-text">Fornecedor</span>
                </label>
                <select
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  required
                >
                  <option>Escolher um</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-6">
                <button type="submit">
                  <label className="btn-primary btn" htmlFor="my-modal-5">
                    Submeter
                  </label>
                </button>
              </div>
            </form>
          </label>
        </label>
      </div>
    );
  }
  return <div></div>;
};
export default ItemModal;
