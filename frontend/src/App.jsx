import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./pages/Login";
import Drivers from "./pages/Drivers";
import DriverStandings from "./pages/driverStansding";
import ConstructorStandings from "./pages/ConstructorStandins";
import RaceResults from "./pages/RaceResults";
import QuliResult from "./pages/QuliResult";
import Register from "./pages/Register";
import PredictionForm from "./pages/PredictionForm";
import Leaderboard from "./pages/Leaderboard";
import News from "./components/News";
import PageLoader from "./components/PageLoader";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400); // loader shows for 1.2s when navigating

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <PageLoader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/driver-standings" element={<DriverStandings />} />
        <Route path="/constructor-standings" element={<ConstructorStandings />} />
        <Route path="/raceresults" element={<RaceResults />} />
        <Route path="/quliresults" element={<QuliResult />} />
        <Route path="/predictions" element={<PredictionForm />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}

export default App;
