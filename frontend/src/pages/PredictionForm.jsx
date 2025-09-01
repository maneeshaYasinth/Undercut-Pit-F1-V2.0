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
        setDrivers(data); // expected format: [{ code: "VAR", name: "Verstappen" }, ...]
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
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Submit Your Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Season */}
        <div>
          <label className="block font-medium">Season</label>
          <input
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Round */}
        <div>
          <label className="block font-medium">Round</label>
          <input
            type="text"
            value={round}
            onChange={(e) => setRound(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="e.g. 5"
          />
        </div>

        {/* Qualifying Winner */}
        <div>
          <label className="block font-medium">Qualifying Winner</label>
          <select
            value={qualifyingWinner}
            onChange={(e) => setQualifyingWinner(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select Driver --</option>
            {drivers.map((driver) => (
              <option key={driver.code} value={driver.code}>
                {driver.name} ({driver.code})
              </option>
            ))}
          </select>
        </div>

        {/* Race Top 3 */}
        <div>
          <label className="block font-medium">Race Top 3</label>
          {raceTopThree.map((driver, index) => (
            <select
              key={index}
              value={driver}
              onChange={(e) => handleTopThreeChange(index, e.target.value)}
              className="w-full border rounded p-2 mb-2"
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver.code} value={driver.code}>
                  {driver.name} ({driver.code})
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          Submit Prediction
        </button>
      </form>

      {message && <p className="mt-4 text-center font-medium">{message}</p>}
    </div>
  );
}
