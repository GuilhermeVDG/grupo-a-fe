import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, FileText, Settings, LogOut } from "lucide-react";
import logo from "./assets/logo.svg";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col justify-between">
      <div>
        <div className="p-6">
          <img src={logo} alt="Grupo A" className="h-8 w-auto" />
        </div>
        <nav className="flex flex-col gap-2 px-6">
          {[
            { to: "/", icon: <Home size={18} />, label: "Dashboard" },
            {
              to: "/produtos",
              icon: <ShoppingBag size={18} />,
              label: "Produtos",
            },
            {
              to: "/relatorios",
              icon: <FileText size={18} />,
              label: "Relatórios",
            },
            {
              to: "/admin",
              icon: <Settings size={18} />,
              label: "Administração",
            },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-6 text-gray-700 hover:font-medium ${
                  isActive ? "bg-gray-100 shadow-md rounded-lg" : ""
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-6">
        <button className="flex items-center gap-2 text-red-500 text-sm hover:underline">
          <LogOut size={18} /> Sair
        </button>
      </div>
    </aside>
  );
}
