import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yeWFtIiwiYSI6ImNrNmF5NjhpYTAzbnczbHBheXRseWs5NWEifQ.CnorMTZWVMt7huacoAQPBA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-87.61694, 41.86625],
  zoom: 18,
  pitch: 40,
  bearing: 20,
  antialias: true
});

map.on('load', function() {
  map.addSource('floorplan', {
    'type': 'geojson',
    'data':
      'https://docs.mapbox.com/mapbox-gl-js/assets/indoor-3d-map.geojson'
  });
  map.addLayer({
    'id': 'room-extrusion',
    'type': 'fill-extrusion',
    'source': 'floorplan',
    'paint': {
      // See the Mapbox Style Specification for details on data expressions.
      // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions

      // Get the fill-extrusion-color from the source 'color' property.
      'fill-extrusion-color': ['get', 'color'],

      // Get fill-extrusion-height from the source 'height' property.
      'fill-extrusion-height': ['get', 'height'],

      // Get fill-extrusion-base from the source 'base_height' property.
      'fill-extrusion-base': ['get', 'base_height'],

      // Make extrusions slightly opaque for see through indoor walls.
      'fill-extrusion-opacity': 0.5
    }
  });
});
