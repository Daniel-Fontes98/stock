import { type Dispatch, type SetStateAction, useState } from "react";
import { api } from "~/utils/api";

interface SupplierModalProps {
  setMessage: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
}

const SupplierModal = ({ setMessage, setType }: SupplierModalProps) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const mutation = api.suppliers.insertOne.useMutation();

  const createNewSupplier = () => {
    mutation.mutate({ name, contact });
    setName("");
    setContact("");
    setType("notification");
    setMessage(`Novo fornecedor ${name} adicionado`);

    setTimeout(() => {
      setType("");
      setMessage("");
      window.location.reload();
    }, 5000);
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-8" className="modal-toggle" />
      <label htmlFor="my-modal-8" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Adicionar Fornecedor</h3>
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
                <span className="label-text">Contacto</span>
              </label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                type="text"
                placeholder="Escrever aqui"
                className="input-bordered input w-full max-w-xs"
                required
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="my-modal-5"
                onClick={createNewSupplier}
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

export default SupplierModal;
