document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleSwitch');

    chrome.storage.sync.get('hideDescriptions', function (data) {
        toggleSwitch.checked = data.hideDescriptions === true;
    });

    toggleSwitch.addEventListener('change', function () {
        chrome.storage.sync.set({ 'hideDescriptions': toggleSwitch.checked }, function () {
            console.log('Hide descriptions setting saved: ' + toggleSwitch.checked);
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDescriptions", state: toggleSwitch.checked });
            });
        });
    });
});