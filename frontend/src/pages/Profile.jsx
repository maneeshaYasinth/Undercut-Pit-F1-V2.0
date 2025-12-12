import React, { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          User Profile
        </h2>

        <div className="space-y-3">
          <p>
            <span className="font-semibold text-gray-700">ID:</span>{" "}
            {profile._id}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {profile.username}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
