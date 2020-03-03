import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import L from 'leaflet';
import('leaflet/dist/leaflet.css');
import {
  kievLat,
  kievLng,
  ukEast,
  ukWest,
  ukNorth,
  ukSouth,
} from './constants';

mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yeWFtIiwiYSI6ImNrNmF5NjhpYTAzbnczbHBheXRseWs5NWEifQ.CnorMTZWVMt7huacoAQPBA';
const map = new mapboxgl.Map({
  style: 'mapbox://styles/mapbox/light-v10',
  center: [kievLng, kievLat],
  zoom: 7,
  pitch: 45,
  bearing: -17.6,
  container: 'map1',
  maxBounds: [
    [ukSouth, ukWest],
    [ukNorth, ukEast]
  ]
});

const southWest = L.latLng(ukEast , ukSouth);
const northEast = L.latLng(ukWest, ukNorth);
const mybounds = L.latLngBounds(southWest, northEast);
const mymap = L.map('map2', {
  maxBounds: mybounds,
  maxZoom: 16,
  minZoom: 7,
}).setView([kievLat, kievLng], 7);
L.tileLayer('https://www.google.com/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}', {
  attribution: 'google',
}).addTo(mymap);
