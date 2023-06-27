const fs = require('fs');
/**
 * 控制器
 */
class RouterController {
    /**
     * 获取数据
     * @param {*} ctx 
     * @param {*} next 
     */
    getEventSourceData(ctx, next) {
        const p = new Promise(res => {
            resolver = res;
          });
        console.log(ctx);
        ctx.set('Content-Type', 'text/event-stream')
        ctx.set('Cache-Control', 'no-cache');
        ctx.set('Connection', 'keep-alive');
        ctx.set('Access-Control-Allow-Origin','*');
        let eventName = 'update';
        let data = JSON.stringify({ "username": "bobby", "time": new Date().getTime(), "text": "Hi everyone." })
        // ctx.body = `event:${eventName}\ndata: ${data}\nid:123123123\nretry: 3000\n\n`;
        // 创建文件读取流
        const readStream = fs.createReadStream('server/test.txt', {
            encoding: 'utf-8',
            highWaterMark: 1 // 每次读取一个字母
        });
        // 监听数据事件
        readStream.on('data', (chunk) => {
            // 将每个字母作为一个事件发送到客户端
            console.log('读取',chunk);
            // ctx.body = `event:${eventName}\ndata: ${chunk}\nid:123123123\nretry: 3000\n\n`;
            ctx.res.write(`event:exampleSSE\ndata: ${chunk}\n\n`);
            if (!chunk) {
                ctx.res.end();
            }
        });

    }
};
module.exports = RouterController;