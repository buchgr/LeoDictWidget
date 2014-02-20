/*
Copyright 2012 Jakob Buchgraber (jakob.buchgraber@tum.de)
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var LeoDictWidget = (function () {
    const DISPLAY_STATUS_HIDDEN = "hidden";
    const DISPLAY_STATUS_VISIBLE = "visible";

    // initialize
    if (!("displayStatus" in sessionStorage)) {
        sessionStorage["displayStatus"] = DISPLAY_STATUS_HIDDEN;
    }
    
    function buildUrl (language, query) {
        sessionStorage["query"] = query;
    
        var url = "http://pda.leo.org/" + language + "/";
        if (query.length > 1)
            url += "#search=" + query
        return url;
    }

    function paintDictionaryWidget (url) {
        if (sessionStorage["displayStatus"] == DISPLAY_STATUS_VISIBLE
            && document.getElementById("leoDictionaryFrame")) {
            document.getElementById("leoDictionaryFrame").src = url;
        } else {
            var html = "<div id='leoDictionary' ";
            html += "style='position:fixed; right:10px; top:10px; width:340px; height:525px; border:0; z-index:2147483647; box-shadow: -5px 5px 5px #CCC;'>";
            html += "<iframe id='leoDictionaryFrame' style='width:340px; height:525px; border:0;' src='"+url+"'></iframe>";
            html += "</div>";
                               
            document.body.innerHTML += html;
            sessionStorage["displayStatus"] = DISPLAY_STATUS_VISIBLE;
        }
    }

    function removeDictionaryWidget() {
        var div = document.getElementById("leoDictionary");
        div.parentNode.removeChild(div);
        sessionStorage["displayStatus"] = DISPLAY_STATUS_HIDDEN;
    }
    
    return {
        init : function (settings) {
            if (sessionStorage["displayStatus"] == DISPLAY_STATUS_VISIBLE) {
                paintDictionaryWidget(buildUrl(settings.language, sessionStorage["query"]));
            }        
        
            // open on double click
            if(settings.openOnDblClick) {
                var clicks = 0;
                
                window.addEventListener("click", function(e) {               
                    clicks++;
                    
                    if (clicks == 1) {
                        setTimeout(function () {
                            if (clicks == 1) {
                                if (sessionStorage["displayStatus"] == DISPLAY_STATUS_VISIBLE) {
                                    removeDictionaryWidget();
                                }
                            } else {
                                // disable the dictionary inside of forms
                                // can't do a return here, as this breaks the listener
                                if (/textarea|select|input/i.test(e.target.nodeName) == false) {
                                    var query = window.getSelection().toString().trim();
                                    if (query.length > 1) {
                                        paintDictionaryWidget(buildUrl(settings.language, query));
                                    }
                                }
                            }
                            // reset
                            clicks = 0;
                        }, 300);
                    }
                }, false);
            // open on shortcut
            } else {
                window.addEventListener("mouseup", function (e) {
                    var query = window.getSelection().toString().trim();
                    
                    // if the dictionary popup is visible and a new word is selected, search for it instantly.
                    if (sessionStorage["displayStatus"] == DISPLAY_STATUS_VISIBLE && query.length > 1) {
                        paintDictionaryWidget(buildUrl(settings.language, query));
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
                        if (sessionStorage["displayStatus"] == DISPLAY_STATUS_HIDDEN) {
                            var query = window.getSelection().toString().trim();
                            var url = buildUrl (settings.language, query);

                            paintDictionaryWidget(url);
                        } else {
                            removeDictionaryWidget();
                        }
                    }
                }, false);
            }
        }
    }
})();

chrome.runtime.sendMessage({"action": 'settings'}, function(settings) {
    LeoDictWidget.init(settings);
});