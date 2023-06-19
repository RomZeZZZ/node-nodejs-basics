import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const read = async () => {
    const rootPath = dirname(fileURLToPath(import.meta.url));
    const filePath = join(rootPath, 'files', 'fileToRead.txt');
    try {
        await readFile(filePath, { encoding: 'utf8' })
        .then((data) => console.log(data))
        .catch(() => {
            throw new Error(`FS operation failed. Failed to read ${filePath}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

await read();