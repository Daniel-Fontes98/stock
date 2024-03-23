import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="drawer-side fixed left-0 top-0 h-full w-80 bg-slate-400">
      <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
      <ul className="menu w-80  bg-slate-200 p-4 text-base-content">
        <li>
          <Link className="btn-info btn my-2" href="/items/createItem">
            Adicionar Item
          </Link>
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
  );
};

export default Sidebar;
