import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import env from "../config";

function BuildingDetails() {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    axios
      .get(`${env.BASE_URL}/buildings/${id}`)
      .then((response) => {
        setBuilding(response.data.payload);
      })
      .catch((error) => {
        console.error("Error fetching building details:", error);
      });
  }, [id]);

  if (!building) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{building.buildingName}</h1>
      <p>Year Constructed: {building.yearConstructed}</p>
      <img src={building.image} alt={building.buildingName} />
    </div>
  );
}

export default BuildingDetails;
