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

    function hide(e) {
        if (e != null) {
            e.preventDefault();
        }

        if (widget()) {
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
        
        var html = "<div style='width:100%; height: 20px; background-color:rgb(66, 185, 66); text-align:right; cursor: pointer; -webkit-touch-callout: none; -webkit-user-select: none;";
        html += "user-select: none; font-family: Arial, Verdana, sans-serif;padding:0;'>";
        html += "<div style='float:right; background:#605F61; display:block; height:100%; padding: 0 3px; margin:0;line-height:0px;text-align:center;'>";
        html += "<a style='text-decoration:none;color:#fff; display:block; font-size:25px; font-weight:bold; margin-top:8px;' href='#'>x</a></div></div>";
        html += "<iframe style='width:100%; height:500px; border:0;' src='" + url + "'></iframe>";
        html += "</div>";
        tmpwidget.innerHTML = html;

        document.body.appendChild(tmpwidget);

        var dragborder = widget().childNodes[0];
        dragborder.addEventListener("mousedown", initWidgetMove, false);

        var hidebtn = widget().getElementsByTagName("a")[0];
        hidebtn.addEventListener("click", hide, false);
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
                var specialKeyPressed = false;
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
                    // Command Key on Mac
                    case "cmd-key":
                        var isMac = navigator.platform.toUpperCase().indexOf('MAC') != -1;
                        specialKeyPressed = e.metaKey && isMac;
                        break;
                }
                    
                if (specialKeyPressed && e.keyCode == settings.shortcutKey) {
                    if (widget()) {
                        hide();
                    } else {
                        var query = window.getSelection().toString().trim();
                        show(buildUrl(settings.language, query))
                    }
                }
            }, false);
        },

        show : function(settings, query) {
            if (!widget()) {
                show(buildUrl(settings.language, query.trim()))
            }
        }
    }
})();

chrome.runtime.sendMessage({"action": "init"}, function(settings) {
    LeoDictWidget.init(settings);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "launch-from-contextmenu") {
        LeoDictWidget.show(request.settings, request.selectionText);
    }
});
