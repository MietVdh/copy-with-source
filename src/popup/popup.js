import browser from "webextension-polyfill";
import { CLIPBOARD_TYPES, MESSAGE_TYPES } from "../shared/constants";
import retrieveOptions from "../background/storage";
import { STORAGE_KEYS } from "../shared/constants";
import { determineTitle } from "../content/selection";
import { buildLinkHtml, buildLinkMarkdown } from "../shared/clipboard";
const status = document.getElementById("status");


const copyLinkToClipboard = async () => {
    try {
        const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
        });

        const options = await retrieveOptions();

        const title = determineTitle(options.useHeading, tab.title);

        const html = buildLinkHtml(title, tab.url, options.addDate);
        const markdown = buildLinkMarkdown(title, tab.url, options.addDate);

        if (DEBUG) console.log(document.hasFocus());

        await navigator.clipboard.write([
            new ClipboardItem({
                [CLIPBOARD_TYPES.HTML]: new Blob(
                    [html],
                    { type: [CLIPBOARD_TYPES.HTML] }
                ),
                [CLIPBOARD_TYPES.PLAIN_TEXT]: new Blob(
                    [markdown],
                    { type: [CLIPBOARD_TYPES.PLAIN_TEXT] }
                )
            })
        ]);

        if (tab) status.textContent = "Copied!";
        setTimeout(() => window.close(), 1200);

    } catch (err) {
        console.error(err);
    }
}


window.addEventListener("DOMContentLoaded", async () => {
    if (!document.hasFocus()) {
        await new Promise(resolve => {
            window.addEventListener("focus", resolve, { once: true });
        });
    }

    await copyLinkToClipboard();
});
