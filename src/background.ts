import { browser } from "webextension-polyfill-ts";
import { ConfigProvider } from "./config";

async function ddevifyCurrentTab() {
    try {
        // add a dummy div element to indicate that ddevify.bundle.js was injected by a user click on the gitpod icon
        browser.tabs.executeScript({ code: "document.body.innerHTML += '<div style=\"display: none;\" id=\"ddev-extension-icon-clicked\"></div>'" })
        browser.tabs.executeScript({ file: "/dist/bundles/ddevify.bundle.js" });
    } catch {
        try {
            const configProvider = await ConfigProvider.create();
            const config = configProvider.getConfig();
            window.open(config.gitpodURL);
        } catch {
            window.open("https://gitpod.io");
        }
    }
}

browser.browserAction.onClicked.addListener(ddevifyCurrentTab)

browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        window.open("https://www.gitpod.io/extension-activation/");
    }
});
browser.runtime.setUninstallURL("https://www.gitpod.io/extension-uninstall/");
