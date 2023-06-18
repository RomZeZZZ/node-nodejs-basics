import { unlink } from 'fs/promises';
const remove = async () => {
    const filePath = './src/fs/files/fileToRemove.txt';
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