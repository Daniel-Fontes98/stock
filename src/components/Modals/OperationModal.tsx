import { type Dispatch, type SetStateAction, useState } from "react";
import { api } from "~/utils/api";

interface operationModalProps {
  objectId: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
}

const OperationModal = ({
  objectId,
  setMessage,
  setType,
}: operationModalProps) => {
  const [operationType, setOperationType] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unitType, setUnitType] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [deliveredTo, setDeliveredTo] = useState("");
  const mutation = api.operations.insertOne.useMutation();
  const object = api.items.getOne.useQuery({ id: objectId });
  if (!objectId) return null;

  const adicionarOperacao = () => {
    if (quantity && object.data) {
      if (operationType === "Remover" && object.isFetched) {
        if (unitType === "CX" && quantity > object.data.quantityBox) {
          console.log("HEY");
          setMessage("Quantidade insuficiente para fazer movimentação");
          setType("error");
          setTimeout(() => {
            setMessage("");
            setType("");
          }, 5000);
          return;
        } else if (unitType === "UN" && quantity > object.data.quantityUnit) {
          console.log("HEY");
          setMessage("Quantidade insuficiente para fazer movimentação");
          setType("error");
          setTimeout(() => {
            setMessage("");
            setType("");
          }, 5000);
          return;
        }
      }
      mutation.mutate({
        operationType: operationType,
        quantity: quantity,
        unitType: unitType,
        itemId: objectId,
        reference: reference,
        description: description,
        deliveredTo: deliveredTo,
      });

      setMessage(
        `Operação ${operationType} ${quantity} ${unitType} ${object.data.name} executado com sucesso `
      );
      setType("notification");
      setTimeout(() => {
        setMessage("");
        setType("");
        window.location.reload();
      }, 5000);
      setQuantity(0);
      setReference("");
      setDescription("");
    }
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h4 className="text-lg font-bold">{object.data?.name}</h4>
          <form className="form-control mt-4">
            <div className="mt-2">
              <label className="label">
                <span className="label-text">Tipo de Operação</span>
              </label>
              <select
                onChange={(event) => setOperationType(event.target.value)}
                className="select-bordered select"
                required
              >
                <option disabled selected>
                  Escolher uma
                </option>
                <option value="Adicionar">Adicionar</option>
                <option value="Remover">Remover</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="label">
                <span className="label-text">Quantidade</span>
              </label>
              <input
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                type="number"
                placeholder="Escrever aqui"
                className="input-bordered input w-full max-w-xs"
                required
              />
            </div>
            <div className="mt-2">
              <label className="label">
                <span className="label-text">Tipo de unidade</span>
              </label>
              <select
                onChange={(event) => setUnitType(event.target.value)}
                className="select-bordered select"
                required
              >
                <option disabled selected>
                  Escolher uma
                </option>
                <option value="CX">Caixas</option>
                <option value="UN">Unidade</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="label">
                <span className="label-text">Entregue a</span>
              </label>
              <input
                type="text"
                placeholder="Escrever aqui"
                className="input-bordered input w-full max-w-xs"
                onChange={(event) => setDeliveredTo(event.target.value)}
                value={deliveredTo}
                required
              />
            </div>
            <div className="mt-2">
              <label className="label">
                <span className="label-text">Referência</span>
              </label>
              <input
                type="text"
                placeholder="Escrever aqui"
                className="input-bordered input w-full max-w-xs"
                onChange={(event) => setReference(event.target.value)}
                value={reference}
              />
            </div>
            <div className="mt-2">
              <label className="label">
                <span className="label-text">Descrição</span>
              </label>
              <input
                type="text"
                placeholder="Escrever aqui"
                className="input-bordered input w-full max-w-xs"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </div>
            <div className="mt-6">
              <label
                onClick={adicionarOperacao}
                htmlFor="my-modal-4"
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

export default OperationModal;
