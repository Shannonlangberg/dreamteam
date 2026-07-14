import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Identify from "./pages/Identify";
import Reserved from "./pages/Reserved";
import FamilyClaimed from "./pages/FamilyClaimed";
import RegisterOnSpot from "./pages/RegisterOnSpot";
import ClaimAtEnd from "./pages/ClaimAtEnd";
import Volunteer from "./pages/Volunteer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/identify" element={<Identify />} />
      <Route path="/reserved" element={<Reserved />} />
      <Route path="/family-claimed" element={<FamilyClaimed />} />
      <Route path="/register" element={<RegisterOnSpot />} />
      <Route path="/claim-at-end" element={<ClaimAtEnd />} />
      <Route path="/volunteer" element={<Volunteer />} />
    </Routes>
  );
}
