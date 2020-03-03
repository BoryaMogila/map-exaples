import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import add3dBuildings from './add3dBuildings';
import {
  ukEast,
  ukWest,
  ukNorth,
  ukSouth,
} from '../constants';

mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yeWFtIiwiYSI6ImNrNmF5NjhpYTAzbnczbHBheXRseWs5NWEifQ.CnorMTZWVMt7huacoAQPBA';
const map = new mapboxgl.Map({
  style: 'mapbox://styles/mapbox/light-v10',
  center: [30.52, 50.45],
  zoom: 16,
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
  add3dBuildings(map);
});
