import { type Dispatch, type SetStateAction, useState } from "react";
import { api } from "~/utils/api";

interface ItemModalProps {
  setMessage: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
}

const ItemModal = ({ setMessage, setType }: ItemModalProps) => {
  const [name, setName] = useState("");
  const [alertMin, setAlertMin] = useState<number>();
  const [quantityInBox, setQuantityInBox] = useState<number>();
  const mutation = api.items.insertOne.useMutation();

  const createNewItem = () => {
    if (alertMin && quantityInBox) {
      mutation.mutate({ name, alertMin, quantityInBox });
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

  return (
    <div>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <label htmlFor="my-modal-5" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Adicionar Item</h3>
          <form className="form-control mt-4">
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
            <div className="mt-6">
              <label
                htmlFor="my-modal-5"
                onClick={createNewItem}
                className="btn-primary btn"
              >
                Submeter
              </label>
            </div>
          </form>
        </label>
      </label>
    </div>
  );
};

export default ItemModal;
