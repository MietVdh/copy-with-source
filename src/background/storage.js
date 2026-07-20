import { DEFAULT_OPTIONS, STORAGE_KEYS } from "../shared/constants";
import browser from "webextension-polyfill";

const options = structuredClone(DEFAULT_OPTIONS);

export default async function retrieveOptions() {
    const data = await browser.storage.sync.get(STORAGE_KEYS.OPTIONS);

    Object.assign(
        options,
        DEFAULT_OPTIONS,
        data[STORAGE_KEYS.OPTIONS]
    );

    return options;
}
