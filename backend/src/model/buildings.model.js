const { model, Schema } = require("mongoose");

const BuildingSchema = new Schema({
  buildingName: { type: String, required: true },
  yearConstructed: { type: Number },
  image: { type: String },
  description: { type: String },
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
  spaces: [
    {
      name: { type: String },
      type: {
        type: String,
        enum: ["Office", "Classroom", "Others"],
        required: true,
      },
      capacity: { type: Number },
    },
  ],
});

// Applying 2dsphere index to the location field
BuildingSchema.index({ location: "2dsphere" });

// Index for searching offices/classes by name
BuildingSchema.index({ "spaces.name": "text" });

const BuildingModel = model("Building", BuildingSchema);

module.exports = BuildingModel;
