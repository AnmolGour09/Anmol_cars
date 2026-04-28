import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const firebaseUser = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

      if (!userDoc.exists()) {
        setError("User data not found.");
        return;
      }

      const userData = userDoc.data();

      login({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: userData.name,
        role: userData.role,
      });

      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 pt-24">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-2xl border border-red-500/30">
        <h2 className="text-3xl text-white text-center font-bold mb-6">
          Welcome Back
        </h2>

        {error && <div className="text-red-400 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email"
            value={form.email} onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-black border border-gray-700 text-white" />

          <input type="password" name="password" placeholder="Password"
            value={form.password} onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-black border border-gray-700 text-white" />

          <button type="submit" disabled={loading}
            className="w-full py-2 rounded bg-red-600 text-white">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500">Register</Link>
        </p>
      </div>
    </div>
  );
}
