import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/bg-video.mp4";

export default function Session() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="min-h-screen bg-gradient-to-b from-[#1a0000]/80 to-[#120000]/80 text-white flex flex-col items-center py-10 pt-24">
        <h1 className="text-4xl font-extrabold mb-10 tracking-wide text-red-500 drop-shadow-lg text-center">
          See the  F1 results
        </h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-6">
          {/* Qualifying Card */}
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-red-500/20 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Qualifying Results</h2>
            <p className="text-white/80 mb-6">
              Catch the latest qualifying sessions to see who takes pole and how the grid lines up for race day. 
              You can also dive into past qualifying battles to compare pace and rivalries across seasons.
            </p>
            <button
              onClick={() => navigate("/quliresults")}
              className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-red-800 hover:to-red-600 transition transform hover:scale-[1.02]"
            >
              Go to Qualifying Results
            </button> 
          </div>

          {/* Race Card */}
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-red-500/20 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Race Results</h2>
            <p className="text-white/80 mb-6">
              See the full race outcomes, from dramatic podium finishes to intense midfield fights. 
              You can also explore past races to relive iconic moments, strategy calls, and title-defining victories.
            </p>
            <button
              onClick={() => navigate("/raceresults")}
              className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-red-800 hover:to-red-600 transition transform hover:scale-[1.02]"
            >
               Go to View Race Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
