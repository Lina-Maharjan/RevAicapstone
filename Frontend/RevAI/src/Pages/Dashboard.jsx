import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await apiFetch('/auth/me');
        setUserData(data.data);
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/login');
      }
    };

    verifyAuth();
  }, [navigate]);

  if (!userData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData.username}!</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <div className="space-y-4">
          <p><span className="font-medium">Email:</span> {userData.email}</p>
          <p><span className="font-medium">User ID:</span> {userData.user_id}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
