import browser from "webextension-polyfill";
import { MESSAGE_TYPES } from "../shared/constants";
import { getSelectionFragment, determineTitle } from "./selection";
import { createClipboardHTMLElement, createClipboardMarkdownElement, sendToClipboard } from "../shared/clipboard";
import toast from "./toast";

if (DEBUG) console.log("Content script running");

console.log("Registering message listener");
browser.runtime.onMessage.addListener(
    (request) => {
        if (request.type !== MESSAGE_TYPES.COPY_HYPERLINK) {
            return;
        }

        try {
            return copySelectionAndHyperlink(request);
        } catch (err) {
            console.error(err);
        }

    }
);


browser.runtime.onMessage.addListener(
    (request) => {
        if (request.type !== MESSAGE_TYPES.COPY_HYPERLINK_ONLY) {
            return;
        }
        try {
            return copySelectionAndHyperlink(request);
        } catch (err) {
            console.error(err);
        }
    }
);


const copySelectionAndHyperlink = async (request) => {
    const { url, title, addDate, useHeading } = request;
    const finalTitle = determineTitle(useHeading, title);
    const fragment = getSelectionFragment();
    const siteDomain = window.location.hostname;

    const htmlElement = createClipboardHTMLElement(
        finalTitle,
        url,
        addDate,
        fragment,
        siteDomain);

    const markdownElement = createClipboardMarkdownElement(
        finalTitle,
        url,
        addDate,
        fragment,
        siteDomain);

    try {
        await sendToClipboard(htmlElement, markdownElement);
        showToast("Copied!");
    } catch (err) {
        console.error(err);
        showToast("Couldn't copy");
    }
}


// <a href="https://www.flaticon.com/free-icons/copy-link" title="copy link icons">Copy link icons created by Freepik - Flaticon</a>
