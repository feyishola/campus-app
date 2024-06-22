import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BuildingDetails from "./components/BuildingDetail";
import BuildingList from "./components/BuildingList";
import CreateBuilding from "./components/CreateBuilding";
import LocateBuilding from "./components/LocateBuilding";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<BuildingList />} />
          <Route path="/create-building" element={<CreateBuilding />} />
          <Route path="/building/:id" element={<BuildingDetails />} />
          <Route path="/locate-building/:id" element={<LocateBuilding />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// // App.js
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import MapComponent from "./components/LocateBuilding";
// import BuildingList from "./components/BuildingList";
// import BuildingDetail from "./components/BuildingDetail";
// import CreateBuilding from "./components/CreateBuilding";

// const App = () => {
//   const [selectedBuilding, setSelectedBuilding] = useState(null);

//   return (
//     <Router>
//       <div className="App">
//         <nav>
//           <Link to="/">Home</Link>
//           <Link to="/buildings">Buildings</Link>
//           <Link to="/create">Create Building</Link>
//         </nav>
//         <Switch>
//           <Route path="/" exact>
//             <MapComponent onSelect={setSelectedBuilding} />
//           </Route>
//           <Route path="/buildings">
//             <BuildingList onSelect={setSelectedBuilding} />
//             <BuildingDetail building={selectedBuilding} />
//           </Route>
//           <Route path="/create">
//             <CreateBuilding />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;
