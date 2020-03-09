export default ({ map }) => {
    map.addSource('points', {
        type: 'vector',
        tiles: [
            "https://api.maptiler.com/tiles/13018a04-a7d5-425c-8c49-06f76a51fb9a/{z}/{x}/{y}.pbf?key=GbsS0IEy8mlTGh0voOnx"
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
