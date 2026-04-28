import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function CarCard({ car }) {
  const { user } = useAuth();
  const [interested, setInterested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Fallback image link (Unsplash)
  const defaultImage = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop";

  useEffect(() => {
    if (user && car.id) {
      checkInterest();
    }
  }, [user, car.id]);

  const checkInterest = async () => {
    try {
      const q = query(
        collection(db, "interests"),
        where("userId", "==", user.uid),
        where("carId", "==", car.id)
      );
      const snapshot = await getDocs(q);
      setInterested(!snapshot.empty);
    } catch (error) {
      console.error("Check interest error:", error);
    }
  };

  const toggleInterest = async () => {
    if (!user) {
      alert("Please login to save your interest.");
      return;
    }

    setLoading(true);
    try {
      const q = query(
        collection(db, "interests"),
        where("userId", "==", user.uid),
        where("carId", "==", car.id)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        // Un-like
        await deleteDoc(snapshot.docs[0].ref);
        setInterested(false);
      } else {
        // Like
        await addDoc(collection(db, "interests"), {
          userId: user.uid,
          carId: car.id,
          brand: car.brand || "Unknown",
          model: car.model || "Unknown",
          timestamp: new Date()
        });
        setInterested(true);
      }
    } catch (error) {
      console.error("Interest toggle error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-2">
        <h3 className="text-xl font-bold text-white truncate">
          <span className="text-red-500 uppercase italic mr-1">{car.brand}</span> {car.model}
        </h3>
      </div>

      <div className="px-5 pb-5 flex flex-col flex-grow">
        {/* Image Section with Error Handling */}
        <div className="relative h-48 w-full mb-3 rounded-lg overflow-hidden bg-gray-900">
          <img
            src={car.image || defaultImage}
            alt={car.model}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = defaultImage;
            }}
          />
        </div>

        {/* Info */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-red-400 text-sm font-bold tracking-wider">
            {car.year}
          </span>
          <span className="bg-red-500/10 text-red-500 px-2 py-1 rounded text-xs font-bold">
            {car.price}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">
          {car.description || "Premium quality vehicle, available for a test drive."}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 py-2 text-xs font-bold rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition uppercase"
          >
            {showDetails ? "Less" : "Details"}
          </button>

          <button
            onClick={toggleInterest}
            disabled={loading}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition uppercase ${
              interested
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                : "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            }`}
          >
            {loading ? "..." : interested ? "Saved ✓" : "Interest"}
          </button>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div className="mt-4 p-3 bg-black/50 rounded-lg border border-gray-800 text-xs text-gray-300 space-y-1 animate-in slide-in-from-top-2 duration-300">
            <p><span className="text-white font-bold uppercase">Brand:</span> {car.brand}</p>
            <p><span className="text-white font-bold uppercase">Model:</span> {car.model}</p>
            <p><span className="text-white font-bold uppercase">Year:</span> {car.year}</p>
            <p><span className="text-white font-bold uppercase">Price:</span> {car.price}</p>
          </div>
        )}
      </div>
    </div>
  );
}
