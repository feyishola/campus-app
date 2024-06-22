const { Router } = require("express");
const CampusBuilding = require("../controller/building.controller");

module.exports = () => {
  const api = Router();

  // Create a new building
  api.post("/buildings", async (req, res) => {
    try {
      const { buildingName, yearConstructed, image, location } = req.body;
      const result = await CampusBuilding.createBuilding(
        buildingName,
        yearConstructed,
        image,
        location
      );
      res.status(201).json({ response: true, payload: result });
    } catch (error) {
      res.status(400).json({ response: false, payload: error.message });
    }
  });

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
