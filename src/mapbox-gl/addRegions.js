export default ({ map }) => {
    map.addSource('regions', {
        type: 'geojson',
        data: 'http://localhost:1111/public/ukraine.json',
    });
    map.addLayer({
        'id': 'regions-fill',
        'type': 'fill',
        'source': 'regions',
        'layout': {},
        'paint': {
            'fill-opacity': 0
        }
    });
    map.addLayer({
        'id': 'regions-line',
        'type': 'line',
        'source': 'regions',
        'layout': {},
        'paint': {
            'line-color': '#088',
            'line-opacity': 1,
        }
    });
};
