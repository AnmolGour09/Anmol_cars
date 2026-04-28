import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./Components/Nav/Nav";
import Index from "./Components/Page/Index";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cars from "./Pages/Cars";
import UserInterests from "./Pages/UserInterests";
import AdminDashboard from "./Pages/AdminDashboard";
import Footer from "./Components/Footer/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";


function App() {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-20 h-20">
        <div
          className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin"
          style={{
            boxShadow: "0 0 15px rgba(255,0,0,0.8), 0 0 30px rgba(255,0,0,0.6)",
          }}
        ></div>
      </div>
    </div>
    );
  }


  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Index />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/my-interests" element={<UserInterests />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
