document.getElementById('applyFormat').addEventListener('click', function () {
    const format = document.getElementById('format').value;
    chrome.storage.sync.set({ imageFormat: format }, function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { format: format });
        });
    });
});

chrome.storage.sync.get(['imageFormat'], function (result) {
    if (result.imageFormat) {
        document.getElementById('format').value = result.imageFormat;
    }
});
