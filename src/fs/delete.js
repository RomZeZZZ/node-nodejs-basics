import { unlink } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const remove = async () => {
    const rootPath = dirname(fileURLToPath(import.meta.url));
    const filePath = join(rootPath, 'files', 'fileToRemove.txt');
    try {
        await unlink(filePath)
        .then(() => console.log('file delete successfully...'))
        .catch(() => {
            throw new Error(`FS operation failed. Failed to delete ${filePath}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

await remove();