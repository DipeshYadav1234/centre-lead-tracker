import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(username, password);

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    navigate("/dashboard");
  } catch (error) {
    alert("Invalid username or password");
    console.error(error);
  }
};

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
        Centre Lead Tracker
      </h1>

      <p className="text-center text-gray-500 mb-8">
        Login to continue
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="block mb-2 font-medium">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default LoginForm;