import React, { useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

//this component is for showing station location on single-station-view page:
const StationMap = ({ x, y }) => {
  const center = useMemo(() => ({ lng: x, lat: y }), [x, y]);
  return (
    <div>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerStyle={{
          height: "400px",
          width: {
            xs: 200,
            sm: 300,
            md: 400,
            lg: 500,
            xl: 600,
          },
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};

export default StationMap;
