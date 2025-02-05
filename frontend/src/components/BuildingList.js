import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuildings } from "../slices/buildingslice";
import SearchComponent from "./search";

function BuildingList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { buildings, filteredBuildings, status, error } = useSelector(
    (state) => state.buildings
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBuildings());
    }
  }, [dispatch, status]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  // Get paginated buildings
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBuildings = filteredBuildings?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredBuildings?.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (status === "loading") {
    return (
      <div className="text-white text-center mt-10 text-xl">Loading...</div>
    );
  }
  if (status === "failed") {
    return (
      <div className="text-red-500 text-center mt-10 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen p-5 flex flex-col items-center bg-cover bg-center"
      style={{ backgroundImage: "url('NDA-192.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center text-white">
          <h1 className="text-4xl font-bold">Buildings</h1>
          <SearchComponent />
        </div>

        {/* Buttons */}
        <div className="flex justify-between w-full max-w-5xl mt-4">
          <button
            onClick={() => navigate("/createbuilding")}
            className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-lg shadow"
          >
            Add Building
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-lg shadow"
          >
            Logout
          </button>
        </div>

        <div className="px-3 py-4 flex justify-center">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-md bg-white bg-opacity-80 shadow-xl backdrop-blur-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Year Constructed</th>
                  <th className="text-left p-4">Image</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBuildings?.map((building) => (
                  <tr
                    key={building._id}
                    className="border-b border-gray-300 hover:bg-blue-100 transition"
                  >
                    <td className="p-4 font-semibold">
                      {building.buildingName}
                    </td>
                    <td className="p-4">{building.yearConstructed}</td>
                    <td className="p-4">
                      <img
                        src={building.image}
                        alt={building.buildingName}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-300 shadow-md"
                      />
                    </td>
                    <td className="p-4 flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-3">
                      <Link
                        to={`/building/${building._id}`}
                        className="text-sm bg-blue-600 hover:bg-blue-800 text-white py-2 px-3 rounded-lg shadow"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/locate-building/${building._id}`}
                        className="text-sm bg-red-600 hover:bg-red-800 text-white py-2 px-3 rounded-lg shadow"
                      >
                        Locate
                      </Link>
                    </td>
                  </tr>
                ))}
                {currentBuildings?.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-700">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-500 text-white rounded-lg shadow ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-700"
            }`}
          >
            Previous
          </button>
          <span className="text-white text-lg">
            Page {currentPage} of{" "}
            {Math.ceil(filteredBuildings?.length / itemsPerPage)}
          </span>
          <button
            onClick={nextPage}
            disabled={
              currentPage >= Math.ceil(filteredBuildings?.length / itemsPerPage)
            }
            className={`px-4 py-2 bg-gray-500 text-white rounded-lg shadow ${
              currentPage >= Math.ceil(filteredBuildings?.length / itemsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuildingList;
