import { useNavigate, useLocation } from "react-router-dom";
import { exportCSV } from "../../services/leadService";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExport = async () => {
    try {
      const blob = await exportCSV();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "leads.csv";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Unable to export CSV.");
    }
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Leads",
      path: "/admin/leads",
    },
    {
      name: "Follow-ups",
      path: "/admin/followups",
    },
    {
      name: "Export CSV",
      action: handleExport, // <-- call function instead of navigating
    },
    {
      name: "Archived Leads",
      path: "/admin/archived-leads",
    },
  ];

  return (
    <aside className="w-64 bg-white shadow min-h-screen p-5">
      <ul className="space-y-4">
        {menu.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              if (item.action) {
                item.action();
              } else {
                navigate(item.path);
              }
            }}
            className={`rounded-lg p-3 cursor-pointer transition
              ${
                item.path && location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;