document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const sendButton = document.getElementById('sendButton');
    const chatContainer = document.getElementById('chatContainer');

    // Load chat history from storage
    chrome.storage.local.get(['chatHistory'], (result) => {
        if (result.chatHistory) {
            result.chatHistory.forEach(message => {
                appendMessage(message.text, message.type, message.timestamp);
            });
            scrollToBottom();
        }
    });

    function formatTimestamp(date) {
        return new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(date);
    }

    function appendMessage(text, type, timestamp = new Date()) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = text;

        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'timestamp';
        timestampDiv.textContent = formatTimestamp(new Date(timestamp));

        const messageContainer = document.createElement('div');
        messageContainer.appendChild(messageDiv);
        messageContainer.appendChild(timestampDiv);

        chatContainer.appendChild(messageContainer);
        scrollToBottom();

        // Save to storage
        chrome.storage.local.get(['chatHistory'], (result) => {
            const history = result.chatHistory || [];
            history.push({ text, type, timestamp });
            // Keep only last 50 messages
            if (history.length > 50) {
                history.shift();
            }
            chrome.storage.local.set({ chatHistory: history });
        });
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function validateAndFormatUrl(url) {
        url = url.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        try {
            new URL(url);
            return url;
        } catch {
            return null;
        }
    }

    async function handleNavigation() {
        const inputUrl = urlInput.value.trim();
        if (!inputUrl) return;

        appendMessage(inputUrl, 'user');

        const url = validateAndFormatUrl(inputUrl);
        if (url) {
            appendMessage(`Going to ${url}`, 'system');

            try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                await chrome.tabs.update(tab.id, { url });
                urlInput.value = '';
            } catch (error) {
                appendMessage('Failed to navigate: ' + error.message, 'system');
            }
        } else {
            appendMessage('Please enter a valid URL', 'system');
        }
    }

    sendButton.addEventListener('click', handleNavigation);

    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleNavigation();
        }
    });

    // Clear history button (optional - uncomment if you want this feature)
    /*
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear History';
    clearButton.style.margin = '10px';
    document.body.insertBefore(clearButton, chatContainer);

    clearButton.addEventListener('click', () => {
      chatContainer.innerHTML = '<div class="welcome-message">Welcome! Enter a URL to navigate.</div>';
      chrome.storage.local.set({ chatHistory: [] });
    });
    */
});