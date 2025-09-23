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
import TeamRadio from './components/TeamRadio';
import Session from './pages/Session';
import AuthButton from './components/AuthButton'
import SubmitResult from './pages/SubmitResult';

function App() {
  return (
    <>
      <Navbar />
      <AuthButton />
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
        <Route path="/14ssmm" element={<SubmitResult />} />
        <Route path="/teamradio" element={<TeamRadio />} />
      </Routes>
    </>
  );
}

export default App;
