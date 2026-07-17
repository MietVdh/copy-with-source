// toolbar, commands, context menu

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
        selectInfoAndSend(info, tab);
    }
});



browser.runtime.onMessage.addListener(async (request) => {
    if (DEBUG) {console.log("Received:", request);}

    if (request.type !== MESSAGE_TYPES.COPY_HYPERLINK) {
        return;
    }

    await copyHyperlink(request);
});


// Listener for shortcut command
browser.commands.onCommand.addListener( async (command) => {
    if (DEBUG) { console.log(command); }

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
    selectInfoAndSend(null, tab);
});



const selectInfoAndSend = async(info, tab) => {
    await retrieveOptions();
    // Get preferences
    if (DEBUG) { console.log(options); }
    const { useHeading, addDate } = options;

    const url = tab.url;
    const title = tab.title;

    // Sending a message
    browser.tabs.sendMessage(tab.id, {
        type: MESSAGE_TYPES.COPY_HYPERLINK,
        url: url,
        title: title,
        addDate: addDate,
        useHeading: useHeading
        });
}
