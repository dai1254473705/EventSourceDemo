const evtSource = new EventSource("/event", {
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
    console.log(evtSource.readyState);
    console.log(e.data);
    const newElement = document.createElement("li");
    newElement.textContent = `message: ${e.data}`;
    eventList.appendChild(newElement);
    // evtSource.close();
});

// evtSource.addEventListener("error", (event) => {
//     console.log(event, 'error');
// });