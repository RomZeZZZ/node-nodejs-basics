import { readFile } from 'fs/promises';
const read = async () => {
    const filePath = './src/fs/files/fileToRead.txt';
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