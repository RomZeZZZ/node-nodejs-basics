import { createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const write = async () => {
    const rootPath = dirname(fileURLToPath(import.meta.url));
    const filePath = join(rootPath, 'files', 'fileToWrite.txt');
    const writeStream = createWriteStream(filePath);
    process.stdin.pipe(writeStream);
};

await write();