// receives messages

if (DEBUG) console.log("Content script running");

browser.runtime.onMessage.addListener(
    (request) => {
        if (request.type === MESSAGE_TYPES.COPY_HYPERLINK) {
            return copyHyperlink(request);
        }
    }
);


const copyHyperlink = async (request) => {
    const { url, title, addDate, useHeading } = request;
    const finalTitle = determineTitle(useHeading, title);
    const fragment = getSelectionFragment();
    const siteDomain = window.location.hostname;

    if (DEBUG) {
        console.log("Use heading: ", useHeading);
        console.log("Add date: ", addDate);
        console.log("Fragment: ");
        console.log(fragment);
        console.log("hostname: ", siteDomain);
    }

    const element = createClipboardElement(
        finalTitle,
        url,
        addDate,
        fragment,
        siteDomain);

    await sendToClipboard(element);
}


// <a href="https://www.flaticon.com/free-icons/copy-link" title="copy link icons">Copy link icons created by Freepik - Flaticon</a>
