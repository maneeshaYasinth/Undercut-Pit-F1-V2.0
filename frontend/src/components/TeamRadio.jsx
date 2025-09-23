import { useEffect, useState } from "react";
import { getDrivers } from "../services/driverService";
import { getTeamRadioMessages } from "../services/teamRadioService";

export default function TeamRadio() {
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetch drivers on mount
  useEffect(() => {
    getDrivers()
      .then((data) => {
        console.log("Drivers:", data); // ✅ Debug
        setDrivers(data);
      })
      .catch((err) => console.error("Error fetching drivers:", err));
  }, []);

  // Fetch radio messages when driver changes
  useEffect(() => {
    if (driver) {
      getTeamRadioMessages(driver) // driver = driver_number
        .then((data) => {
          console.log("Messages for driver", driver, data); // ✅ Debug
          setMessages(data);
        })
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [driver]);

  // Find selected driver details
  const selectedDriver = drivers.find((d) => String(d.id) === String(driver));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0000] to-[#120000] text-white flex flex-col items-center py-8 pt-24">
      {/* Driver selection */}
      <div className="mb-6 w-full max-w-2xl">
        <label className="mr-3 font-semibold">Select Driver:</label>
        <select
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-red-400/30 
                     focus:border-red-500 focus:ring focus:ring-red-600/40 transition text-white"
        >
          <option value="" className="text-gray-600">
            -- Select Driver --
          </option>
          {drivers.map((d) => (
            <option
              key={d.id}
              value={d.id}
              className="bg-black text-white"
            >
              {d.fullName} ({d.code})
            </option>
          ))}
        </select>
      </div>

      {/* Cards Side by Side (Responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Driver Header */}
        {selectedDriver && (
          <div className="w-full bg-white/5 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg">
            <img
              src={selectedDriver.headshotUrl}
              alt={selectedDriver.fullName}
              className="w-24 h-24 rounded-full border-2 border-red-400 mb-4"
            />
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold">{selectedDriver.fullName}</h1>
              <p className="text-red-300">{selectedDriver.teamName}</p>
              <p className="text-sm text-gray-300">
                Driver #{selectedDriver.id} ({selectedDriver.code})
              </p>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="w-full bg-white/5 rounded-2xl p-6 flex flex-col items-center justify-start space-y-4 shadow-lg">
          {messages.length === 0 ? (
            <p className="text-gray-400">No messages available</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-red-400/20"
              >
                <p className="mb-2 font-semibold">
                  {msg.message ? "📻 Team Radio" : "📝 Text Message"}
                </p>
                {msg.message ? (
                  <audio controls className="w-full">
                    <source src={msg.message} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <p>{msg.transcript || "No transcript available"}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
