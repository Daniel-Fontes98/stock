import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Navbar from "~/components/Navbar/Navbar";
import { useField } from "~/hooks/useField";
import { api } from "~/utils/api";

const createItem: NextPage = () => {
  const name = useField("name");
  const [alertMin, setAlertMin] = useState<number>();
  const [alertMax, setAlertMax] = useState<number>();
  const [quantityInBox, setQuantityInBox] = useState<number>();
  const [supplierId, setSupplierId] = useState("");
  const suppliers = api.suppliers.getAll.useQuery().data;
  const mutation = api.items.insertOne.useMutation();
  const router = useRouter();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (alertMin && alertMax && quantityInBox) {
      const user = await mutation.mutate({
        name: name.value,
        alertMin: alertMin,
        alertMax: alertMax,
        quantityInBox: quantityInBox,
        supplierId: supplierId,
      });
    }

    router.push("/");
  };

  if (suppliers) {
    return (
      <>
        <Navbar />
        <div className="mt-3">
          <div className="mb-5 flex items-center justify-center">
            <h3 className="text-lg font-bold">Adicionar Item</h3>
          </div>
          <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-3 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Nome do artigo</span>
                </label>
                <input
                  type="text"
                  placeholder="Nome do artigo"
                  className="input-bordered input w-full max-w-lg"
                  {...name}
                  required
                />
              </div>
              <div className="form-control mb-3 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Valor de Alerta Minimo</span>
                </label>
                <input
                  type="number"
                  placeholder="Alerta Minimo"
                  className="input-bordered input w-full max-w-lg"
                  value={alertMin}
                  onChange={(e) => setAlertMin(Number(e.target.value))}
                  required
                />
              </div>
              <div className="form-control mb-3 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Valor de Alerta Maximo</span>
                </label>
                <input
                  type="number"
                  placeholder="Alerta Maximo"
                  className="input-bordered input w-52 max-w-lg"
                  value={alertMax}
                  onChange={(e) => setAlertMax(Number(e.target.value))}
                  required
                />
              </div>
              <div className="form-control mb-3 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Unidades por caixa</span>
                </label>
                <input
                  type="number"
                  placeholder="Unidades por caixa"
                  className="input-bordered input w-full max-w-lg"
                  value={quantityInBox}
                  onChange={(e) => setQuantityInBox(Number(e.target.value))}
                  required
                />
              </div>
              <div className="form-control mb-5 w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Selecionar fornecedor</span>
                </label>
                <select
                  className="select-bordered select"
                  onChange={(e) => setSupplierId(e.target.value)}
                  required
                >
                  <option selected disabled>
                    Escolher um
                  </option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
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

export default createItem;
