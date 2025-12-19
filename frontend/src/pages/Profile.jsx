import React, { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";
import bgVideo from "../assets/bg-video.mp4";

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
<div className="flex justify-center items-center min-h-screen p-6 relative">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
    aria-hidden="true"
    role="presentation"
  >
    <source src={bgVideo} type="video/mp4" />
  </video>

  <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 px-14 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 z-10 w-full max-w-md">
    <h2 className="text-5xl font-bold text-white text-center mb-6">
      User Profile
    </h2>
    <div className="space-y-3">
      {/* <p><span className="font-semibold text-white">ID:</span> {profile._id}</p> */}
      <p><span className="font-semibold text-white text-2xl">Name:{profile.username}</span> </p>
      <p><span className="font-semibold text-white text-2xl">Email: {profile.email}</span> </p>
    </div>
  </div>
</div>

  );
};

export default Profile;
