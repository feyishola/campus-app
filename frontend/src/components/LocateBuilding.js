import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";
import { useParams } from "react-router-dom";
import axios from "axios";
import env from "../config";
import CardComponent from "./card";

const LocateBuilding = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: 7.4688,
    latitude: 10.5364,
    zoom: 14,
  });
  const [userLocation, setUserLocation] = useState({
    longitude: 7.4688,
    latitude: 10.5364,
  });
  const [route, setRoute] = useState(null);

  useEffect(() => {
    // Fetch building details by ID
    axios
      .get(`${env.BASE_URL}/buildings/${id}`)
      .then((response) => {
        setBuilding(response.data.payload);
      })
      .catch((error) => {
        console.error("Error fetching building details:", error);
      });

    // Attempt to get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        // console.log("user position", { longitude, latitude });
        setUserLocation({ longitude, latitude });
        setViewport({ longitude, latitude, zoom: 14 });
      },
      (error) => {
        console.error("Error fetching the user's location", error);
        // If there's an error, the map will stay centered on the campus location
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [id]);

  const fetchDirections = (destination) => {
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${destination[0]},${destination[1]}?geometries=geojson&access_token=${env.REACT_APP_MAPBOX_TOKEN}`;

    fetch(directionsUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.routes && data.routes.length) {
          setRoute(data.routes[0].geometry);
        }
      })
      .catch((err) => console.error("Error fetching directions:", err));
  };

  useEffect(() => {
    if (
      building &&
      building.location &&
      userLocation.longitude &&
      userLocation.latitude
    ) {
      fetchDirections(building.location.coordinates);
    }
  }, [building, userLocation]);

  if (!building) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 m-5 ">
        <div className="basis-1/4 p-5">
          <CardComponent name={building.buildingName} />
        </div>
        {/* <h1>Locate {building.buildingName}</h1> */}
        <div style={{ width: "100%", height: "90vh" }}>
          <ReactMapGL
            {...viewport}
            mapboxAccessToken={env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onMove={(evt) => setViewport(evt.viewState)}
          >
            <NavigationControl onViewportChange={setViewport} />

            {/* Marker for User's Current Location */}
            <Marker
              longitude={userLocation.longitude}
              latitude={userLocation.latitude}
              color="blue"
            />

            {/* Marker for Building Location */}
            <Marker
              longitude={building.location.coordinates[0]}
              latitude={building.location.coordinates[1]}
              color="red"
            />

            {/* Route Layer */}
            {route && (
              <Source
                id="route"
                type="geojson"
                data={{ type: "Feature", geometry: route }}
              >
                <Layer
                  id="routeLayer"
                  type="line"
                  source="route"
                  layout={{ "line-join": "round", "line-cap": "round" }}
                  paint={{ "line-color": "#1db7dd", "line-width": 5 }}
                />
              </Source>
            )}
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
};

export default LocateBuilding;
