import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // If on home ("/"), make transparent, else black
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`fixed top-0 left-0 w-full z-50 px-[8%] py-4 border-b border-[--thin-border] 
        ${isHomePage
          ? hover
            ? "bg-black"
            : "bg-transparent backdrop-blur-md"
          : "bg-black"} text-white transition-colors duration-300`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left Menu */}
        <ul className="hidden gap-6 text-sm font-light md:flex">
          <li className="text-lg font-semibold cursor-pointer transition hover:text-red-400">
            <Link to="/">Car</Link>
          </li>
          <li>
            <a
              href="#AboutUs"
              className="text-lg font-semibold cursor-pointer transition hover:text-red-400"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#Showroom"
              className="text-lg font-semibold cursor-pointer transition hover:text-red-400"
            >
              Showroom
            </a>
          </li>
          <li>
            <Link
              to="/cars"
              className="text-lg font-semibold cursor-pointer transition hover:text-red-400"
            >
              Cars
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/my-interests"
                className="text-lg font-semibold cursor-pointer transition hover:text-red-400"
              >
                My Interests
              </Link>
            </li>
          )}
          {user && user.role === "admin" && (
            <li>
              <Link
                to="/admin"
                className="text-lg font-semibold cursor-pointer transition hover:text-red-400"
              >
                Admin
              </Link>
            </li>
          )}
          <li>
            <a
              href="#Help"
              className="text-lg font-semibold cursor-pointer transition hover:text-red-400"
            >
              Help
            </a>
          </li>
          {user ? (
            <>
              <li className="text-lg font-semibold text-red-400">
                Hi, {user.name}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-lg font-semibold cursor-pointer transition hover:text-red-400"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="text-lg font-semibold cursor-pointer transition hover:text-red-400">
                <Link to="/login">Login</Link>
              </li>
              <li className="text-lg font-semibold cursor-pointer transition hover:text-red-400">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Brand */}
        <div className="ml-auto text-4xl font-bold tracking-wide cursor-pointer font-bricolage">
          <span className="text-red-500">Car</span>- Website
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-4">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <i
              className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} text-2xl`}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm font-light z-[9999]">
          <ul className="flex flex-col gap-4">
            <li className="text-lg font-semibold text-red-500 cursor-pointer">
              Car
            </li>
            <li className="text-lg font-semibold transition cursor-pointer hover:text-red-500">
              About Us
            </li>
            <li className="text-lg font-semibold transition cursor-pointer hover:text-red-500">
              Showroom
            </li>
            <li className="text-lg font-semibold transition cursor-pointer hover:text-red-500">
              <Link to="/cars">Cars</Link>
            </li>
            {user && (
              <li className="text-lg font-semibold transition cursor-pointer hover:text-red-500">
                <Link to="/my-interests">My Interests</Link>
              </li>
            )}
            {user && user.role === "admin" && (
              <li className="text-lg font-semibold transition cursor-pointer hover:text-red-500">
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li className="text-lg font-semibold transition cursor-pointer hover:text-red-500">
              Help
            </li>
            {user ? (
              <>
                <li className="text-lg font-semibold text-red-500">
                  Hi, {user.name}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-lg font-semibold transition cursor-pointer hover:text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="text-lg font-semibold transition cursor-pointer hover:text-red-500">
                  <Link to="/login">Login</Link>
                </li>
                <li className="text-lg font-semibold transition cursor-pointer hover:text-red-500">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>

          <div className="flex gap-4 mt-4">
            <i className="transition cursor-pointer bi bi-instagram text-x1 hover:text-red-500"></i>
            <i className="transition cursor-pointer bi bi-twitter-x text-x1 hover:text-red-500"></i>
            <i className="transition cursor-pointer bi bi-github text-x1 hover:text-red-500"></i>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
