export default ({ map }) => {
    map.addSource('points', {
        type: 'geojson',
        data: `${sourcesUrl}/public/realtiesGeoJson.json`,
    });
    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'points',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });
};
