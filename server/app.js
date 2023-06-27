/**
 * 入口文件
 */
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koasse = require('koa-sse-stream');
const path = require('path');
const Controller = require('./controller');

const app = new Koa();
const router = new Router();
const controller = new Controller();
// app.use(compress())
app.use(bodyParser());
app.use(serve(path.join(__dirname + "/../client")));
/**
 * koa sse middleware
 * @param {Object} opt
 * @param {Number} opts.maxClients max client number, default is 10000
 * @param {Number} opts.pingInterval heartbeat sending interval time(ms), default 60s
 * @param {String} opts.closeEvent if not provide end([data]), send default close event to client, default event name is "close"
 * @param {String} opts.matchQuery when set matchQuery, only has query (whatever the value) , sse will create
 */
const SSE_CONF = {
    maxClients: 2, // 最大连接数
    pingInterval: 3000 // 重连时间
}
router.get('/event/push', koasse(SSE_CONF), controller.eventPush);
router.post('/event/progress', controller.eventProgress);
router.get('/event/remove', controller.eventRemove);

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log(`
    当前项目运行地址：http://127.0.0.1:3000/html/index.html
    `);
});