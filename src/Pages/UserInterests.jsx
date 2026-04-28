import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "/api";

export default function UserInterests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchInterests();
  }, [user, navigate]);

  const fetchInterests = async () => {
    try {
      const res = await fetch(`${API_URL}/user/interests/${user.id}`);
      const data = await res.json();
      if (data.success) {
        setInterests(data.interests);
      } else {
        setError(data.message || "Failed to load interests.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeInterest = async (carId) => {
    try {
      const res = await fetch(`${API_URL}/interest`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, carId }),
      });
      const data = await res.json();
      if (data.success) {
        setInterests((prev) => prev.filter((car) => car.id !== carId));
      }
    } catch (err) {
      console.error("Remove interest error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="text-white text-xl">Loading your interests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-wide font-mono uppercase">
          My <span className="text-red-500">Interests</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Cars you have shown interest in.
        </p>
      </div>

      {interests.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-20">
          You haven't shown interest in any cars yet.
          <button
            onClick={() => navigate("/cars")}
            className="text-red-500 hover:text-red-400 underline ml-2"
          >
            Browse Cars
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {interests.map((car) => (
            <div
              key={car.id}
              className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-500/50"
            >
              <div className="px-5 pt-5 pb-2">
                <h3 className="text-xl font-bold text-white">
                  <span style={{ fontFamily: "cursive", color: "red" }}>
                    {car.brand}
                  </span>{" "}
                  {car.model}
                </h3>
              </div>

              <div className="px-5 pb-5">
                <div className="rounded-lg overflow-hidden mb-3">
                  <img
                    src={car.image || "/src/assets/why.jpg"}
                    alt={car.model}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <span className="text-red-400 text-sm font-semibold tracking-wide uppercase block mb-2">
                  {car.year} • {car.price}
                </span>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {car.description}
                </p>

                <button
                  onClick={() => removeInterest(car.id)}
                  className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
                >
                  Remove Interest
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 mt-6">{error}</p>
      )}
    </div>
  );
}