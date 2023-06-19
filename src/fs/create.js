import { appendFile, access, constants } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const create = async () => {
  try {
    const rootPath = dirname(fileURLToPath(import.meta.url));
    const filePath = join(rootPath, 'files', 'fresh.txt');
    const fileExists = await access(filePath, constants.F_OK)
    .then(() => {
      return true;
    })
    .catch(() => {
      appendFile(filePath, 'I am fresh and young')
      .then(() => {
        console.log('Fresh file created successfully.');
      })
      .catch(() => {
        throw new Error('FS operation failed. Failed to create file');
      });
      return false;
    });
    if (fileExists) {
      throw new Error('FS operation failed. File already exists.');
    }
  } catch (error) {
    console.log(error.message);
  }
};

await create();