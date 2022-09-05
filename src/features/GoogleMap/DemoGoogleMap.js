import React from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

function DemoGoogleMap() {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: 28.5961, lng: 77.3683 }}

        >
            <Marker
                position={{ lat: 28.628454, lng: 77.376945 }}
                icon={"http://maps.google.com/mapfiles/ms/icons/restaurant.png"}
            >


                <InfoWindow >
                    <div>This is Info Window</div>
                </InfoWindow>
            </Marker>

            <Marker
                position={{ lat: 28.5906, lng: 77.3712 }}
                icon={"http://maps.google.com/mapfiles/ms/icons/restaurant.png"}

            >


            </Marker>
            <Marker
                position={{ lat: 28.5838, lng: 77.3597 }}
                icon={"http://maps.google.com/mapfiles/ms/icons/restaurant.png"}

            >

            </Marker>
        </GoogleMap>
    ));
    return (
        <>
            <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMfCbkTC8SMMd0OlrCw5oKipqYa9b-iuE&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `600px`, width: `1200px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />

        </>
    )
}

export default DemoGoogleMap
