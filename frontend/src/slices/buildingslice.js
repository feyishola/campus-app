import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "../config";

// Fetch buildings from API
export const fetchBuildings = createAsyncThunk(
  "buildings/fetchBuildings",
  async () => {
    const response = await axios.get(`${env.BASE_URL}/buildings`);
    return response.data.payload;
  }
);

const buildingSlice = createSlice({
  name: "buildings",
  initialState: {
    buildings: [],
    filteredBuildings: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    filterBuildings: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredBuildings = state.buildings.filter(
        (building) =>
          building.buildingName.toLowerCase().includes(query) ||
          building.spaces.some((space) =>
            space.name?.toLowerCase().includes(query)
          )
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuildings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.buildings = action.payload;
        state.filteredBuildings = action.payload; // Initially show all buildings
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterBuildings } = buildingSlice.actions;
export default buildingSlice.reducer;
