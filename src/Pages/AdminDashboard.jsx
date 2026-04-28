import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminDashboard() {
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    description: "",
    image: "",
  });
  const [status, setStatus] = useState("");

  const handleInput = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const addCarToFirebase = async (e) => {
    e.preventDefault();
    setStatus("Adding...");
    try {
      await addDoc(collection(db, "cars"), car);
      setStatus("Success! Car added.");
      setCar({ brand: "", model: "", year: "", price: "", description: "", image: "" }); // Reset form
    } catch (err) {
      console.error(err);
      setStatus("Error adding car.");
    }
  };

  return (
    <div className="min-h-screen bg-black pt-28 flex justify-center px-4">
      <div className="w-full max-w-lg bg-[#111] p-8 rounded-2xl border border-gray-800 h-fit">
        <h2 className="text-2xl font-bold text-white mb-6">Add New <span className="text-red-500">Car</span></h2>
        
        <form onSubmit={addCarToFirebase} className="space-y-4">
          <input name="brand" placeholder="Brand" onChange={handleInput} value={car.brand} className="w-full p-3 bg-black border border-gray-700 text-white rounded-lg outline-none focus:border-red-500" required />
          <input name="model" placeholder="Model" onChange={handleInput} value={car.model} className="w-full p-3 bg-black border border-gray-700 text-white rounded-lg outline-none focus:border-red-500" required />
          <div className="flex gap-4">
            <input name="year" placeholder="Year" onChange={handleInput} value={car.year} className="w-1/2 p-3 bg-black border border-gray-700 text-white rounded-lg outline-none focus:border-red-500" required />
            <input name="price" placeholder="Price" onChange={handleInput} value={car.price} className="w-1/2 p-3 bg-black border border-gray-700 text-white rounded-lg outline-none focus:border-red-500" required />
          </div>
          <input name="image" placeholder="Direct Image URL (.jpg/png)" onChange={handleInput} value={car.image} className="w-full p-3 bg-black border border-gray-700 text-white rounded-lg outline-none focus:border-red-500" required />
          <textarea name="description" placeholder="Description" onChange={handleInput} value={car.description} className="w-full p-3 bg-black border border-gray-700 text-white rounded-lg outline-none focus:border-red-500" rows="3" required></textarea>
          
          <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition">
            {status || "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
}
