import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/drivers"); // redirect after login
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#1a0000] to-[#120000]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-lg shadow-lg p-8 rounded-2xl w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
