import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const calculateHash = async () => {
    try {
        const rootPath = dirname(fileURLToPath(import.meta.url));
        const filePath = join(rootPath, 'files', 'fileToCalculateHashFor.txt');
        const fileData = await readFile(filePath)
            .then((data) => data)
            .catch(() => {
                throw new Error(`FS operation failed. Failed to read ${filePath}`);
            });
        const hash = createHash('sha256');
        hash.update(fileData);
        const hashHex = hash.digest('hex');
        console.log(`SHA256 Hash: ${hashHex}`);
    } catch (error) {
        console.log(error.message);
    }
};

await calculateHash();