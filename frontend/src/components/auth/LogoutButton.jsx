import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-white text-blue-700 px-5 py-2 rounded-lg hover:bg-gray-100"
    >
      Logout
    </button>
  );
}

export default LogoutButton;