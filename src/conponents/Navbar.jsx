import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const role = localStorage.getItem("role");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]);

  const logout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/login");
  };

  const navButton =
    "px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:text-indigo-600";

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-slate-400 to-indigo-950 text-white shadow-md">

      {/* Logo */}
      <h1 
        onClick={() => navigate("/")}
        className="text-xl font-bold cursor-pointer"
      >
        Task Manager
      </h1>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">

        {token ? (
          <>
            {/* Role Badge */}
            <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
              {role?.toUpperCase()}
            </span>

            <button
              onClick={() => navigate("/")}
              className={navButton}
            >
              Dashboard
            </button>

            <button
              onClick={logout}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className={navButton}
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-all duration-200"
            >
              Register
            </button>
          </>
        )}

      </div>
    </div>
  );
}
