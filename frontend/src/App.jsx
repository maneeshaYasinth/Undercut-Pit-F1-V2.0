import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login"
import Drivers from "./pages/Drivers"
import DriverStandings from "./pages/driverStansding"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/driver-standings" element={<DriverStandings />} />
      </Routes>
    </>
  );
}

export default App;
