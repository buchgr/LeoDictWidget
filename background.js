var settings = new Store("settings", {
    "language": "ende",
    "shortcutSpecialKey": "alt",
    "shortcutKey" : "81", // 81 = q
    "openOnDblClick" : false
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'settings') {
    sendResponse(settings.toObject());
  }
});
