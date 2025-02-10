import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BuildingDetails from "./components/BuildingDetail";
import BuildingList from "./components/BuildingList";
import CreateBuilding from "./components/CreateBuilding";
import LocateBuilding from "./components/LocateBuilding";
import AuthPage from "./auth/authpage";
import LandingPage from "./components/landingpage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route exact path="/buildinglist" element={<BuildingList />} />
          <Route path="/createbuilding" element={<CreateBuilding />} />
          <Route path="/building/:id" element={<BuildingDetails />} />
          <Route path="/locate-building/:id" element={<LocateBuilding />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
