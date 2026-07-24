import { CLIPBOARD_TYPES } from "./constants";
import { determineTitle } from "../content/selection";


export function buildLinkHtml(title, url, addDate) {

    const span = document.createElement("span");
    const a = document.createElement("a");

    a.href = url;
    a.textContent = title;

    span.append(a);

    if (addDate) {
        const date = new Date().toDateString();
        span.append(` - ${date}`);
    }

    return span.outerHTML;
}


export function buildLinkMarkdown(title, url, addDate) {

    let text = `[${escapeMarkdown(title)}](${url})`;
    if (addDate) {
        const date = new Date().toDateString();
        text = `${text} - ${date}`;
    }
    text = text + '\n';
    return text;
}

/*
export function buildPlainText(tab, options) {
    const title = determineTitle(options.useHeading, tab.title);
    let text = `${tab.title}\n${tab.url}`;
    if (options.addDate) {
        const date = new Date().toDateString();
        text.append(`\n${date}`);
    }
    return text;
    return text;
}
*/


function escapeMarkdown(text) {
    return text.replace(/([\\`*_[\]{}()#+.!-])/g, "\\$1");
}


export const createClipboardHTMLElement = (title, url, addDate, fragment, hostname) => {
    const fragmentCopy = fragment.cloneNode(true);

    const div = document.createElement('div');
    const linkEl = document.createElement('p');
    const a = document.createElement("a");

    a.href = url;
    a.textContent = title;

    // Add space and hyphen between selection and source
    linkEl.append(' - ');
    linkEl.append(a);

    // Add domain name of website
    linkEl.append(` - ${hostname}`);

    // Add date
    if (addDate) {
        const date = new Date().toLocaleDateString();
        linkEl.append(` - ${date}`);
    }

    fragmentCopy.append(linkEl);
    div.append(fragmentCopy);

    return div.outerHTML;
}


export const createClipboardMarkdownElement = (title, url, addDate, fragment, hostname) => {
    const div = document.createElement('div');
    div.append(fragment);
    let text = div.innerText;
    text = `${text}\n- ${buildLinkMarkdown(title, url, addDate)}`;
    return text;
}


export const sendToClipboard = async(htmlElement, markdownElement) => {

    const html = htmlElement;
    const text = markdownElement;

    const item = new ClipboardItem({
        [CLIPBOARD_TYPES.HTML]: new Blob(
            [html],
            { type: CLIPBOARD_TYPES.HTML }
        ),
        [CLIPBOARD_TYPES.PLAIN_TEXT]: new Blob(
            [text],
            { type: CLIPBOARD_TYPES.PLAIN_TEXT }
        )
    });

    try {
        navigator.clipboard.write([item]);
    } catch (err) {
        console.error(err);
    }
}
