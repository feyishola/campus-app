import { configureStore } from "@reduxjs/toolkit";
import buildingReducer from "../slices/buildingslice";

export const store = configureStore({
  reducer: {
    buildings: buildingReducer,
  },
});
