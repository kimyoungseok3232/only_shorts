function removeMetapanelItems() {
  const items = document.querySelectorAll("div.ytReelMetapanelViewModelMetapanelItem");
  items.forEach(item => item.remove());
}

let isFeatureEnabled = true; // 기본값은 기능을 켜두는 것으로 설정

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleDescriptions") {
    isFeatureEnabled = request.state;
    console.log("Feature enabled state received in content.js:", isFeatureEnabled);
    if (isFeatureEnabled) {
      // 기능이 켜져 있을 때 바로 실행
      removeMetapanelItems();
      // Observer 재시작 (만약 이전에 비활성화되어 있었다면)
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      // 기능이 꺼져 있을 때 Observer 중지
      observer.disconnect();
    }
  }
});

if (isFeatureEnabled) {
  removeMetapanelItems();
}


const observer = new MutationObserver(() => {
  if (isFeatureEnabled) {
    removeMetapanelItems();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

chrome.storage.sync.get('hideDescriptions', function (data) {
    if (typeof data.hideDescriptions !== 'undefined') {
        isFeatureEnabled = data.hideDescriptions;
        if (isFeatureEnabled) {
            removeMetapanelItems();
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            observer.disconnect();
        }
    }
});