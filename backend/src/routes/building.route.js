const { Router } = require("express");
const CampusBuilding = require("../controller/building.controller");
const uploadImageMiddleware = require("../middleware/uploadimage.middleware");
const handleImageUpload = require("../middleware/handleimageupload.middleware");

module.exports = () => {
  const api = Router();

  // Create a new building
  // api.post(
  //   "/buildings",
  //   [uploadImageMiddleware, handleImageUpload],
  //   async (req, res) => {
  //     try {
  //       const {
  //         buildingName,
  //         yearConstructed,
  //         image,
  //         location,
  //         spaces,
  //         description,
  //       } = req.body;

  //       const result = await CampusBuilding.createBuilding(
  //         buildingName,
  //         yearConstructed,
  //         image,
  //         location,
  //         spaces,
  //         description
  //       );
  //       res.status(201).json({ response: true, payload: result });
  //     } catch (error) {
  //       res.status(400).json({ response: false, payload: error.message });
  //     }
  //   }
  // );

  // Create a new building
  api.post(
    "/buildings",
    [uploadImageMiddleware, handleImageUpload],
    async (req, res) => {
      try {
        const {
          buildingName,
          yearConstructed,
          image,
          location, // Will be received as a string
          spaces, // Will also be a string from FormData
          description,
        } = req.body;

        // Ensure location is correctly parsed
        let parsedLocation;
        try {
          parsedLocation = JSON.parse(location);
          if (
            !parsedLocation ||
            !parsedLocation.type ||
            !parsedLocation.coordinates
          ) {
            throw new Error("Invalid location format");
          }
        } catch (err) {
          return res.status(400).json({
            response: false,
            payload:
              "Invalid location format. Expected { type: 'Point', coordinates: [lng, lat] }",
          });
        }

        // Ensure spaces are correctly parsed (if they exist)
        let parsedSpaces = [];
        if (spaces) {
          try {
            parsedSpaces = JSON.parse(spaces);
            if (!Array.isArray(parsedSpaces)) {
              throw new Error("Spaces must be an array");
            }
          } catch (err) {
            return res.status(400).json({
              response: false,
              payload: "Invalid spaces format. Expected an array",
            });
          }
        }

        // Create the building
        const result = await CampusBuilding.createBuilding(
          buildingName,
          yearConstructed,
          image,
          parsedLocation, // Pass the parsed object
          parsedSpaces, // Pass the parsed array
          description
        );

        res.status(201).json({ response: true, payload: result });
      } catch (error) {
        res.status(400).json({ response: false, payload: error.message });
      }
    }
  );

  // Get a single building by ID
  api.get("/buildings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await CampusBuilding.getBuilding(id);
      res.status(200).json({ response: true, payload: result });
    } catch (error) {
      res.status(400).json({ response: false, payload: error.message });
    }
  });

  // Get a building by name
  api.get("/buildings/name/:buildingName", async (req, res) => {
    try {
      const { buildingName } = req.params;
      const result = await CampusBuilding.getBuildingByName(buildingName);
      res.status(200).json({ response: true, payload: result });
    } catch (error) {
      res.status(400).json({ response: false, payload: error.message });
    }
  });

  // Get all buildings
  api.get("/buildings", async (req, res) => {
    try {
      const result = await CampusBuilding.getAllBuildings();
      res.status(200).json({ response: true, payload: result });
    } catch (error) {
      res.status(400).json({ response: false, payload: error.message });
    }
  });

  // Update a building by ID
  api.put("/buildings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await CampusBuilding.updateBuilding(id, updateData);
      res.status(200).json({ response: true, payload: result });
    } catch (error) {
      res.status(400).json({ response: false, payload: error.message });
    }
  });

  // Delete a building by ID
  api.delete("/buildings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await CampusBuilding.deleteBuilding(id);
      res.status(200).json({ response: true, payload: result });
    } catch (error) {
      res.status(400).json({ response: false, payload: error.message });
    }
  });

  return api;
};
