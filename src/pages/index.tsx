import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import ClientSideTable from "~/components/Tables/ClientSideTable";
import ItemModal from "~/components/Modals/ItemModal";
import OperationModal from "~/components/Modals/OperationModal";
import Notification from "~/components/Notification";
import SupplierModal from "~/components/Modals/SupplierModal";
import Link from "next/link";

const Home: NextPage = () => {
  const [objectId, setObjectId] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  return (
    <>
      <Head>
        <title>GestÃ£o de Stock</title>
        <meta name="description" content="Gerado por Daniel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="drawer-mobile drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <main className="absolute bottom-6 left-96 right-6 top-6 min-h-screen items-center justify-center">
            <div className="container mx-auto">
              <Notification message={message} type={type} />
              <SupplierModal setMessage={setMessage} setType={setType} />
              <ItemModal setMessage={setMessage} setType={setType} />
              <OperationModal
                objectId={objectId}
                setMessage={setMessage}
                setType={setType}
              />
              <ClientSideTable setObjectId={setObjectId} />
            </div>
          </main>
          <label
            htmlFor="my-drawer-2"
            className="btn-primary drawer-button btn lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side fixed left-0 top-0 h-full w-80 bg-slate-400">
          <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
          <ul className="menu w-80  bg-slate-200 p-4 text-base-content">
            <li>
              <label htmlFor="my-modal-5" className="btn-info btn my-2">
                Adicionar Item
              </label>
            </li>
            <li>
              <label htmlFor="my-modal-8" className="btn-info btn my-2">
                Adicionar Fornecedor
              </label>
            </li>
            <li>
              <Link
                href="/Operation/History"
                className="btn-warning btn my-2 hover:cursor-pointer"
              >
                <label>Ver Historico</label>
              </Link>
            </li>
            <li>
              <Link
                href="/Suppliers/Table"
                className="btn-warning btn my-2 hover:cursor-pointer"
              >
                <label>Ver Fornecedores</label>
              </Link>
            </li>
            <li>
              <Link
                href="/Alerts/AlertsTable"
                className="btn-error btn my-2 hover:cursor-pointer"
              >
                <label>Ver Alertas</label>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
