const serve = require('koa-static');
const mount = require('koa-mount');
const Koa = require('koa');
const router = require('./routes');

const app = new Koa();

app.use(async function (ctx, next){
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});

app.use(mount('/public', serve(`${__dirname}/../public`)));

router(app);

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`listen ${process.env.PORT}`)
});
