import './line.css';
import * as vietmapGl from '@vietmap/vietmap-gl-js';
import '@vietmap/vietmap-gl-js/vietmap-gl.css'
import { useEffect, useRef } from 'react';

function Line() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const vietmap = {lng: 106.715099, lat: 10.800272};
  const VIETMAP_API_KEY = "YOUR_API_KEY_HERE";
  const zoom = 16;
  
  useEffect(() => {
    if (map.current) return;

    map.current = new vietmapGl.Map({
      container: mapContainer.current,
      style:
        "https://maps.vietmap.vn/mt/tm/style.json?apikey=" + VIETMAP_API_KEY,
      center: [vietmap.lng, vietmap.lat],
      zoom: zoom,
    });
    map.current.addControl(new vietmapGl.NavigationControl(), 'top-right');

    const geoPolyline = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [106.71568, 10.80255],
          [106.71565000000001, 10.80244],
          [106.71538000000001, 10.80156],
          [106.71521000000001, 10.801070000000001],
          [106.71516000000001, 10.800960000000002],
          [106.71462000000001, 10.80114],
          [106.71385000000001, 10.80136],
          [106.71350000000001, 10.801430000000002],
          [106.71298, 10.80161],
          [106.71246000000001, 10.80164],
          [106.71237, 10.801590000000001],
          [106.71226000000001, 10.801580000000001],
          [106.71201, 10.801590000000001],
          [106.71195, 10.801590000000001],
          [106.71189000000001, 10.80156],
          [106.71183, 10.8015],
          [106.71181000000001, 10.80146],
          [106.71180000000001, 10.80141],
          [106.71181000000001, 10.801210000000001],
          [106.71252000000001, 10.801210000000001],
          [106.71273000000001, 10.80122],
          [106.71281, 10.801250000000001],
          [106.71324000000001, 10.801260000000001],
          [106.71335, 10.80128],
          [106.71379, 10.80122],
          [106.71455, 10.801],
          [106.71567, 10.80061],
          [106.71599, 10.800500000000001],
          [106.71643, 10.8003],
          [106.71653, 10.80014],
          [106.71660000000001, 10.800070000000002],
          [106.71682000000001, 10.79995],
          [106.71733, 10.79968],
          [106.71794000000001, 10.799380000000001],
          [106.71792, 10.79906],
          [106.71776000000001, 10.79812],
          [106.71774, 10.797930000000001],
          [106.71772000000001, 10.79781],
          [106.71774, 10.79767],
          [106.718, 10.79723],
          [106.71738, 10.79673],
        ],
      },
    };

    map.current.on("load", function () {
      map.current.addSource("route", {
        type: "geojson",
        data: geoPolyline,
      });

      map.current.addLayer({
        id: "route-layer",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FF5733",
          "line-width": 5,
        },
      });
    });

  }, [vietmap.lng, vietmap.lat, zoom]);

  return (
    <div
    ref={mapContainer}
    className="map">
  </div>

  );
}

export default Line;
