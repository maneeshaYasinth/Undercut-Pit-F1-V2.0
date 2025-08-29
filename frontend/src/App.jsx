import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login"
import Drivers from "./pages/Drivers"
import DriverStandings from "./pages/driverStansding"
import ConstructorStandings from './pages/ConstructorStandins';
import RaceResults from "./pages/RaceResults"
import QuliResult from "./pages/QuliResult"
import Register from "./pages/Register"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/driver-standings" element={<DriverStandings />} />
        <Route path="/constructor-standings" element={<ConstructorStandings />} />
        <Route path="/raceresults" element={<RaceResults />} />
        <Route path="/quliresults" element={<QuliResult />} />
      </Routes>
    </>
  );
}

export default App;
