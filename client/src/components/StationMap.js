import React, { useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

//this component is for showing station location on single-station-view page:
const StationMap = ({ x, y }) => {
  const center = useMemo(() => ({ lng: x, lat: y }), [x, y]);
  return (
    <div>
      <h3>Station map container</h3>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerStyle={{
          height: "400px",
          width: "800px",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};

export default StationMap;
