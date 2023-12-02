chrome.action.onClicked.addListener(async (tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: function () {
            return window.getSelection().toString().trim();
            // if (selectedText !== "") {
            //     alert("Selected Text: " + selectedText);
            // } else {
            //     alert("No text selected.");
            // }
        },
    }).then(async injectionResults => {
        for (const {frameId, result} of injectionResults) {
            console.log(`Frame ${frameId} result:`, result);

            const apiUrl = "http://127.0.0.1:5000/api";
            const requestData = {
                selectedText: result
            };

            let body = JSON.stringify(requestData);
            let data = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            })
                .then((response) => {
                    return response.text()
                }) // Read the raw response as text
                .then(async (data) => {
                    console.log("HTTP Raw Response:", data); // Log the raw response
                    try {
                        const parsedData = JSON.parse(data);
                        console.log("Parsed JSON Response:", parsedData.sentiment);
                        await chrome.tabs.sendMessage(tab.id, {sentiment: parsedData.sentiment});
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                })
                .catch((error) => {
                    console.error("HTTP Request Error:", error);
                });
        }

    });
});
