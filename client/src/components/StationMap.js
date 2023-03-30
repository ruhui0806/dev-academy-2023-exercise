import React, { useMemo } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';

//this component is for showing station location on single-station-view page:
const StationMap = ({ x, y }) => {
    const center = useMemo(() => ({ lng: x, lat: y }), [x, y]);
    return (
        <GoogleMap zoom={10} center={center}>
            <MarkerF position={center} />
        </GoogleMap>
    );
};

export default StationMap;