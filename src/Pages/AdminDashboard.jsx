import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [usersData, setUsersData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const carsSnapshot = await getDocs(collection(db, "cars"));
      const interestsSnapshot = await getDocs(collection(db, "interests"));

      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const cars = carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const interests = interestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const usersWithCars = users.map(u => ({
        ...u,
        interestedCars: interests
          .filter(i => i.userId === u.id)
          .map(i => cars.find(c => c.id === i.carId))
          .filter(Boolean)
      }));

      const carsWithUsers = cars.map(c => ({
        ...c,
        interestedUsers: interests
          .filter(i => i.carId === c.id)
          .map(i => users.find(u => u.id === i.userId))
          .filter(Boolean)
      }));

      setUsersData(usersWithCars);
      setCarsData(carsWithUsers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-red-500 mb-10 text-center">
        Admin Dashboard
      </h1>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Users with Interested Cars</h2>
        {usersData.map(user => (
          <div key={user.id} className="mb-4 p-4 bg-[#111] rounded">
            <p className="font-bold">{user.name} ({user.email})</p>
            <ul className="ml-4 mt-2 list-disc">
              {user.interestedCars.map(car => (
                <li key={car.id}>{car.brand} {car.model}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Cars with Interested Users</h2>
        {carsData.map(car => (
          <div key={car.id} className="mb-4 p-4 bg-[#111] rounded">
            <p className="font-bold">{car.brand} {car.model}</p>
            <ul className="ml-4 mt-2 list-disc">
              {car.interestedUsers.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
