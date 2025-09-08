import { Link } from "react-router-dom";
import { getUser } from "../services/authService";

export default function AuthButton() {
  const user = getUser();

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl px-4 py-2">
      {!user ? (
        <Link
          to="/login"
          className="text-white font-medium hover:underline transition"
        >
          Login
        </Link>
      ) : (
        <span className="text-white font-medium">
          Welcome, {user.username} 👋
        </span>
      )}
    </div>
  );
}
