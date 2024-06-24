import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import env from "../config";

function BuildingList() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    axios
      .get(`${env.BASE_URL}/buildings`)
      .then((response) => {
        console.log(response.data);
        setBuildings(response.data.payload);
      })
      .catch((error) => {
        console.error("Error fetching buildings:", error);
      });
  }, []);
  if (!buildings) {
    return <div>Loading...</div>;
  }
  return (
    <div className="text-gray-900 bg-gray-200 p-5 min-h-screen">
      <div className="p-4 flex justify-center">
        <h1 className="text-3xl">Buildings</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Name</th>
                <th className="text-left p-3 px-5">Year Constructed</th>
                <th className="text-left p-3 px-5">Image</th>
                {/* <th className="text-left p-3 px-5">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {buildings.map((building) => (
                <tr
                  key={building._id}
                  className="border-b hover:bg-gray-200 bg-gray-100"
                >
                  <td className="p-3 px-5">{building.buildingName}</td>
                  <td className="p-3 px-5">{building.yearConstructed}</td>
                  <td className="p-3 px-5">
                    <img
                      src={building.image}
                      alt={building.buildingName}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="p-3 px-5 flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
                    <button
                      type="button"
                      className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      <Link to={`/building/${building._id}`}>Details</Link>
                    </button>
                    <button
                      type="button"
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      <Link to={`/locate-building/${building._id}`}>
                        Locate
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BuildingList;
