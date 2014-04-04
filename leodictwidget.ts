module org.leo.dict {
    export interface Settings {
        language: string;
        shortcutSpecialKey: string;
        shortcutKey: string;
    }

    export class Widget {
        private moving: boolean;
        private offX: number;
        private offY: number;

        private settings: Settings;

        constructor(settings: Settings, private widgetID: string = "__$$leodictwidget$$__") {
            this.moving = false;
            this.settings = settings;
            
            window.addEventListener("mouseup", (e: MouseEvent) => {
                if (this.widget()) {
                    if (this.moving) {
                        window.removeEventListener("mousemove", this.widgetMove.bind(this), true);
                        this.moving = false;
                    }

                    var query = window.getSelection().toString().trim();
                    if (query.length > 1)
                        (<HTMLIFrameElement>(this.widget().childNodes[1])).src = this.buildUrl(query);
                }
            }, false);

            window.addEventListener("keydown", (e: KeyboardEvent) => {
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

                if (specialKeyPressed && e.keyCode == parseInt(settings.shortcutKey, 10)) {
                    if (this.widget()) {
                        this.hide();
                    } else {
                        var query = window.getSelection().toString().trim();
                        this.show(this.buildUrl(query));
                    }
                }
            }, false);
        }

        private widget(): HTMLElement {
            return document.getElementById(this.widgetID);
        }

        private hide(e?: Event): void {
            if (typeof e !== "undefined") {
                e.preventDefault();
            }
            
            if (this.widget()) {
                this.widget().parentNode.removeChild(this.widget());
            }
        }

        private initWidgetMove(e: MouseEvent): void {
            this.moving = true;
            this.offX = e.clientX - this.widget().offsetLeft;
            this.offY = e.clientY - this.widget().offsetTop;

            window.addEventListener("mousemove", (e: MouseEvent) => { this.widgetMove(e); }, true);
        }

        private widgetMove(e: MouseEvent): void {
            this.widget().style.left = (e.clientX - this.offX) + "px";
            this.widget().style.top = (e.clientY - this.offY) + "px";
        }

        public buildUrl(query: string): string {
            var url = "https://pda.leo.org/" + this.settings.language + "/";
            if (query.length > 1)
                url += "#search=" + encodeURIComponent(query);
            return url;
        }

        public show(url: string): void {
            if (this.widget()) {
                return;
            }

            var tmpwidget = document.createElement('div');
            tmpwidget.setAttribute('id', this.widgetID);
            tmpwidget.setAttribute('style', 'position:fixed; right:10px; top:10px; width:340px; height:520px; border:0; z-index:2147483647; box-shadow: -5px 5px 5px #CCC;');

            var html = "<div style='width:100%; height: 20px; background-color:rgb(66, 185, 66); text-align:right; cursor: pointer; -webkit-touch-callout: none; -webkit-user-select: none;";
            html += "user-select: none; font-family: Arial, Verdana, sans-serif;padding:0;'>";
            html += "<div style='float:right; background:#605F61; display:block; height:100%; padding: 0 3px; margin:0;line-height:0px;text-align:center;'>";
            html += "<a style='text-decoration:none;color:#fff; display:block; font-size:25px; font-weight:bold; margin-top:8px;' href='#'>x</a></div></div>";
            html += "<iframe style='width:100%; height:500px; border:0;' src='" + url + "'></iframe>";
            html += "</div>";
            tmpwidget.innerHTML = html;

            document.body.appendChild(tmpwidget);

            var dragborder = this.widget().childNodes[0];
            dragborder.addEventListener("mousedown", this.initWidgetMove.bind(this), false);

            var hidebtn = this.widget().getElementsByTagName("a")[0];
            hidebtn.addEventListener("click", (e: MouseEvent) => { this.hide(e); }, false);
        }
    }
}