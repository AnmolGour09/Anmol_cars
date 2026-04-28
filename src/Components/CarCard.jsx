import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "/api";

export default function CarCard({ car, onInterestChange }) {
  const { user } = useAuth();
  const [interested, setInterested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!user) return;
    checkInterest();
  }, [user, car.id]);

  const checkInterest = async () => {
    try {
      const res = await fetch(
        `${API_URL}/interest/check?userId=${user.id}&carId=${car.id}`
      );
      const data = await res.json();
      if (data.success) {
        setInterested(data.isInterested);
      }
    } catch (err) {
      console.error("Check interest error:", err);
    }
  };

  const toggleInterest = async () => {
    if (!user) {
      alert("Please login to show interest.");
      return;
    }

    setLoading(true);
    try {
      if (interested) {
        const res = await fetch(`${API_URL}/interest`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, carId: car.id }),
        });
        const data = await res.json();
        if (data.success) {
          setInterested(false);
          if (onInterestChange) onInterestChange(car.id, false);
        }
      } else {
        const res = await fetch(`${API_URL}/interest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, carId: car.id }),
        });
        const data = await res.json();
        if (data.success) {
          setInterested(true);
          if (onInterestChange) onInterestChange(car.id, true);
        } else {
          alert(data.message || "Failed to add interest.");
        }
      }
    } catch (err) {
      console.error("Toggle interest error:", err);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vehicle-card reev-card bg-[#111] border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10">
      <div className="header px-5 pt-5 pb-2">
        <h3 className="text-xl font-bold text-white">
          <span style={{ fontFamily: "cursive", color: "red" }}>{car.brand}</span>{" "}
          {car.model}
        </h3>
      </div>
      <div className="card-content px-5 pb-5">
        <div className="card-image rounded-lg overflow-hidden mb-3">
          <img
            src={car.image || "/src/assets/why.jpg"}
            alt={car.name}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="card-header mb-2">
          <span className="text-red-400 text-sm font-semibold tracking-wide uppercase">
            {car.year} &bull; {car.price}
          </span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {car.description}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 py-2 rounded-lg border border-gray-600 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            {showDetails ? "Hide Details" : "Learn More"}
          </button>
          <button
            onClick={toggleInterest}
            disabled={loading}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50 ${
              interested
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            }`}
          >
            {loading ? "..." : interested ? "Interested ✓" : "Interested"}
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 p-3 bg-black/40 rounded-lg border border-gray-800">
            <p className="text-gray-400 text-sm leading-relaxed">
              <strong className="text-white">Full Name:</strong> {car.name}
              <br />
              <strong className="text-white">Brand:</strong> {car.brand}
              <br />
              <strong className="text-white">Model:</strong> {car.model}
              <br />
              <strong className="text-white">Year:</strong> {car.year}
              <br />
              <strong className="text-white">Price:</strong> {car.price}
            </p>
            <p className="text-gray-300 text-sm mt-2 leading-relaxed">
              {car.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
