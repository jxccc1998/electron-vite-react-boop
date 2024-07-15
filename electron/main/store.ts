import Store from 'electron-store';

const configStore = new Store()

function getCustomizeDir(key: string) {
    return configStore.get(key);
}

function setCustomizeDir(key: string, value: any) {
    configStore.set(key, value);
}

function hasCustomizeDir(key: string) {
    return configStore.has(key);
}

export {
    getCustomizeDir,
    setCustomizeDir,
    hasCustomizeDir,
}