import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-blue-700 text-white h-16 flex items-center justify-between px-8 shadow">

      <h1 className="text-2xl font-bold">
        Centre Lead Tracker
      </h1>

      <button
        onClick={logout}
        className="w-10 h-10 rounded-full bg-white text-blue-700 font-bold"
      >
        D
      </button>

    </nav>
  );
};

export default Navbar;