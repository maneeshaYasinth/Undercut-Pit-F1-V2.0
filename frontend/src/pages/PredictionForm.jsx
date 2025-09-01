import { useState } from "react";
import { submitPrediction } from "../services/predictionService";

export default function PredictionForm() {
  const [season, setSeason] = useState("2025");
  const [round, setRound] = useState("");
  const [qualifyingWinner, setQualifyingWinner] = useState("");
  const [raceTopThree, setRaceTopThree] = useState(["", "", ""]);
  const [message, setMessage] = useState(null);

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
        <div>
          <label className="block font-medium">Season</label>
          <input
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

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

        <div>
          <label className="block font-medium">Qualifying Winner</label>
          <input
            type="text"
            value={qualifyingWinner}
            onChange={(e) => setQualifyingWinner(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="e.g. Verstappen"
          />
        </div>

        <div>
          <label className="block font-medium">Race Top 3</label>
          {raceTopThree.map((driver, index) => (
            <input
              key={index}
              type="text"
              value={driver}
              onChange={(e) => handleTopThreeChange(index, e.target.value)}
              className="w-full border rounded p-2 mb-2"
              placeholder={`Position ${index + 1}`}
            />
          ))}
        </div>

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
