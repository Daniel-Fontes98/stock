import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "~/components/Navbar/Navbar";
import { useField } from "~/hooks/useField";
import { api } from "~/utils/api";

const CreateOperation = () => {
  const [operationType, setOperationType] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unitType, setUnitType] = useState("");
  const reference = useField("reference");
  const description = useField("description");
  const deliveredTo = useField("deliveredTo");
  const BoxMutation = api.items.updateBoxes.useMutation();
  const UnitMutation = api.items.updateUnits.useMutation();
  const router = useRouter();
  const { objectId } = router.query;

  const object = api.items.getOne.useQuery({ id: String(objectId) }).data;

  const handleSubmit = () => {
    if (quantity && object) {
      if (operationType === "Remover" && object) {
        if (unitType === "CX" && quantity > object.quantityBox) {
          console.log("Error");
          return;
        } else if (unitType === "UN" && quantity > object.Total) {
          console.log("Error");
          return;
        }
      }

      if (unitType === "CX") {
        BoxMutation.mutate({
          operationType: operationType,
          value: quantity,
          id: String(objectId),
          reference: reference.value,
          description: description.value,
          deliveredTo: deliveredTo.value,
        });
      } else {
        UnitMutation.mutate({
          id: String(objectId),
          value: quantity,
          operationType: operationType,
          quantityBox: object.quantityBox,
          quantityInBox: object.quantityInBox,
          quantityUnit: object.quantityUnit,
          reference: reference.value,
          deliveredTo: deliveredTo.value,
          description: description.value,
        });
      }
      void router.push("/");
    }
  };

  if (object) {
    return (
      <>
        <Navbar />
        <div className="mt-3">
          <div className="mb-5 flex items-center justify-center">
            <h3 className="text-lg font-bold">{object.name}</h3>
          </div>
          <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-3 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Tipo de Operação</span>
                </label>
                <select
                  placeholder="Escolher um"
                  onChange={(e) => setOperationType(e.target.value)}
                  className="select-bordered select"
                  required
                >
                  <option selected disabled>
                    Escolher um
                  </option>
                  <option>Adicionar</option>
                  <option>Remover</option>
                </select>
              </div>
              <div className="form-control mb-3 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Quantidade</span>
                </label>
                <input
                  type="number"
                  placeholder="Quantidade"
                  className="input-bordered input w-full max-w-lg"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                />
              </div>
              <div className="form-control mb-3 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Tipo de Unidade</span>
                </label>
                <select
                  placeholder="Escolher um"
                  onChange={(e) => setUnitType(e.target.value)}
                  className="select-bordered select"
                  required
                >
                  <option selected disabled>
                    Escolher um
                  </option>
                  <option value="CX">Caixas</option>
                  <option value="UN">Unidade</option>
                </select>
              </div>
              <div className="form-control mb-3 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Entregue a</span>
                </label>
                <input
                  type="text"
                  placeholder="Entregue a"
                  className="input-bordered input w-full max-w-lg"
                  {...deliveredTo}
                  required
                />
              </div>
              <div className="form-control mb-3 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Referência</span>
                </label>
                <input
                  type="text"
                  placeholder="Referência"
                  className="input-bordered input w-full max-w-lg"
                  {...reference}
                />
              </div>
              <div className="form-control mb-7 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Descrição</span>
                </label>
                <input
                  type="text"
                  placeholder="Descrição"
                  className="input-bordered input w-full max-w-lg"
                  {...description}
                />
              </div>
              <button className="btn-success btn" type="submit">
                Submeter
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default CreateOperation;
