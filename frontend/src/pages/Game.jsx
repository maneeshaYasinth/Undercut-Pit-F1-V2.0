import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/bg-video.mp4";

export default function PredictionsPage() {
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
          F1 Prediction Game
        </h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-6">
          {/* Predictions Card */}
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-red-500/20 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Your Predictions</h2>
            <p className="text-white/80 mb-6">
              Submit or view your race predictions. Choose the top drivers
              and see how your guesses compare against others.
            </p>
            <button
              onClick={() => navigate("/predictions")}
              className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-red-800 hover:to-red-600 transition transform hover:scale-[1.02]"
            >
              Go to Predictions
            </button>
          </div>

          {/* Leaderboard Card */}
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-red-500/20 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Leaderboard</h2>
            <p className="text-white/80 mb-6 pb-6">
              Check out the leaderboard to see how you rank against other F1
              fans. Track your score throughout the season.
            </p>
            <button
              onClick={() => navigate("/leaderboard")}
              className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-red-800 hover:to-red-600 transition transform hover:scale-[1.02]"
            >
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
