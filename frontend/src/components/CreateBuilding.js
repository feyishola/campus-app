import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import env from "../config";

const CreateBuilding = () => {
  const navigate = useNavigate();
  const [buildingName, setBuildingName] = useState("");
  const [yearConstructed, setYearConstructed] = useState("");
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("buildingName", buildingName);
      formData.append("yearConstructed", parseInt(yearConstructed));
      formData.append("image", image);
      formData.append("description", description);

      const location = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      };

      formData.append("location", JSON.stringify(location));
      formData.append("spaces", JSON.stringify(spaces));

      await axios.post(`${env.BASE_URL}/buildings`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Building created successfully!");
      setTimeout(() => navigate("/buildinglist"), 1000);
    } catch (error) {
      setMessage("Error creating building. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center mt-10 text-xl">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4B5320] p-6">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
        >
          ⬅ Back
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create New Building
        </h2>

        {message && <p className="text-center text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Building Name:</label>
            <input
              type="text"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Year Constructed:</label>
            <input
              type="number"
              value={yearConstructed}
              onChange={(e) => setYearConstructed(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Latitude:</label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Longitude:</label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="input-field"
            ></textarea>
          </div>

          {/* Spaces Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Spaces (Offices / Classrooms)
            </h3>
            {spaces.map((space, index) => (
              <div key={index} className="flex space-x-2 items-center mb-2">
                <input
                  type="text"
                  placeholder="Space Name"
                  value={space.name}
                  onChange={(e) => {
                    const updatedSpaces = [...spaces];
                    updatedSpaces[index].name = e.target.value;
                    setSpaces(updatedSpaces);
                  }}
                  className="input-field w-1/3"
                  required
                />
                <select
                  value={space.type}
                  onChange={(e) => {
                    const updatedSpaces = [...spaces];
                    updatedSpaces[index].type = e.target.value;
                    setSpaces(updatedSpaces);
                  }}
                  className="input-field w-1/3"
                >
                  <option value="Office">Office</option>
                  <option value="Classroom">Classroom</option>
                </select>
                <input
                  type="number"
                  placeholder="Capacity"
                  value={space.capacity}
                  onChange={(e) => {
                    const updatedSpaces = [...spaces];
                    updatedSpaces[index].capacity = e.target.value;
                    setSpaces(updatedSpaces);
                  }}
                  className="input-field w-1/3"
                />
                <button
                  type="button"
                  onClick={() =>
                    setSpaces(spaces.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setSpaces([
                  ...spaces,
                  { name: "", type: "Office", capacity: "" },
                ])
              }
              className="text-blue-500 hover:underline"
            >
              + Add Space
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Building
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBuilding;
