import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login"
import Drivers from "./pages/Drivers"
import DriverStandings from "./pages/driverStansding"
import ConstructorStandings from './pages/ConstructorStandins';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/driver-standings" element={<DriverStandings />} />
        <Route path="/constructor-standings" element={<ConstructorStandings />} />
      </Routes>
    </>
  );
}

export default App;
