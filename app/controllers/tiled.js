const vtpbf = require('vt-pbf');
const geojsonVt = require('geojson-vt');
const zlib = require('zlib');

const points = require('../../public/points.json');

const pointsIndex = geojsonVt(
    points,
    {
        maxZoom: 24,
    },
)

module.exports = async (ctx) => {
    const { x, y, z } = ctx.params || {};
    const pointsTiles = pointsIndex.getTile(Number(z), Number(x), Number(y));
    ctx.set('Content-Type', 'application/x-protobuf');
    ctx.set('Content-Encoding', 'gzip');
    const buffer = Buffer.from(vtpbf.fromGeojsonVt({
        points: pointsTiles || { features: [] },
    }));
    const zipped = await new Promise(
        resolve => zlib.gzip(buffer, (ignoreErr, compressed) => resolve(compressed))
    );
    ctx.body = zipped;
}
