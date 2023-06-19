import { readdir, mkdir, writeFile, access, constants, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
const copy = async () => {
    const rootPath = dirname(fileURLToPath(import.meta.url));
    const folderPath = join(rootPath, 'files');
    const newFolderPath = join(rootPath, 'files_copy');
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
