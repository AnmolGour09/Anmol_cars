import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import CarCard from "../Components/CarCard"; // CarCard component import karein

export default function UserInterests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [interestedCars, setInterestedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchInterests();
    }
  }, [user]);

  const fetchInterests = async () => {
    try {
      setLoading(true);
      
      // 1. Pehle user ki interests fetch karein
      const q = query(
        collection(db, "interests"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const likedCarIds = snapshot.docs.map((doc) => doc.data().carId);

      if (likedCarIds.length === 0) {
        setInterestedCars([]);
        return;
      }

      // 2. Phir saari cars fetch karein aur filter karein jo user ko pasand hain
      const carsSnapshot = await getDocs(collection(db, "cars"));
      const allCarsData = carsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sirf wahi cars rakhein jin ki ID interests collection mein thi
      const filteredCars = allCarsData.filter((car) => 
        likedCarIds.includes(car.id)
      );

      setInterestedCars(filteredCars);
    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="text-white text-xl animate-pulse">Loading your interests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-12 uppercase tracking-tight">
          My <span className="text-red-500">Interests</span>
        </h2>

        {interestedCars.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl">
            <p className="text-gray-500 text-xl font-medium">Aapne abhi tak koi car save nahi ki hai.</p>
            <button 
              onClick={() => navigate("/cars")}
              className="mt-4 text-red-500 hover:underline"
            >
              Showroom dekhein
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {interestedCars.map((car) => (
              /* Hum wahi CarCard use kar rahe hain jo Showroom mein hai */
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
