import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import ClientSideTable from "~/components/Tables/ClientSideTable";
import Notification from "~/components/Notification";
import SupplierModal from "~/components/Modals/SupplierModal";
import Sidebar from "~/components/Sidebar/Sidebar";

const Home: NextPage = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  return (
    <>
      <Head>
        <title>Gestão de Stock</title>
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
              <ClientSideTable />
            </div>
          </main>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
