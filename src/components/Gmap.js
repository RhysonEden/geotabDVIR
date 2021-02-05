import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const { REACT_APP_GOOGLE_KEY } = process.env;
export default function Gmap({ latitude, longitude }) {
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={{ lat: latitude, lng: longitude }}></Marker>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}
