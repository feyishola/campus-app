const BuildingModel = require("../model/buildings.model");

class CampusBuilding {
  async createBuilding(
    buildingName,
    yearConstructed,
    image,
    lngLat,
    spaces,
    description
  ) {
    try {
      let location;

      if (
        lngLat &&
        lngLat.type === "Point" &&
        Array.isArray(lngLat.coordinates) &&
        lngLat.coordinates.length === 2
      ) {
        // Already a valid GeoJSON format, use it directly
        location = lngLat;
      } else if (Array.isArray(lngLat) && lngLat.length === 2) {
        location = {
          type: "Point",
          coordinates: lngLat,
        };
      } else if (
        typeof lngLat === "object" &&
        lngLat.lng !== undefined &&
        lngLat.lat !== undefined
      ) {
        location = {
          type: "Point",
          coordinates: [lngLat.lng, lngLat.lat],
        };
      } else {
        throw new Error(
          "Invalid lngLat format. Expected GeoJSON { type: 'Point', coordinates: [lng, lat] }, array [lng, lat], or object {lng, lat}"
        );
      }

      const newBuilding = new BuildingModel({
        buildingName,
        yearConstructed,
        image,
        location,
        spaces,
        description,
      });
      const result = await newBuilding.save();
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async getBuilding(id) {
    try {
      const result = await BuildingModel.findById(id);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async getBuildingByName(buildingName) {
    try {
      const result = await BuildingModel.findOne({ buildingName });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async getAllBuildings() {
    try {
      const result = await BuildingModel.find();
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async updateBuilding(id, updateData) {
    try {
      const result = await BuildingModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async deleteBuilding(id) {
    try {
      const result = await BuildingModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new CampusBuilding();
