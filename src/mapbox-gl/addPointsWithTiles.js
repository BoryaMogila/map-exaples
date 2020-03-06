export default ({ map }) => {
    map.addSource('points', {
        type: 'vector',
        tiles: [
            "https://api.maptiler.com/tiles/d6ad24ed-11fa-4198-8f00-bb11e4bb4cd3/{z}/{x}/{y}.pbf?key=Y2yCwRrUeDlwmc5HlZhX"
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
