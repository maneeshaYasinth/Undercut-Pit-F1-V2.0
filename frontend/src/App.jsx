import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login"
import Drivers from "./pages/Drivers"
import Championship from "./pages/Championship"
import RaceResults from "./pages/RaceResults"
import QuliResult from "./pages/QuliResult"
import Register from "./pages/Register"
import PredictionForm from "./pages/PredictionForm"
import Leaderboard from "./pages/Leaderboard";
import News from './components/News';
import Game from './pages/Game';
import Session from './pages/Session';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/Championship" element={<Championship />} />
        <Route path="/raceresults" element={<RaceResults />} />
        <Route path="/quliresults" element={<QuliResult />} />
        <Route path="/predictions" element={<PredictionForm />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/game" element={<Game />} />
        <Route path="/news" element={<News />} />
        <Route path="/sessions" element={<Session />} />
      </Routes>
    </>
  );
}

export default App;
