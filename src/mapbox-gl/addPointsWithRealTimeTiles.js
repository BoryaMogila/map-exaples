export default ({ map }) => {
    map.addSource('points', {
        type: 'vector',
        tiles: [
            `${location.origin}/tiled/{z}/{x}/{y}.pbf`
        ]
    });
    map.addLayer({
        'id': 'points',
        'type': 'circle',
        'source': 'points',
        'source-layer': 'points',
        filter: ['!in', 'realtyId', ''],
        paint: {
            'circle-color': 'orange',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });
};
