// client/src/components/DeliveryMap.jsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const DeliveryMap = ({ pickup, dropoff }) => {
    const pickupCoords = [pickup.location.coordinates[1], pickup.location.coordinates[0]];
    const dropoffCoords = [dropoff.location.coordinates[1], dropoff.location.coordinates[0]];

    return (
        <MapContainer center={pickupCoords} zoom={13} style={{ height: '500px', width: '100%', borderRadius: '8px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={pickupCoords}>
                <Popup><b>Pickup:</b> {pickup.name}<br/>{pickup.city}</Popup>
            </Marker>
            <Marker position={dropoffCoords}>
                <Popup><b>Deliver to:</b> {dropoff.name}<br/>{dropoff.city}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default DeliveryMap;