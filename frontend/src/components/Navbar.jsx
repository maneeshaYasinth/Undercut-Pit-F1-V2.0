import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
    { name: "Results", path: "/sessions" },
    { name: "Championship", path: "/championship" },
    { name: "Game", path: "/game" }
  ];

  // Active link based on URL
  useEffect(() => {
    const found = links.find((l) => l.path === location.pathname);
    if (found) setActive(found.name);
  }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-[1000] flex justify-center">

      {/* DESKTOP NAVBAR */}
      <div
        className={`
        hidden md:flex mt-4 items-center gap-8 px-8 py-3 rounded-full 
        border transition-all duration-500 relative overflow-hidden text-xl font-extrabold

        ${scrolled 
          ? "bg-black/60 border-red-500/40 backdrop-blur-2xl shadow-2xl"
          : "bg-black/25 border-white/20 backdrop-blur-lg shadow-lg"}
        `}
      >
        {/* Reflection Animation */}
        <span className="absolute inset-0 pointer-events-none before:absolute before:top-0 before:left-[-50%] before:w-[50%] before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-glass" />

        {/* RED NEON LINE */}
        <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-red-700 via-red-500 to-red-700 blur-sm shadow-[0_0_10px_#ff0000]" />

        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setActive(link.name)}
            className={`
              transition-all relative
              ${active === link.name 
                ? "text-red-400 drop-shadow-[0_0_12px_rgba(255,0,0,0.5)]" 
                : "text-white hover:text-red-300"}
            `}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* MOBILE BUTTON */}
      <div className="md:hidden flex justify-center mt-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            p-3 rounded-full
            bg-black/50 border border-white/20 
            backdrop-blur-xl text-white shadow-xl
          "
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-[999]">

          {/* Background */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />

          {/* Floating Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="
              fixed top-6 right-6 z-[1001]
              p-3 rounded-full 
              bg-black/60 border border-white/20
              text-white hover:bg-red-600/80
              transition shadow-lg 
            "
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>

          {/* Sidebar – top centered like hamburger */}
          <aside
            className="
              fixed 
              top-[120px] 
              left-1/2 
              -translate-x-1/2
              z-[1000]
              w-[90%] 
              max-w-md
            "
          >
            <div className="relative bg-black/60 backdrop-blur-2xl border border-white/15 rounded-2xl p-8 shadow-2xl">

              {/* Red neon border */}
              <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-red-600 blur-sm shadow-[0_0_15px_#ff0000]" />

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img src="/uf_logo.png" alt="Sector 3" className="w-12 h-12 rounded-md shadow-sm" />
                  <div>
                    <div className="font-bold text-xl">Sector 3</div>
                    <div className="text-sm text-white/70">F1 predictions & stats</div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 items-center">
                {links.map(({ name, path }) => (
                  <Link
                    key={name}
                    to={path}
                    onClick={() => {
                      setIsOpen(false);
                      setActive(name);
                    }}
                    className={`w-full text-center py-3 rounded-lg transition-all duration-200
                      ${active === name
                        ? "bg-red-700/30 text-red-300 font-semibold shadow-[0_0_15px_rgba(255,0,0,0.4)]"
                        : "text-white hover:bg-white/5"}
                    `}
                  >
                    <span className="text-xl">{name}</span>
                  </Link>
                ))}
              </nav>

            </div>
          </aside>
        </div>
      )}

      {/* Glass reflection animation */}
      <style>{`
        @keyframes glassSweep {
          from { left: -50%; }
          to { left: 150%; }
        }

        .before\\:animate-glass::before {
          animation: glassSweep 6s infinite ease-in-out;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
