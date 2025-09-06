import { useEffect, useState } from "react";
import { getConstructorStandings } from "../services/constructorStandingsService";

export default function ConstructorStandings() {
  const [standings, setStandings] = useState([]);
  const [season, setSeason] = useState("2025"); // default season

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getConstructorStandings(season);
        setStandings(data.constructorStandings || []);
      } catch (error) {
        console.error("Failed to load constructor standings:", error);
      }
    };
    fetchData();
  }, [season]);

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0000] to-[#120000] text-white flex flex-col items-center py-8">
      <h2 className="text-4xl font-extrabold mt-18 mb-8 tracking-wide text-red-600 drop-shadow-lg">
        Constructor Championship Standings
      </h2>

      {/* Season Selector with glass effect */}
      <div className="mb-6 w-48">
        <select
          value={season}
          onChange={handleSeasonChange}
          className="w-full p-2 rounded-lg text-white bg-red-800 backdrop-blur-md border border-red-600 hover:bg-white/20 transition duration-300"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
        </select>
      </div>

      {/* Constructor Standings Table with lucid glass effect */}
      <div className="w-11/12 md:w-3/5 overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-red-600 shadow-lg">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-red-700/30 backdrop-blur-md">
              <th className="p-3">Position</th>
              <th className="p-3">Constructor</th>
              <th className="p-3">Points</th>
              <th className="p-3">Wins</th>
            </tr>
          </thead>
          <tbody>
            {standings.length > 0 ? (
              standings.map((team) => (
                <tr
                  key={team.constructorId}
                  className="even:bg-white/5 hover:bg-red-600/20 transition-colors duration-300"
                >
                  <td className="p-3">{team.position}</td>
                  <td className="p-3">{team.constructorName}</td>
                  <td className="p-3">{team.points}</td>
                  <td className="p-3">{team.wins}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-gray-400">
                  Loading constructor standings...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
