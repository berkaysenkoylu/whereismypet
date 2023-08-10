import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import classes from './PickLocation.module.scss';

const containerStyle = {
    width: '100%',
    height: '20rem'
};

interface PositionType {
    lat: number
    lng: number
}

const PickLocation = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY
    });
    const [currentPosition, setCurrentPosition] = useState<PositionType>();
    const [selectedPosition, setSelectedPosition] = useState<PositionType>();

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
            const pos = { lat, lng };

            setCurrentPosition(pos);
        })
    },[]);

    const onLoad = useCallback((map: google.maps.Map) => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
            const pos = { lat, lng };

            setCurrentPosition(pos);

            // const bounds = new window.google.maps.LatLngBounds(pos);
            // map.fitBounds(bounds);
            map.setZoom(12);
        });
    }, []);

    const onMapClickedHandler = (event: google.maps.MapMouseEvent) => {
        const latLng = event.latLng;
        const position = {
            lat: latLng.lat(),
            lng: latLng.lng()
        };
        
        setSelectedPosition(position);
    }

    return isLoaded ? (
        <div className={classes.PickLocation}>
            <h3>Location</h3>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={6}
                onLoad={onLoad}
                onClick={onMapClickedHandler}
                options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                    controlSize: 20
                }}
            >
                <Marker 
                    position={selectedPosition as google.maps.LatLng | google.maps.LatLngLiteral} />
            </GoogleMap>
            {selectedPosition ? <div className={classes.PickLocation__PickedCoords}>
                <span>Latitude: {selectedPosition.lat}</span>
                <span>Longitude: {selectedPosition.lng}</span>
            </div> : null}
        </div>
    ) : <></>
}

export default PickLocation;