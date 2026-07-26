import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { loginUser, getCurrentUser } from "../../services/authService";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Login and receive JWT
      const tokens = await loginUser(username, password);

      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      // Fetch current user
      const user = await getCurrentUser();
      console.log(user);

      localStorage.setItem("user", JSON.stringify(user));

      // Store user in context
      login(user);

      // Redirect based on role
      if (user.is_superuser) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      }

      alert("Login failed");
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
            required
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
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

        <div className="text-center mt-5">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Create New Staff Account
          </button>
        </div>

      </form>

    </div>
  );
}

export default LoginForm;