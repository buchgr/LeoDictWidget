# Leo Dictionary Widget
This extension allows you to select a word or phrase on a website and to look it up in the LEO dictionary by simply pressing a keyboard shortcut. The dictionary pops up conveniently in the upper right corner inside your browser window. It does not open a new tab or window.

The shortcut defaults to Alt+W, however you can set it to virtually any shortcut in the options page. The language defaults to German - English and can also be configured in the options page.

Available languages are: 
English ⇔ German	
French ⇔ German
Spanish ⇔ German
Italian ⇔ German
Chinese ⇔ German
Russian ⇔ German
Portuguese ⇔ German
Polish ⇔ German

For feature requests and bug reports please contact me at bucjac@gmail.com.

** NOTICE **
For existing users the shortcut changed from Alt+Q to Alt+W. I am sorry if this caused you any inconvenience, however it was necessary as the old shortcut caused a lot of trouble for some users.

** NEW IN VERSION 2.0.2 **
- Now also works with Facebook and GMail

** NEW IN VERSION 2.0.4 **
- Apple Mac users can now use the command key as a part of their shortcut

** NEW IN VERSION 2.1 **
- Open the dictionary by selecting a word and right click.

In the Google Chrome Webstore: https://chrome.google.com/webstore/detail/kepemmpmljphklmpfgfmhpjhpdlccpke

# Build
In order to build the TypeScript files execute the following:
```
tsc --out leodictwidget.js leodictwidget.ts contentscript_main.ts
tsc background.ts
```
