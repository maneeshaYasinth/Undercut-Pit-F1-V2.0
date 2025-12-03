import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileDrawer() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    setIsOpen(false);
    navigate("/login");
  }

  const handleLogin = () =>{
    setIsOpen(false);
    navigate("/login");
  }


  return (
    <>
      <button
        onClick={toggleDrawer}
        className="fixed top-4 right-4 z-[1001] bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
      >
        {user ? `Hi👋, ${user.username}` : "Login"}
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/20 backdrop-blur-lg shadow-lg p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-[60]`}  
      >

        {user ? (
          <>
            <h2 className="text-xl text-white font-bold mb-4">Profile</h2>
            <p className="text-white">Name: {user.username}</p>
            <p className="text-white">Email: {user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-6 w-full z-55 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (<>
          <p className="text-white">Not logged in</p>
          <button
              onClick={handleLogin}
              className="mt-6 w-full z-55 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Login
            </button>
            </>
        )}
      </div>
    </>
  );
}