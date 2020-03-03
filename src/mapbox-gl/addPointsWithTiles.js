export default ({ map }) => {
    map.addSource('points', {
        type: 'vector',
        tiles: [
            'http://local.riastatic.com/tiles3/{z}/{x}/{y}.pbf'
        ]
    });
    map.addLayer({
        'id': 'points',
        'type': 'circle',
        'source': 'points',
        'source-layer': 'realties',
        filter: ['!in', 'realtyId', ''],
        paint: {
            'circle-color': 'orange',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });
};
