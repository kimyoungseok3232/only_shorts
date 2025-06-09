function removeMetapanelItems() {
  const items = document.querySelectorAll("div.ytReelMetapanelViewModelMetapanelItem");
  items.forEach(item => item.remove());
}

const observer = new MutationObserver(removeMetapanelItems);
observer.observe(document.body, { childList: true, subtree: true });

removeMetapanelItems();
