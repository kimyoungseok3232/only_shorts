// 설명 보이기/숨기기 상태를 전환하는 함수
function toggleDescriptionsVisibility(hide) {
  const className = 'hide-yt-descriptions';
  if (hide) {
    document.body.classList.add(className);
  } else {
    document.body.classList.remove(className);
  }
}

// 팝업(popup.js)에서 보내는 메시지를 수신
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleDescriptions") {
    toggleDescriptionsVisibility(request.state);
  }
});

// 페이지 로드 시 저장된 값으로 초기 상태 설정
chrome.storage.sync.get('hideDescriptions', function (data) {
  // 저장된 값이 true일 경우에만 숨김 처리
  if (data.hideDescriptions === true) {
    toggleDescriptionsVisibility(true);
  }
});
