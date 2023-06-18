import { readdir, mkdir, writeFile, access, constants, readFile } from 'fs/promises';
const list = async () => {
    const folderPath = './src/fs/files/';
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