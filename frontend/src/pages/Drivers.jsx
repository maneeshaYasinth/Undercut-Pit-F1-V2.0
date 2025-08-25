import { useEffect, useState } from "react";
import { getDrivers } from "../services/driverService";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const data = await getDrivers();
        setDrivers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading drivers...</p>;

  return (
    <div className="p-6 pt-18 bg-gradient-to-b from-[#1a0000] to-[#120000] min-h-screen text-white">
      <h1 className="text-2xl font-bold text-center mb-6">F1 Drivers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="p-4 rounded-2xl shadow-md bg-white/20 backdrop-blur-lg">
            <img
              src={driver.headshotUrl || "/default-driver.png"} // use camelCase
              alt={driver.fullName} // use camelCase
              className="w-32 h-32 object-cover rounded-full mx-auto mb-3"
            />
            <h3 className="text-xl font-semibold text-center">{driver.id}</h3>
            <h2 className="text-xl font-semibold text-center">{driver.fullName}</h2>
            <p className="text-center text-white">{driver.teamName}</p>
            <p className="text-center text-white text-sm">Country: {driver.countryCode}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drivers;
