const Router = require('koa-router');

const clustered = require('./controllers/clustered');
const tiled = require('./controllers/tiled');

const router = new Router();

module.exports = (app) => {
    router
        .get('/clustered', clustered)
        .get('/tiled/:z/:x/:y.pbf', tiled);
    app.use(router.middleware())
}
