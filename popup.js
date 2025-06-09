// popup.js

document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleSwitch');

    // Load the saved state when the popup is opened
    chrome.storage.sync.get('hideDescriptions', function (data) {
        if (typeof data.hideDescriptions !== 'undefined') {
            toggleSwitch.checked = data.hideDescriptions;
        }
    });

    // Save the state whenever the toggle switch changes
    toggleSwitch.addEventListener('change', function () {
        chrome.storage.sync.set({ 'hideDescriptions': toggleSwitch.checked }, function () {
            console.log('Hide descriptions setting saved: ' + toggleSwitch.checked);
            // Optionally, you can send a message to the content script or background script
            // to immediately apply the change if needed.
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDescriptions", state: toggleSwitch.checked });
            });
        });
    });
});