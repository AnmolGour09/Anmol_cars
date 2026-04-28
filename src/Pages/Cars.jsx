import React, { useState, useEffect } from "react";
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

      // Collection reference
      const querySnapshot = await getDocs(collection(db, "cars"));

      if (querySnapshot.empty) {
        setCars([]);
      } else {
        const carsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(carsData);
      }
    } catch (err) {
      console.error("Firebase Error:", err);
      setError("Failed to load cars. Please check your database rules.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24">
        <div className="text-white text-xl animate-pulse">Loading showroom...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
            Our <span className="text-red-500">Showroom</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Explore our premium collection of vehicles.
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-10 p-4 border border-red-500/30 rounded-lg bg-red-500/10">
            {error}
          </div>
        )}

        {cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl">
            <p className="text-gray-500 text-xl font-medium">No cars available in the showroom.</p>
            <p className="text-gray-600 text-sm mt-2 italic">Add documents to 'cars' collection in Firestore.</p>
          </div>
        )}
      </div>
    </div>
  );
}
