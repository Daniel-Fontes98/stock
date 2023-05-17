import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import ClientSideTable from "~/components/Tables/ClientSideTable";
import HistoryModal from "~/components/Modals/HistoryModal";
import ItemModal from "~/components/Modals/ItemModal";
import OperationModal from "~/components/Modals/OperationModal";
import Notification from "~/components/Notification";
import AlertModal from "~/components/Modals/AlertModal";

const Home: NextPage = () => {
  const [objectId, setObjectId] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  return (
    <>
      <Head>
        <title>Gestão de Stock</title>
        <meta name="description" content="Gerado por Daniel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container mb-5">
          <label htmlFor="my-modal-5" className="btn-info btn">
            Adicionar Item
          </label>
          <label htmlFor="my-modal-6" className="btn-warning btn ml-5">
            Ver Historico
          </label>
          <label htmlFor="my-modal-7" className="btn-error btn ml-5">
            Ver Alertas
          </label>
        </div>

        <div className="container mx-auto">
          <Notification message={message} type={type} />
          <AlertModal />
          <HistoryModal />
          <ItemModal setMessage={setMessage} setType={setType} />
          <OperationModal
            objectId={objectId}
            setMessage={setMessage}
            setType={setType}
          />
          <ClientSideTable setObjectId={setObjectId} />
        </div>
      </main>
    </>
  );
};

export default Home;
