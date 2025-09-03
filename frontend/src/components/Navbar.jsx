import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
      { name: "Home", path: "/" },
      { name: "News", path: "/news" },
      { name: "Seasons", path: "/seasons" },
      { name: "Drivers", path: "/drivers" }
  ];


  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      {/* Main Nav Container */}
      <div className="hidden md:flex items-center gap-8 px-6 py-3 
                      rounded-full backdrop-blur-md bg-white/20 border border-white/30 
                      shadow-lg text-white text-xl font-medium">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:text-red-400 transition"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-2/3 h-full bg-black/70 backdrop-blur-md 
                        border-r border-white/20 p-6 flex flex-col gap-6 text-white z-40">
          <button
            onClick={() => setIsOpen(false)}
            className="self-end mb-4 p-2 rounded-full hover:bg-white/20"
          >
            <X size={28} />
          </button>
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-lg hover:text-red-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
