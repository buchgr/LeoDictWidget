var LeoDictWidget = (function () {
    function buildUrl (language, query) {    
        var url = "https://pda.leo.org/" + language + "/";
        if (query.length > 1)
            url += "#search=" + encodeURIComponent(query)
        return url;
    }

    function widget()
    {
        return document.getElementById("__$$leodictwidget$$__");
    }

    function hide()
    {
        if (widget())
            widget().parentNode.removeChild(widget());
    }

    function show(url) {

        var html = "<div id='__$$leodictwidget$$__' ";
        html += "style='position:fixed; right:10px; top:10px; width:340px; height:525px; border:0; z-index:2147483647; box-shadow: -5px 5px 5px #CCC;'>";
        html += "<iframe style='width:340px; height:525px; border:0;' src='" + url + "'></iframe>";
        html += "</div>";
            
        document.body.innerHTML += html;
    }
    
    return {
        init : function (settings) {
            window.addEventListener("mouseup", function (e) {
                e.preventDefault();

                if (widget())
                {
                    var query = window.getSelection().toString().trim();
                    if (query.length > 1)
                        widget().firstChild.src = buildUrl(settings.language, query);
                }
            }, false);
            
            window.addEventListener("keydown", function (e) {
                e.preventDefault();

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