# Copy with Source

Copy selected text together with a clickable hyperlink back to the original web page. Optionally include the page heading and the current date, making it easy to keep track of sources for notes, research, and writing.

## Screenshots

TODO

## Features

- Copy selected text with a clickable source link
- Preserves rich text formatting
- Plain text/markdown fallback for text editors
- Optionally use the page heading instead of the page title
- Optionally include the current date
- Works in Chrome and Firefox

## How to Use

#### Toolbar Icon
Clicking the toolbar icon copies a hyperlink to the webpage to the clipboard.

#### Context Menu
Right-clicking and selecting "Copy with source" copies the selected text (if any) and a hyperlink to the webpage to the clipboard.

#### Shortcut
Using the shortcut (Alt + Shift + Q) copies the selected text (if any) and a hyperlink to the webpage to the clipboard.

### Confirmation
When successful, a confirmation message will briefly show, either at the top of the page, by the toolbar icon (if toolbar icon was clicked), or as a toast at the bottom of the page (if context menu or shortcut were used).

## Installation

TODO

## Options

Current options are:
- **Add date**: includes the current date after the hyperlink. Off by default.
- **Use heading when available**: Uses the page's primary heading (\<h1\>) when one is present, instead of the page title (the text shown on the browser tab). On by default.

### Changing Extension Options

#### Chrome

* Right-click the extension's toolbar icon and select **Options**.
* Or open `chrome://extensions`, click **Details** for the extension, then click **Extension options**.

#### Firefox

* Right-click the extension's toolbar icon and select **Manage Extension**, then click **Preferences**.
* Or open `about:addons`, select **Extensions**, find the extension, click the **⋯** (three-dot) menu, and choose **Preferences**.

Any changes you make are saved automatically.


## Development

Install dependencies

    npm install

Build

    npm run build

The build script creates separate Chrome and Firefox builds in `dist/`.

### Project Structure

#### background/background.js
- Handles toolbar, shortcut, and context menu.

#### content/content.js
- Extracts the current selection and copies it to the clipboard (when using context menu or shortcut).

#### content/selection.js
- Selection helper functions.

#### popup/popup.js
- Copies source hyperlink when toolbar icon is clicked.

#### shared/clipboard.js
- Builds HTML/markdown clipboard content.

#### build.js
- Build the `/dist` folder that contains the bundled code
