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

  useEffect(() => {
    if (user) {
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

      if (!snapshot.empty) {
        setInterested(true);
      } else {
        setInterested(false);
      }
    } catch (error) {
      console.error("Error checking interest:", error);
    }
  };

  const toggleInterest = async () => {
    if (!user) {
      alert("Please login first.");
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
        // Remove interest
        await deleteDoc(snapshot.docs[0].ref);
        setInterested(false);
      } else {
        // Add interest
        await addDoc(collection(db, "interests"), {
          userId: user.uid,
          carId: car.id,
          brand: car.brand,
          model: car.model,
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
    <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/50 transition">
      <div className="px-5 pt-5 pb-2">
        <h3 className="text-xl font-bold text-white">
          <span className="text-red-500">{car.brand}</span> {car.model}
        </h3>
      </div>

      <div className="px-5 pb-5">
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />

        <span className="text-red-400 text-sm font-semibold block mb-2">
          {car.year} • {car.price}
        </span>

        <p className="text-gray-300 text-sm mb-4">{car.description}</p>

        <div className="flex gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-800"
          >
            {showDetails ? "Hide Details" : "Learn More"}
          </button>

          <button
            onClick={toggleInterest}
            disabled={loading}
            className={`flex-1 py-2 rounded-lg ${
              interested
                ? "bg-red-600 text-white"
                : "border border-red-500 text-red-500"
            }`}
          >
            {loading ? "..." : interested ? "Interested ✓" : "Interested"}
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 p-3 bg-black/40 rounded-lg border border-gray-800">
            <p className="text-gray-300 text-sm">
              <strong className="text-white">Brand:</strong> {car.brand}
              <br />
              <strong className="text-white">Model:</strong> {car.model}
              <br />
              <strong className="text-white">Year:</strong> {car.year}
              <br />
              <strong className="text-white">Price:</strong> {car.price}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
