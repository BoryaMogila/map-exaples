import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  ukEast,
  ukWest,
  ukNorth,
  ukSouth,
} from '../constants';

mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yeWFtIiwiYSI6ImNrNmF5NjhpYTAzbnczbHBheXRseWs5NWEifQ.CnorMTZWVMt7huacoAQPBA';
const map = new mapboxgl.Map({
  style: 'mapbox://styles/mapbox/light-v10',
  center: [30.559070974371934, 50.40614543168496],
  zoom: 15.5,
  pitch: 45,
  bearing: -17.6,
  container: 'map',
  antialias: true,
  maxBounds: [
    [ukSouth, ukWest],
    [ukNorth, ukEast]
  ]
});

map.on('load', function() {
  map.addSource('buildings', {
    type: 'vector',
    tiles: [
      "https://api.maptiler.com/tiles/915b03e7-b111-4f78-b692-09b721ecdb03/{z}/{x}/{y}.pbf?key=5s6uwWdEU0Qfr1i7Rzyu"
    ]
  });
  map.addLayer({
    'id': 'polygons-fill',
    'type': 'fill',
    'source': 'buildings',
    'source-layer': 'polygons',
    'layout': {},
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.3,
    }
  });
  map.addLayer({
    'id': 'polygons-line',
    'type': 'line',
    'source': 'buildings',
    'source-layer': 'polygons',
    'layout': {},
    'paint': {
      'line-color': '#088',
      'line-opacity': 1,
    }
  });
  map.addLayer({
    'id': 'buildings-fill',
    'source': 'buildings',
    'source-layer': 'buildings',
    'type': 'fill-extrusion',
    'minzoom': 12,
    'paint': {
      'fill-extrusion-color': 'orange',
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        12,
        0,
        15.05,
        ['get', 'height']
      ],
      'fill-extrusion-opacity': 0.6
    }
  });
});
