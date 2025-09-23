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

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      {/* Driver selection */}
      <div className="mb-6">
        <label className="mr-3 font-semibold">Select Driver:</label>
        <select
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-red-400/30 focus:border-red-500 focus:ring focus:ring-red-600/40 transition text-white"
        >
          <option value="" className="text-gray-600">
            -- Select Driver --
          </option>
          {drivers.map((d) => (
            <option
              key={d.id}
              value={d.id} // 👈 use driver_number
              className="bg-black text-white"
            >
              {d. fullName} ({d.code})
            </option>
          ))}
        </select>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages available</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-red-400/20"
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
  );
}
