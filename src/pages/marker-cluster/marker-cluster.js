import './marker-cluster.css';
import * as vietmapGl from 'map-test-npm';
import "map-test-npm/vietmap-gl.css";
import React, { useEffect, useRef } from 'react';
import geojsonData from './data-marker.json';

function MarkerCluster() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const vietmap = { lng: 106.63299747111614, lat: 10.799550064269539 };
  const VIETMAP_API_KEY = "YOUR_API_KEY_HERE";
  const zoom = 11;

  useEffect(() => {
    map.current = new vietmapGl.Map({
      container: mapContainer.current,
      style: "https://maps.vietmap.vn/mt/tm/style.json?apikey=" + VIETMAP_API_KEY,
      center: [vietmap.lng, vietmap.lat],
      zoom: zoom,
    });
    map.current.addControl(new vietmapGl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
        map.current.addSource('earthquakes', {
            type: 'geojson',
            data: geojsonData,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50 
        });

        map.current.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'earthquakes',
            filter: ['has', 'point_count'],
            paint: {
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#51bbd6',
                    100,
                    '#f1f075',
                    750,
                    '#f28cb1'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    100,
                    30,
                    750,
                    40
                ]
            }
        });

        map.current.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'earthquakes',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}', 
                'text-size': 12
            }
        });

        map.current.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'earthquakes',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#11b4da',
                'circle-radius': 4,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        });

        map.current.on('click', 'clusters', async (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });
            const clusterId = features[0].properties.cluster_id;
            const zoom = await map.getSource('earthquakes').getClusterExpansionZoom(clusterId);
            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom
            });
        });

        map.current.on('click', 'unclustered-point', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const mag = e.features[0].properties.mag;
            let tsunami;

            if (e.features[0].properties.tsunami === 1) {
                tsunami = 'yes';
            } else {
                tsunami = 'no';
            }

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new vietmapGl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                    `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
                )
                .addTo(map);
        });

        map.current.on('mouseenter', 'clusters', () => {
            map.current.getCanvas().style.cursor = 'pointer';
        });
        map.current.on('mouseleave', 'clusters', () => {
            map.current.getCanvas().style.cursor = '';
        });
    });
  })

  return (
    <div
      ref={mapContainer}
      className="map">
    </div>
  );
}

export default MarkerCluster;
