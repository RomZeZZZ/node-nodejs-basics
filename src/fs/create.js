import { appendFile, access, constants } from 'fs/promises';
const create = async () => {
  try {
    const filePath = './src/fs/files/fresh.txt';
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