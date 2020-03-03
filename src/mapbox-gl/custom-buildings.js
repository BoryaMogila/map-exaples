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
  map.addSource('poligons', {
    type: 'geojson',
    data: 'http://localhost:1111/public/polygons_s.json',
  });
  map.addSource('poligons_b', {
    type: 'geojson',
    data: 'http://localhost:1111/public/polygons_b.json',
  });
  map.addLayer({
    'id': 'poligons_b-fill',
    'type': 'fill',
    'source': 'poligons_b',
    'layout': {},
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.3,
    }
  });
  map.addLayer({
    'id': 'poligons_b-line',
    'type': 'line',
    'source': 'poligons_b',
    'layout': {},
    'paint': {
      'line-color': '#088',
      'line-opacity': 1,
    }
  });
  map.addLayer({
    'id': 'poligons-fill',
    'source': 'poligons',
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
