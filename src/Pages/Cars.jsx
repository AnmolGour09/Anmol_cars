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

      const querySnapshot = await getDocs(collection(db, "cars"));

      const carsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Cars:", carsData);

      setCars(carsData);
    } catch (err) {
      console.error("Error loading cars:", err);
      setError("Failed to load cars.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Loading cars...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4 lg:px-20">
      <h2 className="text-4xl text-white text-center mb-10">
        Our <span className="text-red-500">Cars</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p className="text-white text-center col-span-full text-lg">
            No cars available in the showroom.
          </p>
        )}
      </div>
    </div>
  );
}
