var Store: any;
var chrome: any;

var settings = new Store("settings", {
    "language": "ende",
    "shortcutSpecialKey": "alt",
    "shortcutKey": "87" // 87 = W
}).toObject();

var onTranslate = (info: any, tab: any) => {
    chrome.tabs.sendMessage(tab.id,
        {
            "action": "launch-from-contextmenu",
            "settings": settings,
            "selectionText": info.selectionText
        });
}

var entry = null;
chrome.runtime.onMessage.addListener((request: any, sender: any, sendResponse: any) => {
    if (request.action == "init") {
        sendResponse(settings);

        if (!entry) {
            entry = chrome.contextMenus.create({
                "title": "Look up '%s'",
                "contexts": ["selection"],
                "onclick": onTranslate
            });
        }
    }
});
