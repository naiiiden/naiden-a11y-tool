import { toggleStylesheets } from "../utils/toggle-stylesheets.js";

export function uiControls() {
    document.getElementById('toggle-stylesheets').addEventListener('change', () => {
        const disable = document.getElementById('toggle-stylesheets').checked;
        chrome.devtools.inspectedWindow.eval(
          `(${toggleStylesheets.toString()})(${disable});`
        );
    });
}