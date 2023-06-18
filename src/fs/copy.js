import { readdir, mkdir, writeFile, access, constants, readFile } from 'fs/promises';
import path from 'path';
const copy = async () => {
    const folderPath = './src/fs/files/';
    const newFolderPath = './src/fs/files_copy/'
    try {
        const files = await readdir(folderPath)
        .then((data) => data)
        .catch(() => { throw new Error('FS operation failed. Required directory is missing') });
        const folderExist = await access(newFolderPath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false })
        if (folderExist) {
            throw new Error('FS operation failed. Folder already exists.');
        } else {
            await mkdir(newFolderPath)
            .catch(() => {
                throw new Error(`FS operation failed. Failed to create new directory`);
            });
            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const fileNewPath = path.join(newFolderPath, file);
                const fileContent = await readFile(filePath)
                .catch(() => {
                    throw new Error(`FS operation failed. Failed to read ${filePath}`);
                });
                await writeFile(fileNewPath, fileContent)
                .catch(() => {
                    throw new Error(`FS operation failed. Failed to write ${fileNewPath}`);
                });
            }
            console.log('Directory and files created successfully.');
        }
    } catch (error) {
        console.log(error.message)
    }
};

await copy();
