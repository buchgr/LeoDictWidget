var LeoDictWidget = (function () {
    var moving = false;

    function buildUrl (language, query) {    
        var url = "https://pda.leo.org/" + language + "/";
        if (query.length > 1)
            url += "#search=" + encodeURIComponent(query);
        return url;
    }

    function widget() {
        return document.getElementById("__$$leodictwidget$$__");
    }

    function hide() {
        if (widget()) {
            var dragborder = widget().childNodes[0];
            dragborder.removeEventListener("mousedown", initWidgetMove, false);

            widget().parentNode.removeChild(widget());
        }
    }
    
    function initWidgetMove(e) {
        // globals
        offX = e.clientX - parseInt(widget().offsetLeft);
        offY = e.clientY - parseInt(widget().offsetTop);

        window.addEventListener("mousemove", widgetMove, true);
        moving = true;
    }

    function widgetMove(e) {
        // globals
        widget().style.left = (e.clientX - offX) + "px";
        widget().style.top = (e.clientY - offY) + "px";
    }

    function show(url) {
        var tmpwidget = document.createElement('div');
        tmpwidget.setAttribute('id', '__$$leodictwidget$$__');
        tmpwidget.setAttribute('style', 'position:fixed; right:10px; top:10px; width:340px; height:520px; border:0; z-index:2147483647; box-shadow: -5px 5px 5px #CCC;');
        
        var html = "<div style='width:100%; height: 20px; background-color:rgb(66, 185, 66); text-align:center; font-size:12px; padding-top:4px; cursor: default; ";
        html += "-webkit-touch-callout: none; -webkit-user-select: none; user-select: none; font-family: Arial, Verdana, sans-serif; color: black;'>Press here to move widget.</div>";
        html += "<iframe style='width:100%; height:500px; border:0;' src='" + url + "'></iframe>";
        html += "</div>";
        tmpwidget.innerHTML = html;

        document.body.appendChild(tmpwidget);

        var dragborder = widget().childNodes[0];
        dragborder.addEventListener("mousedown", initWidgetMove, false);
    }

    return {
        init : function (settings) {
            window.addEventListener("mouseup", function (e) {
                if (widget()) {
                    if (moving) {
                        window.removeEventListener("mousemove", widgetMove, true);
                        moving = false;
                    }

                    var query = window.getSelection().toString().trim();
                    if (query.length > 1)
                        widget().childNodes[1].src = buildUrl(settings.language, query);
                }
            }, false);
            
            window.addEventListener("keydown", function (e) {
                specialKeyPressed = false;
                switch (settings.shortcutSpecialKey) {
                    case "alt":
                        specialKeyPressed = e.altKey;
                        break;
                    case "shift":
                        specialKeyPressed = e.shiftKey;
                        break;
                    case "ctrl":
                        specialKeyPressed = e.ctrlKey;
                        break;
                }
                    
                if (specialKeyPressed && e.keyCode == settings.shortcutKey) {
                    if (widget())
                        hide();
                    else {
                        var query = window.getSelection().toString().trim();
                        show(buildUrl(settings.language, query))
                    }
                }
            }, false);
        }
    }
})();

chrome.runtime.sendMessage({"action": 'settings'}, function(settings) {
    LeoDictWidget.init(settings);
});