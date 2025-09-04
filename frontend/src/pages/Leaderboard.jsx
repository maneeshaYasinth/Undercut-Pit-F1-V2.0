import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboardService";

export default function Leaderboard() {
  const [positions, setPositions] = useState([]);
  const [season, setSeason] = useState("2025"); // default season

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeaderboard(season);
        setPositions(data);
      } catch (error) {
        console.error("Failed to load driver standings:", error);
      }
    };
    fetchData();
  }, [season]);

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0000] to-[#120000] text-white flex flex-col items-center py-12">
      <h2 className="text-4xl font-extrabold mt-18 mb-8 tracking-wide text-red-600 drop-shadow-lg">
        Leaderboard
      </h2>

      {/* Season Selector with glass effect */}
      <div className="mb-6 w-48">
        <select
          value={season}
          onChange={handleSeasonChange}
          className="w-full p-2 rounded-lg text-white bg-white/10 backdrop-blur-md border border-red-600 hover:bg-white/20 transition duration-300"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      {/* leaderboard Table with lucid glass effect */}
      <div className="w-11/12 md:w-3/5 overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-red-600 shadow-lg">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-red-700/30 backdrop-blur-md">
              <th className="p-3">Position</th>
              <th className="p-3">Username</th>
              <th className="p-3">Points</th>
            </tr>
          </thead>
          <tbody>
            {positions.length > 0 ? (
              positions.map((user,index) => (
                <tr
                    key={user._id}
                    className="even:bg-white/5 hover:bg-red-600/20 transition-colors duration-300"
                  >
                    <td className="p-3">{index + 1}</td> 
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.totalPoints}</td>
                  </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-gray-400">
                  Loading leaderboard...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
