import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import iconMap from "../assets/map.png"
import { apiGetPublicMap } from '../services';
import Loading from './Loading';

const MapWithSearch = ({ address }) => {
    const [coords, setCoords] = useState({ longitude: 105.8542, latitude: 21.0285 })
    useEffect(() => {
        const fetchPublicProvince = async () => {
            if (address) {
                const response = await apiGetPublicMap(address);
                if (response?.status === 200 && response?.data?.features?.length > 0) {
                    setCoords({
                        longitude: response?.data?.features[0]?.center[0],
                        latitude: response?.data?.features[0]?.center[1]
                    });
                }
            }
        };
        address && fetchPublicProvince();
    }, [address]);
    return (
        <div className='w-full relative'>
            <div className='absolute top-0 left-0 z-20 bg-white shadow-md p-1'>
                Địa chỉ: {address}
            </div>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                initialViewState={{
                    longitude: 105.8542,
                    latitude: 21.0285,
                    zoom: 12
                }}
                longitude={coords.longitude}
                latitude={coords.latitude}
                style={{ width: '100%', height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker
                    latitude={coords.latitude}
                    longitude={coords.longitude}
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

export default MapWithSearch;
