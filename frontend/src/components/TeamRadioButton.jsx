import { Play } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

export default function TeamRadioNavigate() {

  const navigate = useNavigate();

  const handlenavigate = () =>{
    navigate("/teamradio");
  }


  return (
    <>
      <button
        onClick={handlenavigate}
        className="fixed top-4 left-8 z-80 mt-18 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
      >
        <Play />
      </button>
</>
    );
  }