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

## Installation

TODO

## Options

Current options are:
- **Add date**: includes the current date after the hyperlink. Off by default.
- **Use heading when available**: Uses the page's primary heading (\<h1\>) when one is present, instead of the page title (the text shown on the browser tab). On by default.

### Setting Options



## Development

Install dependencies

    npm install

Build

    npm run build

The build script creates separate Chrome and Firefox builds in `dist/`.

### Project Structure

#### background.js
- Handles toolbar, shortcut, and context menu.

#### content.js
- Extracts the current selection.

#### popup.js
- Copies source hyperlink when toolbar icon is clicked.

#### selection.js
- Selection helper functions.

#### clipboard.js
- Builds HTML/markdown clipboard content.
