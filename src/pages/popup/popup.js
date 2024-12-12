import './popup.css';
import React, { useEffect, useRef } from "react";
import * as vietmapGl from 'map-test-npm';
import "map-test-npm/vietmap-gl.css"

function Popup() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const vietmap = { lng: 106.69531282536502, lat: 10.776983649766555 };
    const VIETMAP_API_KEY = "YOUR_API_KEY_HERE";
    const zoom = 14;

    useEffect(() => {
        if (map.current) return;

        map.current = new vietmapGl.Map({
            container: mapContainer.current,
            style: "https://maps.vietmap.vn/mt/tm/style.json?apikey=" + VIETMAP_API_KEY,
            center: [vietmap.lng, vietmap.lat],
            zoom: zoom,
        });
        map.current.addControl(new vietmapGl.NavigationControl(), 'top-right');

        const popup = new vietmapGl.Popup()
            .setHTML('<strong>Dinh Độc Lập </strong><p>Di tích lịch sử về chiến tranh Việt Nam cho phép tham quan văn phòng chính phủ, phòng chỉ huy và hiện vật.Di tích lịch sử về chiến tranh Việt Nam cho phép tham quan văn phòng chính phủ, phòng chỉ huy và hiện vật.</p>')


        new vietmapGl.Marker({})
            .setLngLat([106.69531282536502, 10.776983649766555])
            .setPopup(popup)
            .addTo(map.current);

    }, [vietmap.lng, vietmap.lat, zoom]);

    return (
        <div
            ref={mapContainer}
            className="map">
        </div>

    );

}

export default Popup;
