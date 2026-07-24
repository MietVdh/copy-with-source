import browser from "webextension-polyfill";
import {
    MENU_ITEMS,
    CONTEXTS,
    STORAGE_KEYS,
    DEFAULT_OPTIONS,
    MESSAGE_TYPES,
    COMMANDS
} from "../shared/constants";
import retrieveOptions from "../background/storage";


if (DEBUG) console.log("Background script running");


browser.runtime.onInstalled.addListener(() => {
    // Create context menu
    browser.contextMenus.create(
        {
            id: MENU_ITEMS.COPY_HYPERLINK,
            title: "Copy with hyperlink",
            contexts: [CONTEXTS.ALL],
        }
    );
    // Set default options
    browser.storage.sync.set({ [STORAGE_KEYS.OPTIONS]: DEFAULT_OPTIONS });
});


// Listener for context menu
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === MENU_ITEMS.COPY_HYPERLINK) {
        if (DEBUG) console.log("Context menu clicked");
        selectInfoAndSend(info, tab);
    }
});


// Listener for shortcut command
browser.commands.onCommand.addListener( async (command) => {
    if (DEBUG) console.log(command);
    if (DEBUG) console.log("Shortcut used");

    if (command !== COMMANDS.COPY_HYPERLINK) {
        return;
    }

    const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    selectInfoAndSend(null, tab);
});


// Listener for toolbar icon
browser.action.onClicked.addListener((tab) => {
    if (DEBUG) console.log("Toolbar icon clicked");
    // popup.html opens; popup.js runs
});


// const selectInfo = async(info, tab) => {
//     // Get preferences
//     const options = await retrieveOptions();
//     const { useHeading, addDate } = options;

//     const url = tab.url;
//     const title = tab.title;

//     return { url, title, useHeading, addDate };
// }


const selectInfoAndSend = async(info, tab) => {
    // Get preferences
    const options = await retrieveOptions();
    const { useHeading, addDate } = options;

    const url = tab.url;
    const title = tab.title;

    try {

        browser.tabs.sendMessage(tab.id, {
            type: MESSAGE_TYPES.COPY_HYPERLINK,
            url: url,
            title: title,
            addDate: addDate,
            useHeading: useHeading
        });

    } catch (err) {
        console.error(err);
    }
}

// const selectLinkAndSend = async (tab) => {
//     // Get preferences
//     const options = await retrieveOptions();
//     const { useHeading, addDate } = options;

//     const url = tab.url;
//     const title = tab.title;

//     try {
//         browser.tabs.sendMessage(tab.id, {
//             type: MESSAGE_TYPES.COPY_HYPERLINK_ONLY,
//             url: url,
//             title: title,
//             addDate: addDate,
//             useHeading: useHeading
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }
