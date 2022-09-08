import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import parkData from "./sampleUserData.json"
// import * as parkData from "./sampleUserData.json"
import mapStyles from "./mapstyle";


function Map() {
    const [selectedPark, setSelectedPark] = useState(null);
    // console.log(selectedPark,"marker data")

    console.log(parkData.features[0].geometry.coordinates[1])
    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
        >
   

            {
                parkData.features.map((park) => (
                    <Marker
                        position={{
                            lat: park.geometry?.coordinates[1],
                            lng: park.geometry?.coordinates[0]
                        }}
                        onClick={() => {
                            setSelectedPark(park);
                          }}
                    />


                ))}

            {selectedPark && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedPark(null);
                    }}
                    position={{
                        lat: selectedPark.geometry?.coordinates[1],
                        lng: selectedPark.geometry?.coordinates[0]
                    }}
                >
                    <div>
                        <h2>{selectedPark.properties.NAME}</h2>
                        <p>{selectedPark.properties.DESCRIPTIO}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function UserMap() {
    return (
        <div style={{ width: "80vw", height: "80vh" }}>
            <WrappedMap
                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyBMKjOfr-vsOYRI5MhiFsaw0bb026Gorok&libraries=geometry,drawing,places"}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}

            />


        </div>
    );
}

