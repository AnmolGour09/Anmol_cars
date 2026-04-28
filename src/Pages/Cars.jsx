import React, { useState, useEffect } from "react";
// Path check karein: Agar CarCard file src/Components/CarCard.jsx hai toh ye sahi hai
import CarCard from "../Components/CarCard"; 
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError("");

      // IMPORTANT: Agar aapke Firebase mein collection ka naam "Cars" (C capital) hai, 
      // toh niche "cars" ko badal kar "Cars" kar dein.
      const carsCollectionRef = collection(db, "cars");
      const querySnapshot = await getDocs(carsCollectionRef);

      if (querySnapshot.empty) {
        console.warn("Firebase Warning: 'cars' collection is empty or doesn't exist.");
        setCars([]);
      } else {
        const carsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        console.log("Success! Data fetched:", carsData);
        setCars(carsData);
      }
    } catch (err) {
      console.error("Firebase Error Details:", err);
      setError("Failed to load cars. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading showroom...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <button 
          onClick={fetchCars}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Our <span className="text-red-500">Showroom</span>
        </h2>

        {cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl">
            <p className="text-gray-400 text-lg">
              No cars available in the showroom right now.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              (Check Firestore collection name and rules)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
