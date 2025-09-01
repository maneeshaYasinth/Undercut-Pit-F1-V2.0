import { useState, useEffect } from "react";
import { submitPrediction } from "../services/predictionService";
import { getDrivers } from "../services/driverService";

export default function PredictionForm() {
  const [season, setSeason] = useState("2025");
  const [round, setRound] = useState("");
  const [qualifyingWinner, setQualifyingWinner] = useState("");
  const [raceTopThree, setRaceTopThree] = useState(["", "", ""]);
  const [drivers, setDrivers] = useState([]);
  const [message, setMessage] = useState(null);

  // Load drivers on mount
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const data = await getDrivers();
        setDrivers(data);
      } catch (err) {
        console.error("Failed to fetch drivers:", err);
      }
    };
    fetchDrivers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await submitPrediction(season, round, qualifyingWinner, raceTopThree);
      setMessage(`✅ Prediction submitted! ID: ${data._id}`);
    } catch (err) {
      setMessage(err.message || "❌ Failed to submit prediction");
    }
  };

  const handleTopThreeChange = (index, value) => {
    const updated = [...raceTopThree];
    updated[index] = value;
    setRaceTopThree(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0000] to-[#120000] text-white flex flex-col items-center py-10 pt-24">
      <h2 className="text-4xl font-extrabold mb-8 tracking-wide text-red-500 drop-shadow-lg text-center">
        Submit Your Prediction
      </h2>
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-red-500/20 shadow-xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Season */}
          <div>
            <label className="block font-semibold mb-1 text-red-300">Season</label>
            <input
              type="text"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-red-400/30 focus:border-red-500 focus:ring focus:ring-red-600/40 transition text-white placeholder-gray-400"
            />
          </div>

          {/* Round */}
          <div>
            <label className="block font-semibold mb-1 text-red-300">Round</label>
            <input
              type="text"
              value={round}
              onChange={(e) => setRound(e.target.value)}
              placeholder="e.g. 5"
              className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-red-400/30 focus:border-red-500 focus:ring focus:ring-red-600/40 transition text-white placeholder-gray-400"
            />
          </div>

          {/* Qualifying Winner */}
          <div>
            <label className="block font-semibold mb-1 text-red-300">Qualifying Winner</label>
            <select
              value={qualifyingWinner}
              onChange={(e) => setQualifyingWinner(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-red-400/30 focus:border-red-500 focus:ring focus:ring-red-600/40 transition text-white"
            >
              <option value="" className="text-gray-600">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver.code} value={driver.code} className="bg-black text-white">
                  {driver.fullName} ({driver.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Race Top 3 - Horizontal on big screens */}
        <div>
          <label className="block font-semibold mb-2 text-red-300">Race Top 3</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {raceTopThree.map((driver, index) => (
              <select
                key={index}
                value={driver}
                onChange={(e) => handleTopThreeChange(index, e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-red-400/30 focus:border-red-500 focus:ring focus:ring-red-600/40 transition text-white"
              >
                <option value="" className="text-gray-600">-- Select Driver --</option>
                {drivers.map((driver) => (
                  <option key={driver.code} value={driver.code} className="bg-black text-white">
                    {driver.fullName} ({driver.code})
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 lg:w-1/3 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-red-800 hover:to-red-600 transition transform hover:scale-[1.02]"
          >
            Submit Prediction
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-6 text-center font-medium text-red-300 drop-shadow-lg">{message}</p>
      )}
    </div>
  );
}
