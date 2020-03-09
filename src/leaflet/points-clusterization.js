import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PruneCluster, PruneClusterForLeaflet } from 'exports-loader?PruneCluster,PruneClusterForLeaflet!prunecluster/dist/PruneCluster.js';
import 'prunecluster/dist/LeafletStyleSheet.css';
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

  const { features } = await fetch(`${sourcesUrl}/public/points.json`).then(res => res.json());
  const leafletView = new PruneClusterForLeaflet();
  features.forEach(function (item) {
    const [longitude, latitude] = item.geometry.coordinates;
    const marker = new PruneCluster.Marker(latitude, longitude, {id: item.properties.type});
    leafletView.RegisterMarker(marker);
  });
  mymap.addLayer(leafletView);
}

makeMap();
