import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import addRegions from './addFilterRegions';
import addPointsWithTiles from './addSelectedPointsWithTiles';
import { point, booleanPointInPolygon, bbox } from '@turf/turf';
import {
  kievLat,
  kievLng,
  ukEast,
  ukWest,
  ukNorth,
  ukSouth,
} from '../constants';

mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yeWFtIiwiYSI6ImNrNmF5NjhpYTAzbnczbHBheXRseWs5NWEifQ.CnorMTZWVMt7huacoAQPBA';
const map = new mapboxgl.Map({
  style: 'mapbox://styles/mapbox/light-v10',
  center: [kievLng, kievLat],
  zoom: 7,
  pitch: 45,
  bearing: -17.6,
  container: 'map',
  antialias: true,
  maxBounds: [
    [ukSouth, ukWest],
    [ukNorth, ukEast]
  ]
});

function select (e) {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['regions-fill']
  });
  const [{ geometry: poly}] = features;
  var polygonBoundingBox = bbox(poly);

  const southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
  const northEast = [polygonBoundingBox[2], polygonBoundingBox[3]];

  const northEastPointPixel = map.project(northEast);
  const southWestPointPixel = map.project(southWest);
  const points = map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel],{
    layers: ['points']
  });
  const filtered = points
    .filter(({ geometry }) => booleanPointInPolygon(geometry, poly))
    .map(({ properties: { realtyId }}) => realtyId);
  map.setFilter('points-highlighted', ['in', 'realtyId', ...filtered]);
  map.setFilter('points', ['!in', 'realtyId', ...filtered]);
}

map.on('load', function() {
  addRegions({ map, select })
  addPointsWithTiles({ map })
});
