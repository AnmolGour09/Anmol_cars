import React, { useState, useEffect } from "react";
import CarCard from "../Components/CarCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const carsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCars(carsData);
    } catch (error) {
      console.error("Error loading cars:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading cars...</div>;
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4 lg:px-20">
      <h2 className="text-4xl text-white text-center mb-10">
        Our <span className="text-red-500">Showroom</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
