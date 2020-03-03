import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.vectorgrid';
import {
  kievLat,
  kievLng,
  ukEast,
  ukWest,
  ukNorth,
  ukSouth,
} from '../constants';

const southWest = L.latLng(ukEast , ukSouth);
const northEast = L.latLng(ukWest, ukNorth);
const mybounds = L.latLngBounds(southWest, northEast);

async function makeMap() {
  const mymap = L.map('map', {
    maxBounds: mybounds,
    maxZoom: 16,
    minZoom: 7,
  }).setView([kievLat, kievLng], 7);
  L.tileLayer('https://www.google.com/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}', {
    attribution: 'google',
  }).addTo(mymap);

  const vectorTileOptions = {
    rendererFactory: L.canvas.tile,
    maxNativeZoom: 18,
    vectorTileLayerStyles: {
      'realties': function(properties, zoom) {
        return {
          weight: 1,
          color: '#fff',
          opacity: 1,
          fillColor: 'orange',
          fill: true,
          radius: 4,
          fillOpacity: 1
        }
      },
    },
    interactive: true,
  };
  L.vectorGrid.protobuf('http://local.riastatic.com/tiles3/{z}/{x}/{y}.pbf', vectorTileOptions).addTo(mymap);
}

makeMap();
