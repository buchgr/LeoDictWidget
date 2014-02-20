var settings = new Store("settings", {
    "language": "ende",
    "shortcutSpecialKey": "alt",
    "shortcutKey" : "87", // 87 = W
    "openOnDblClick" : false
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == 'settings')
  		sendResponse(settings.toObject());
});