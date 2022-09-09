import React, { useState, useEffect,useCallback, memo } from 'react';
import { GoogleMap,Circle ,Marker , useJsApiLoader  } from '@react-google-maps/api';
import restroIcon from '../../../img/restroIcon.png'
import riderlogo from '../../../img/riderlogo.png'

const UserMap=()=> {
    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(10)


    setTimeout(()=>{
        setZoom(5)
    },200)
  
    const marker=[
        {
            lat:28.5355,
            lng:77.3910
        },
        {
            lat: 25.3176,
            lng: 82.9739
        },
    ]
    const markerRider=[
        {
            lat:15.2993,
            lng:74.1240
        },
        {
            lat: 13.0827,
            lng: 80.2707
        },
        {
            lat: 28.7041,
            lng: 77.1025
        },
        {
            lat: 21.2514,
            lng: 81.6296
        },
        {
            lat: 27.0238,
            lng: 74.2179
        },
    ]

    const containerStyle = {
        width: '100%',
        height: '70vh',
    };

    const center =  {
        lat:20.5937,
        lng:78.9629
    }
    const defaultProps = {
        center: {
            lat:20.5937,
            lng:78.9629
        },
    };
    
    const OPTIONS = {
        minZoom: 8,
        maxZoom: 20,
      }
      
      
    const { isLoaded, loadError  } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBMKjOfr-vsOYRI5MhiFsaw0bb026Gorok"
    })

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

  

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={zoom}
                center={center}
                defaultProps={defaultProps}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                 {marker.map((mark, index) => (
                <Circle
                    key={index}
                    center={mark}
                    radius={1000}
                    options={{
                        strokeColor: "#66009a",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: `#66009a`,
                        fillOpacity: 0.35,
                        zIndex: 1
                    }}
                />
            ))}
             {marker.map((mark, index) => (
                <Marker position={mark} icon={restroIcon}  />
                ))}

             {markerRider.map((mark, index) => (
                <Marker position={mark} icon={riderlogo}  />
                ))}


                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        ) : <></>


    );
}
export default memo(UserMap)







// function Map() {
//     const [selectedPark, setSelectedPark] = useState(null);
//     // console.log(selectedPark,"marker data")

//     console.log(parkData?.features[0]?.geometry?.coordinates[1])
//     useEffect(() => {
//         const listener = e => {
//             if (e.key === "Escape") {
//                 setSelectedPark(null);
//             }
//         };
//         window.addEventListener("keydown", listener);

//         return () => {
//             window.removeEventListener("keydown", listener);
//         };
//     }, []);
//     return (
//         <GoogleMap
//             defaultZoom={10}
//             defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
//         >


//             {
//                 parkData.features.map((park) => (
//                     <Marker
//                         position={{
//                             lat: park?.geometry?.coordinates[1],
//                             lng: park?.geometry?.coordinates[0]
//                         }}
//                         onClick={() => {
//                             setSelectedPark(park);
//                           }}
//                     />


//                 ))}

//             {selectedPark && (
//                 <InfoWindow
//                     onCloseClick={() => {
//                         setSelectedPark(null);
//                     }}
//                     position={{
//                         lat: selectedPark?.geometry?.coordinates[1],
//                         lng: selectedPark?.geometry?.coordinates[0]
//                     }}
//                 >
//                     <div>
//                         <h2>{selectedPark?.properties?.NAME}</h2>
//                         <p>{selectedPark?.properties?.DESCRIPTIO}</p>
//                     </div>
//                 </InfoWindow>
//             )}
//         </GoogleMap>
//     );
// }
// const WrappedMap = withScriptjs(withGoogleMap(Map));

{/* <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBMKjOfr-vsOYRI5MhiFsaw0bb026Gorok' }}
                defaultCenter={defaultProps?.center}
                defaultZoom={defaultProps?.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact> */}
   // <div style={{ width: "80vw", height: "80vh" }}>
        //     <WrappedMap
        //         googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyBMKjOfr-vsOYRI5MhiFsaw0bb026Gorok&libraries=geometry,drawing,places"}
        //         loadingElement={<div style={{ height: '100%' }} />}
        //         containerElement={<div style={{ height: '100%' }} />}
        //         mapElement={<div style={{ height: '100%' }} />}

        //     />


        // </div>