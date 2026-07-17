// buildClipboardHtml(), sendToClipboard()

const createClipboardElement = (title, url, addDate, fragment, hostname) => {
    const fragmentCopy = fragment.cloneNode(true);

    const div = document.createElement('div');

    const elType =
        fragment.children.length > 1
            ? "p"
            : "span";

    const linkEl = document.createElement(elType);

    const a = document.createElement("a");

    a.href = url;
    a.textContent = title;

    // Add space and hyphen between selection and source

    linkEl.append(" - ");
    linkEl.append(a);

    // Add domain name of website
    linkEl.append(` - ${hostname}`);

    // Add date
    if (addDate) {
        const date = new Date().toLocaleDateString();
        linkEl.append(` - ${date}`);
    }

    fragmentCopy.append(linkEl);

    // Add extra line break at the end by wrapping span in <p> element
    if (elType === 'span') {
        const p = document.createElement('p');
        p.append(fragmentCopy);
        div.append(p);
    } else {
        div.append(fragmentCopy);
    }

    if (DEBUG) { console.log(div); }

    return div;
}


const sendToClipboard = async(element) => {

    const html = element.outerHTML;
    const text = element.innerText;

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


    await navigator.clipboard.write([item]);
}
