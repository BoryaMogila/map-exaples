import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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

  const ukraine = await fetch(`${sourcesUrl}/public/ukraine.json`).then(res => res.json());
  L.geoJSON(ukraine, {
    style:  {color: 'blue', fillOpacity: 0}
  }).eachLayer((layer) => {
    layer.bindPopup(function (layer) {
      return layer.feature.properties['label_uk'];
    });
    layer.on('click', function (e) {
      mymap.fitBounds(e.target.getBounds());
      layer.openPopup();
    })
  }).addTo(mymap);
}

makeMap();
