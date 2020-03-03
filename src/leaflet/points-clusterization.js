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

  const { items } = await fetch(`${sourcesUrl}/public/realties.json`).then(res => res.json());
  const leafletView = new PruneClusterForLeaflet();
  items.forEach(function (item) {
    const marker = new PruneCluster.Marker(item.latitude, item.longitude, {id: item.realty_id});
    leafletView.RegisterMarker(marker);
  });
  mymap.addLayer(leafletView);
}

makeMap();
