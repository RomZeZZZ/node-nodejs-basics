import { readdir, access, constants } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const list = async () => {
    const rootPath = dirname(fileURLToPath(import.meta.url));
    const folderPath = join(rootPath, 'files');
    try {
        const folderExist = await access(folderPath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        const files = await readdir(folderPath)
        .then((data) => data)
        .catch(() => { throw new Error('FS operation failed. Required directory is missing') });
        if (folderExist) {
            files.length === 0 ? console.log('Folder is empty') : files.forEach(item => console.log(item));
        } else {
            throw new Error('FS operation failed. Folder doesnt exist.');
        }
    } catch (error) {
        console.log(error.message)
    }
};

await list();