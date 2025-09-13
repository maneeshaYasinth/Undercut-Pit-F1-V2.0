import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // optional: redirect to login
  };

  if (!user) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl px-4 py-2">
        <Link
          to="/login"
          className="text-white font-medium hover:underline transition"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-64 h-64 bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-white font-bold text-lg mb-2">Profile</h2>
        <p className="text-white font-medium">Name: {user.username}</p>
        <p className="text-white font-medium">Email: {user.email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
}
