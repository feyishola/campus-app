// CreateBuilding.js
import React, { useState } from "react";
import axios from "axios";
import env from "../config";

const CreateBuilding = () => {
  const [buildingName, setBuildingName] = useState("");
  const [yearConstructed, setYearConstructed] = useState("");
  const [image, setImage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBuilding = {
      buildingName,
      yearConstructed: parseInt(yearConstructed),
      image,
      location: [parseFloat(longitude), parseFloat(latitude)],
    };

    try {
      const response = await axios.post(
        `${env.BASE_URL}/buildings`,
        newBuilding
      );
      console.log(response.data.payload);
      setMessage("Building created successfully!");

      // Reset form fields
      setBuildingName("");
      setYearConstructed("");
      setImage("");
      setLatitude("");
      setLongitude("");
    } catch (error) {
      console.error("There was an error creating the building!", error);
      setMessage("Error creating building. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create New Building</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Building Name:</label>
          <input
            type="text"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year Constructed:</label>
          <input
            type="number"
            value={yearConstructed}
            onChange={(e) => setYearConstructed(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Building</button>
      </form>
    </div>
  );
};

export default CreateBuilding;
