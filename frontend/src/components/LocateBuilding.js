import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import env from "../config";
import CardComponent from "./card";
import { Popup } from "react-map-gl";

const LocateBuilding = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  // const [viewport, setViewport] = useState({
  //   longitude: 7.4688,
  //   latitude: 10.5364,
  //   zoom: 15,
  // });
  const [viewport, setViewport] = useState({
    longitude: 7.4371, // NDA longitude
    latitude: 10.5616, // NDA latitude
    zoom: 17, // Closer zoom for better view
  });
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState(null);
  const [travelMode, setTravelMode] = useState("walking");
  const [showPopup, setShowPopup] = useState(false);

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis is not supported in this browser.");
    }
  };

  useEffect(() => {
    if (building) {
      speakText(
        `Lets Guide You to ${building.buildingName} here in the Nigerian Defence Academy`
      );
    } else {
      speakText("Welcome to the Nigerian Defence Academy");
    }
  }, [building]);

  useEffect(() => {
    axios
      .get(`${env.BASE_URL}/buildings/${id}`)
      .then((response) => {
        setBuilding(response.data.payload);
      })
      .catch((error) => {
        console.error("Error fetching building details:", error);
      });

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation({ longitude, latitude });
        setViewport({ longitude, latitude, zoom: 15 });
      },
      (error) => {
        console.error("Error fetching the user's location", error);
        alert(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [id]);

  const fetchDirections = (destination) => {
    if (!userLocation) return;
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/${travelMode}/${userLocation.longitude},${userLocation.latitude};${destination[0]},${destination[1]}?geometries=geojson&access_token=${env.REACT_APP_MAPBOX_TOKEN}`;

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
    if (building && building.location && userLocation) {
      fetchDirections(building.location.coordinates);
    }
  }, [building, userLocation, travelMode]);

  if (!building || !userLocation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className="flex p-4">
        <ol className="flex items-center">
          <li className="text-left">
            <div className="-m-1">
              <Link to={"/buildinglist"}>
                <p className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
                  Home
                </p>
              </Link>
            </div>
          </li>
          <li className="text-left">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <div className="-m-1">
                <Link to={`/building/${id}`}>
                  <p className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
                    Details
                  </p>
                </Link>
              </div>
            </div>
          </li>
          <li className="text-left">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <div className="-m-1">
                <p
                  className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                  aria-current="page"
                >
                  Location
                </p>
              </div>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex flex-col md:flex-row gap-4 m-5 ">
        <img
          src="/NDA-192.png"
          alt="Logo"
          className="absolute top-4 right-4 w-16 h-16"
        />
        <div className="basis-1/4 p-5">
          <CardComponent
            name={building.buildingName}
            spaces={building.spaces || []}
          />
        </div>
        <div className="w-full h-[90vh]">
          <div className="mb-4">
            <label htmlFor="travelMode">Travel Mode:</label>
            <select
              id="travelMode"
              value={travelMode}
              onChange={(e) => setTravelMode(e.target.value)}
              className="ml-2 p-2 border rounded"
            >
              <option value="walking">Walking</option>
              <option value="driving">Driving</option>
              <option value="cycling">Cycling</option>
            </select>
          </div>
          <ReactMapGL
            {...viewport}
            mapboxAccessToken={env.REACT_APP_MAPBOX_TOKEN}
            // mapStyle="mapbox://styles/mapbox/streets-v9"
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            onMove={(evt) => setViewport(evt.viewState)}
          >
            <NavigationControl />

            {/* User Location Marker */}
            {userLocation && (
              <Marker
                longitude={userLocation.longitude}
                latitude={userLocation.latitude}
                color="blue"
              />
            )}

            {/* Building Marker with Popup */}
            <Marker
              longitude={building.location.coordinates[0]}
              latitude={building.location.coordinates[1]}
              color="red"
              onClick={() => setShowPopup(true)}
            />

            {showPopup && (
              <Popup
                longitude={building.location.coordinates[0]}
                latitude={building.location.coordinates[1]}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup(false)}
                anchor="top"
              >
                <div className="p-2">
                  <h3 className="text-lg font-bold">{building.buildingName}</h3>
                </div>
              </Popup>
            )}

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
