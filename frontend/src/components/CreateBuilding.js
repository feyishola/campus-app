// import React, { useState } from "react";
// import axios from "axios";
// import env from "../config";

// const CreateBuilding = () => {
//   const [buildingName, setBuildingName] = useState("");
//   const [yearConstructed, setYearConstructed] = useState("");
//   const [image, setImage] = useState(null);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [description, setDescription] = useState("");
//   const [spaces, setSpaces] = useState([]);
//   const [message, setMessage] = useState(null);

//   const addSpace = () => {
//     setSpaces([...spaces, { name: "", type: "Office", capacity: "" }]);
//   };

//   const updateSpace = (index, key, value) => {
//     const updatedSpaces = [...spaces];
//     updatedSpaces[index][key] = value;
//     setSpaces(updatedSpaces);
//   };

//   const removeSpace = (index) => {
//     setSpaces(spaces.filter((_, i) => i !== index));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const formData = new FormData();

//   //   formData.append("buildingName", buildingName);
//   //   formData.append("yearConstructed", parseInt(yearConstructed));
//   //   formData.append("image", image);
//   //   formData.append("description", description);
//   //   formData.append("latitude", parseFloat(latitude));
//   //   formData.append("longitude", parseFloat(longitude));
//   //   formData.append(
//   //     "spaces",
//   //     JSON.stringify(
//   //       spaces.map((space) => ({
//   //         name: space.name,
//   //         type: space.type,
//   //         capacity: space.capacity ? parseInt(space.capacity) : undefined,
//   //       }))
//   //     )
//   //   );

//   //   try {
//   //     const response = await axios.post(`${env.BASE_URL}/buildings`, formData, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     });

//   //     console.log(response.data.payload);
//   //     setMessage("Building created successfully!");

//   //     // Reset form
//   //     setBuildingName("");
//   //     setYearConstructed("");
//   //     setImage(null);
//   //     setLatitude("");
//   //     setLongitude("");
//   //     setDescription("");
//   //     setSpaces([]);
//   //   } catch (error) {
//   //     console.error("Error creating the building!", error);
//   //     setMessage("Error creating building. Please try again.");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("buildingName", buildingName);
//     formData.append("yearConstructed", parseInt(yearConstructed));
//     formData.append("image", image); // Ensure it's a file
//     formData.append("description", description);

//     // Ensure coordinates are in the correct [longitude, latitude] format
//     const longitudeNum = parseFloat(longitude);
//     const latitudeNum = parseFloat(latitude);

//     if (isNaN(longitudeNum) || isNaN(latitudeNum)) {
//       setMessage("Invalid longitude or latitude format.");
//       return;
//     }

//     const location = {
//       type: "Point",
//       coordinates: [longitudeNum, latitudeNum],
//     };

//     formData.append("location", JSON.stringify(location));

//     // Convert spaces to a JSON string
//     formData.append(
//       "spaces",
//       JSON.stringify(
//         spaces.map((space) => ({
//           name: space.name,
//           type: space.type,
//           capacity: space.capacity ? parseInt(space.capacity) : undefined,
//         }))
//       )
//     );

//     try {
//       const response = await axios.post(`${env.BASE_URL}/buildings`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log(response.data.payload);
//       setMessage("Building created successfully!");

//       // Reset form
//       setBuildingName("");
//       setYearConstructed("");
//       setImage(null);
//       setLatitude("");
//       setLongitude("");
//       setDescription("");
//       setSpaces([]);
//     } catch (error) {
//       console.error("Error creating the building!", error);
//       setMessage("Error creating building. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold text-center mb-4">
//         Create New Building
//       </h2>
//       {message && <p className="text-center text-red-500">{message}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex flex-col">
//           <label className="font-semibold">Building Name:</label>
//           <input
//             type="text"
//             value={buildingName}
//             onChange={(e) => setBuildingName(e.target.value)}
//             required
//             className="input-field"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-semibold">Year Constructed:</label>
//           <input
//             type="number"
//             value={yearConstructed}
//             onChange={(e) => setYearConstructed(e.target.value)}
//             required
//             className="input-field"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-semibold">Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             required
//             className="input-field"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-semibold">Latitude:</label>
//           <input
//             type="number"
//             step="any"
//             value={latitude}
//             onChange={(e) => setLatitude(e.target.value)}
//             required
//             className="input-field"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-semibold">Longitude:</label>
//           <input
//             type="number"
//             step="any"
//             value={longitude}
//             onChange={(e) => setLongitude(e.target.value)}
//             required
//             className="input-field"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-semibold">Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             className="input-field"
//           ></textarea>
//         </div>

//         {/* Spaces Section */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">
//             Spaces (Offices / Classrooms)
//           </h3>
//           {spaces.map((space, index) => (
//             <div key={index} className="flex space-x-2 items-center mb-2">
//               <input
//                 type="text"
//                 placeholder="Space Name"
//                 value={space.name}
//                 onChange={(e) => updateSpace(index, "name", e.target.value)}
//                 className="input-field w-1/3"
//                 required
//               />
//               <select
//                 value={space.type}
//                 onChange={(e) => updateSpace(index, "type", e.target.value)}
//                 className="input-field w-1/3"
//               >
//                 <option value="Office">Office</option>
//                 <option value="Classroom">Classroom</option>
//               </select>
//               <input
//                 type="number"
//                 placeholder="Capacity"
//                 value={space.capacity}
//                 onChange={(e) => updateSpace(index, "capacity", e.target.value)}
//                 className="input-field w-1/3"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeSpace(index)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 &times;
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addSpace}
//             className="text-blue-500 hover:underline"
//           >
//             + Add Space
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//         >
//           Create Building
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateBuilding;

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

  const addSpace = () => {
    setSpaces([...spaces, { name: "", type: "Office", capacity: "" }]);
  };

  const updateSpace = (index, key, value) => {
    const updatedSpaces = [...spaces];
    updatedSpaces[index][key] = value;
    setSpaces(updatedSpaces);
  };

  const removeSpace = (index) => {
    setSpaces(spaces.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("buildingName", buildingName);
    formData.append("yearConstructed", parseInt(yearConstructed));
    formData.append("image", image);
    formData.append("description", description);

    const longitudeNum = parseFloat(longitude);
    const latitudeNum = parseFloat(latitude);

    if (isNaN(longitudeNum) || isNaN(latitudeNum)) {
      setMessage("Invalid longitude or latitude format.");
      return;
    }

    const location = {
      type: "Point",
      coordinates: [longitudeNum, latitudeNum],
    };

    formData.append("location", JSON.stringify(location));
    formData.append("spaces", JSON.stringify(spaces));

    try {
      setLoading(true);
      await axios.post(`${env.BASE_URL}/buildings`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setMessage("Building created successfully!");
      setTimeout(() => navigate("/buildinglist"), 1000);
    } catch (error) {
      setLoading(false);
      setMessage("Error creating building. Please try again.");
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
                  onChange={(e) => updateSpace(index, "name", e.target.value)}
                  className="input-field w-1/3"
                  required
                />
                <select
                  value={space.type}
                  onChange={(e) => updateSpace(index, "type", e.target.value)}
                  className="input-field w-1/3"
                >
                  <option value="Office">Office</option>
                  <option value="Classroom">Classroom</option>
                </select>
                <input
                  type="number"
                  placeholder="Capacity"
                  value={space.capacity}
                  onChange={(e) =>
                    updateSpace(index, "capacity", e.target.value)
                  }
                  className="input-field w-1/3"
                />
                <button
                  type="button"
                  onClick={() => removeSpace(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpace}
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
