chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.sentiment) {
        alert(message.sentiment);
    }
});

