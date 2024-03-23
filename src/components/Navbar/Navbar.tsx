import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-slate-200">
      <Link href="/">
        <label className="btn-ghost btn text-xl normal-case">Voltar</label>
      </Link>
    </div>
  );
};

export default Navbar;
