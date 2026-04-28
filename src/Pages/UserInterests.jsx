import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function UserInterests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchInterests();
    }
  }, [user]);

  const fetchInterests = async () => {
    const q = query(
      collection(db, "interests"),
      where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setInterests(data);
  };

  const removeInterest = async (id) => {
    await deleteDoc(doc(db, "interests", id));
    setInterests((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4 lg:px-20">
      <h2 className="text-4xl text-white text-center mb-10">
        My <span className="text-red-500">Interests</span>
      </h2>

      {interests.length === 0 ? (
        <p className="text-gray-400 text-center">
          No interests found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interests.map((car) => (
            <div key={car.id} className="bg-[#111] p-5 rounded-lg">
              <h3 className="text-white text-xl">{car.brand} {car.model}</h3>
              <button
                onClick={() => removeInterest(car.id)}
                className="mt-4 bg-red-600 px-4 py-2 rounded text-white"
              >
                Remove Interest
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
