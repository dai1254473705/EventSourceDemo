// 连接池
const clientList = new Map();
// 同步进度
const sendProgress = async (id) => {
    const sseItem = clientList.get(String(id))
    if (!sseItem) {
        console.log('没有当前客户端对应ID');
        return;
    }
    sseItem.timer = setInterval(() => {
        const sseItem = clientList.get(String(id))
        if (!sseItem) {
            console.log('没有当前客户端对应ID2');
            return;
        }
        const eventName = 'update';
        const data = `event:update\ndata: ${sseItem?.count}\nid:${id}\nretry: 3000\n\n`;
        if (sseItem.count > 100) {
            clearInterval(sseItem.timer);
            // 这里可以通知客户端关闭
            // TODO...
            sseItem.sse.sendEnd();
        } else {
            console.log('发送数据');
            sseItem.sse?.send?.({
                event: 'update',
                data: JSON.stringify({
                    count: sseItem.count,
                    id: sseItem.id
                }),
            });
            clientList.set(String(id), {
                sse: sseItem.sse,
                timer: sseItem.timer,
                count: sseItem.count + 5
            });
        }
    }, 1000);
}
/**
 * 控制器
 */
class RouterController {
    /**
     * 获取数据
     * @param {*} ctx 
     * @param {*} next 
     */
    eventPush(ctx, next) {
        console.log(ctx.query);
        const { id } = ctx.query;
        // 如果clientList 对应ID已经存在，就覆盖
        clientList.set(id, {
            sse: ctx.sse,
            timer: null,
            count: 0
        });
        console.log(clientList.size, '===length===');
    }
    /**
     * 进度
     * @param {*} ctx 
     * @param {*} next 
     */
    eventProgress(ctx, next) {
        const data = ctx.request.body;
        console.log(data, 'data');
        sendProgress(data.id);
        ctx.body = true;
    }
    /**
     * 移除
     */
    eventRemove(ctx, next) {
        console.log(ctx.query);
        const { id } = ctx.query;
        // 如果clientList 对应ID已经存在，就覆盖
        const result = clientList.delete(id);
        console.log(clientList.keys(), '===remove length===');
        ctx.body = result;
    }
};
module.exports = RouterController;