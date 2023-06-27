window.onload = () => {
    const id = new Date().getTime();
    const evtSource = new EventSource(`/event/push?id=${id}`, {
        withCredentials: false
    });
    const eventList = document.querySelector("ul");

    /*
     * 这将仅监听类似下面的事件
     *
     * event: notice
     * data: useful data
     * id: someid
     */
    evtSource.onopen = function () {
        console.log("Connection to server opened.");
    };
    /*
     * “message”事件是一个特例，因为它可以捕获没有 event 字段的事件，
     * 以及具有特定类型 `event：message` 的事件。
     * 它不会触发任何其他类型的事件。
     */
    evtSource.addEventListener("update", (e) => {
        const data = JSON.parse(e.data);
        console.log('update==>',data);
        const ele = document.querySelector(".progress");
        ele.textContent = data.count;
    });
    evtSource.addEventListener("close", (e) => {
        console.log('close');
        evtSource.close();
    });

    // evtSource.addEventListener("error", (event) => {
    //     console.log(event, 'error');
    // });
    document.querySelector('#sse').onclick = function () {
        console.log('hahaha');
        // 发起一个post请求
        axios({
            method: 'post',
            url: '/event/progress',
            data: {
                id: id,
            },
        }).then(function (response) {
            console.log(response, '===');
        });
    }
    window.onbeforeunload = (event) => {
        evtSource.close();
        // 发起一个post请求
        axios({
            method: 'get',
            url: '/event/remove',
            params: {
                id: id,
            },
        });
    }
}
