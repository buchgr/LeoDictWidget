// SAMPLE
this.manifest = {
    "name": "My Extension",
    "icon": "icon.png",
    "settings": [
        {
            "tab": i18n.get("general"),
            "group": i18n.get("language"),
            "name": "language",
            "type": "popupButton",
            "label": i18n.get("language"),
            "options" : {
                "values" : [
                    {
                        "value" : "englisch-deutsch",
                        "text" : i18n.get("english-german")
                    },
                    {
                        "value" : "französisch-deutsch",
                        "text" : i18n.get("french-german")
                    },
                    {
                        "value" : "spanisch-deutsch",
                        "text" : i18n.get("spanish-german")
                    },
                    {
                        "value" : "italienisch-deutsch",
                        "text" : i18n.get("italian-german")
                    },
                    {
                        "value" : "chinesisch-deutsch",
                        "text" : i18n.get("chinese-german")
                    },
                    {
                        "value" : "russisch-deutsch",
                        "text" : i18n.get("russian-german")
                    },
                    {
                        "value" : "portugiesisch-deutsch",
                        "text" : i18n.get("portuguese-german")
                    },
                    {
                        "value" : "polnisch-deutsch",
                        "text" : i18n.get("polish-german")
                    }
                ]
            }
        },

        {
            "tab": i18n.get("general"),
            "group": i18n.get("shortcut"),
            "name": "shortcutSpecialKey",
            "type": "popupButton",
            "label": i18n.get("special-key"),
            "options" : {
                "values" : [
                    {
                        "value" : "alt",
                        "text" : i18n.get("alt-key")
                    },
                    {
                        "value" : "shift",
                        "text" : i18n.get("shift-key")
                    },
                    {
                        "value" : "ctrl",
                        "text" : i18n.get("ctrl-key")
                    },
                    {
                        "value" : "cmd-key",
                        "text" : i18n.get("cmd-key")
                    }
                ]
            }
        },
        {
            "tab": i18n.get("general"),
            "group": i18n.get("shortcut"),
            "name": "shortcutKey",
            "type": "popupButton",
            "label": i18n.get("key"),
            "options" : [
                [65, "A"],
                [66, "B"],
                [67, "C"],
                [68, "D"],
                [69, "E"],
                [70, "F"],
                [71, "G"],
                [72, "H"],
                [73, "I"],
                [74, "J"],
                [75, "K"],
                [76, "L"],
                [77, "M"],
                [78, "N"],
                [79, "O"],
                [80, "P"],
                [81, "Q"],
                [82, "R"],
                [83, "S"],
                [84, "T"],
                [85, "U"],
                [86, "V"],
                [87, "W"],
                [88, "X"],
                [89, "Y"],
                [90, "Z"]
            ]
        },
        {
            "tab": i18n.get("general"),
            "group": i18n.get("shortcut"),
            "name": "shortcutDescription",
            "type": "description",
            "text": i18n.get("shortcut-description")
        }
    ]
};
