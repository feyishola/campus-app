const { model, Schema } = require("mongoose");

const BuildingSchema = new Schema({
  buildingName: { type: String, required: true },
  yearConstructed: { type: Number },
  image: { type: String },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// Applying 2dsphere index to the location field
BuildingSchema.index({ location: "2dsphere" });

const BuildingModel = model("Building", BuildingSchema);

module.exports = BuildingModel;
