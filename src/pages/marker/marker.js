import './marker.css';
import * as vietmapGl from 'map-test-npm';
import "map-test-npm/vietmap-gl.css";
import React, { useEffect, useRef } from 'react';

function Marker() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const vietmap = { lng: 106.675477, lat: 10.758898 };
    const VIETMAP_API_KEY = "YOUR_API_KEY_HERE";
    const zoom = 14;

    useEffect(() => {
        map.current = new vietmapGl.Map({
            container: mapContainer.current,
            style: "https://maps.vietmap.vn/mt/tm/style.json?apikey=" + VIETMAP_API_KEY,
            center: [vietmap.lng, vietmap.lat],
            zoom: zoom,
        });
        map.current.addControl(new vietmapGl.NavigationControl(), 'top-right');

        new vietmapGl.Marker({ draggable: true })
            .setLngLat([106.675477, 10.758898])
            .addTo(map.current);
    }, [vietmap.lng, vietmap.lat, zoom])

    return (
        <div
            ref={mapContainer}
            className="map">
        </div>
    );
}

export default Marker;
