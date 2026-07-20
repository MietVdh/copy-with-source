
export const getSelectionFragment = () => {
    const selection = window.getSelection();

    const range =
        selection && !selection.isCollapsed
        ? selection.getRangeAt(0)
        : null;

    // Using DocumentFragment to preserve line breaks
    const fragment =
        range
        ? range.cloneContents()
        : document.createElement('p');

    return fragment;
}


export const determineTitle = (useHeading, pageTitle) => {
    const h1 = document.querySelector("h1");
    const title =
        useHeading && h1
        ? h1.innerText
        : pageTitle;
    return title;
}
