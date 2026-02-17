import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <div className="flex flex-col gap-3">
        <input className="rounded border p-2 text-black" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full p-3 border rounded mb-4" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 transition" onClick={handleLogin}>Login</button>
      </div>
    </div>
    </div>
  );
}


