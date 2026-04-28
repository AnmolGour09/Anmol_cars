import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "/api";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("users");
  const [usersData, setUsersData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchAdminData();
  }, [user, navigate]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      const [usersRes, carsRes] = await Promise.all([
        fetch(`${API_URL}/admin/users-with-interests`),
        fetch(`${API_URL}/admin/cars-with-interests`),
      ]);

      const usersJson = await usersRes.json();
      const carsJson = await carsRes.json();

      if (usersJson.success) {
        setUsersData(usersJson.users);
      }

      if (carsJson.success) {
        setCarsData(carsJson.cars);
      }
    } catch (err) {
      setError("Failed to load admin dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4 lg:px-20">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-wide font-mono uppercase">
          Admin <span className="text-red-500">Dashboard</span>
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "users"
              ? "bg-red-600 text-white"
              : "bg-[#111] text-gray-300 border border-gray-700 hover:border-red-500"
          }`}
        >
          Users with Cars
        </button>

        <button
          onClick={() => setActiveTab("cars")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "cars"
              ? "bg-red-600 text-white"
              : "bg-[#111] text-gray-300 border border-gray-700 hover:border-red-500"
          }`}
        >
          Cars with Users
        </button>
      </div>

      {/* USERS TAB */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">
            All Users & Their Interested Cars
          </h3>

          {usersData.length === 0 ? (
            <p className="text-gray-500 text-center text-lg">No users found.</p>
          ) : (
            usersData.map((u) => (
              <div
                key={u.id}
                className="bg-[#111] border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white">{u.name}</h4>
                    <p className="text-gray-400 text-sm">{u.email}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-red-600/20 text-red-400"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-red-400 font-bold text-lg">
                      {u.interestedCars?.length || 0}
                    </span>
                    <p className="text-gray-500 text-xs">interests</p>
                  </div>
                </div>

                {u.interestedCars?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {u.interestedCars.map((car) => (
                      <div
                        key={car.id}
                        className="bg-black/50 border border-gray-800 rounded-lg p-3"
                      >
                        <p className="text-white font-semibold text-sm">
                          {car.brand} {car.model}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {car.year} • {car.price}
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                          Interested on:{" "}
                          {new Date(car.interest_date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm italic">
                    No interests shown yet.
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* CARS TAB */}
      {activeTab === "cars" && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">
            All Cars & Interested Users
          </h3>

          {carsData.length === 0 ? (
            <p className="text-gray-500 text-center text-lg">No cars found.</p>
          ) : (
            carsData.map((car) => (
              <div
                key={car.id}
                className="bg-[#111] border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white">
                      <span style={{ fontFamily: "cursive", color: "red" }}>
                        {car.brand}
                      </span>{" "}
                      {car.model}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {car.year} • {car.price}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-red-400 font-bold text-lg">
                      {car.interestedUsers?.length || 0}
                    </span>
                    <p className="text-gray-500 text-xs">interested users</p>
                  </div>
                </div>

                {car.interestedUsers?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {car.interestedUsers.map((u) => (
                      <div
                        key={u.id}
                        className="bg-black/50 border border-gray-800 rounded-lg p-3"
                      >
                        <p className="text-white font-semibold text-sm">
                          {u.name}
                        </p>
                        <p className="text-gray-400 text-xs">{u.email}</p>
                        <p className="text-gray-600 text-xs mt-1">
                          Interested on:{" "}
                          {new Date(u.interest_date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm italic">
                    No users interested yet.
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}