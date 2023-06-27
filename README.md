# EventSource
> EventSource 接口是 web 内容与服务器发送事件通信的接口。

一个 EventSource 实例会对 HTTP 服务器开启一个持久化的连接，以 text/event-stream 格式发送事件，此连接会一直保持开启直到通过调用 EventSource.close() 关闭。

### 相关文档

|标题|链接|
|-|-|
|MDN|https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource|
|使用服务器发送事件|https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events|
|koa|https://koa.bootcss.com/#request|

### 运行

+ npm run start