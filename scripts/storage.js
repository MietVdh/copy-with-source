// retrieveOptions(), default options

const options = structuredClone(DEFAULT_OPTIONS);

async function retrieveOptions() {
    const data = await browser.storage.sync.get(STORAGE_KEYS.OPTIONS);

    Object.assign(
        options,
        DEFAULT_OPTIONS,
        data[STORAGE_KEYS.OPTIONS]
    );

    return options;
}
