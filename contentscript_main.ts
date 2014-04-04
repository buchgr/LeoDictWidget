/// <reference path="leodictwidget.ts" />
var widget: org.leo.dict.Widget = null;
var chrome: any;

chrome.runtime.sendMessage({ "action": "init" }, (settings: org.leo.dict.Settings) => {
    widget = new org.leo.dict.Widget(settings);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "launch-from-contextmenu") {
        widget.show(widget.buildUrl(<string>request.selectionText));
    }
});