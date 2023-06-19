import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline as pipelineAsync } from 'stream/promises';
const read = async () => {
    const rootPath = dirname(fileURLToPath(import.meta.url));
    const filePath = join(rootPath, 'files', 'fileToRead.txt');
    const readStream = createReadStream(filePath, 'utf8');
    await pipelineAsync(readStream, process.stdout)
    .catch((error) => {console.log(error)});
};

await read();
