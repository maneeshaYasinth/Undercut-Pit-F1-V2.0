import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const data = await register({ username, email, password }); // capture response
    loginUser(data.user); // update context immediately
    navigate("/"); // redirect to homepage or dashboard
  } catch (err) {
    setError(err || "Registration failed");
  }
};


  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#1a0000] to-[#120000]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-lg shadow-lg p-8 rounded-2xl w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Register
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4 text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-red-300 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
