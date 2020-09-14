const Supercluster = require('supercluster');

const points = require('../../public/points.json').features;

const pointsIndex = new Supercluster({
    radius: 40,
    maxZoom: 24,
});
pointsIndex.load(points);

module.exports = async (ctx) => {
    const { bbox, zoom } = ctx.query;
    const clusters = pointsIndex.getClusters(bbox.map(parseFloat), Math.round(Number(zoom)));
    ctx.body = {
        type: 'FeatureCollection',
        features: clusters,
    };
}
