import axios from 'axios';
import React, { useState, useEffect, memo } from 'react';
import Map, { Marker } from 'react-map-gl';
import iconMap from "../assets/map.png"

const MapWithSearch = ({ address }) => {
    const [addressMarker, setAddressMarker] = useState({})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(function (response) {
                if (response.status === 200) {
                    setAddressMarker({
                        address,
                        longitude: response?.data?.features[0]?.center[0],
                        latitude: response?.data?.features[0]?.center[1]
                    });
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.error(error);
                setLoading(false);
            });
    }, [address])
    if (!addressMarker.address || !addressMarker.longitude || !addressMarker.latitude) {
        return <div>Loading...</div>;
    }
    console.log(addressMarker)
    return (
        <div className='w-full'>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                initialViewState={{
                    longitude: addressMarker.longitude ? addressMarker.longitude : 105.8542,
                    latitude: addressMarker.latitude ? addressMarker.latitude : 21.0285,
                    zoom: 10
                }}
                style={{ width: '100%', height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker
                    latitude={addressMarker.latitude ? addressMarker.latitude : 105.8542}
                    longitude={addressMarker.longitude ? addressMarker.longitude : 105.8542}
                    offsetLeft={-20}
                    offsetTop={30}
                >
                    <img
                        style={{ height: 30, width: 20 }}
                        src={iconMap} alt='map' />
                </Marker>
            </Map>
        </div >
    );
}

export default memo(MapWithSearch);
