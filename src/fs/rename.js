import { access, constants, rename as reName } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const rename = async () => {
    const rootPath = dirname(fileURLToPath(import.meta.url));
    const filePath = join(rootPath, 'files', 'wrongFilename.txt');
    const fileNewPath = join(rootPath, 'files', 'properFilename.md');
    try {
        const wrongFileExist = await access(filePath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        const properFileExist = await access(fileNewPath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        if (wrongFileExist && !properFileExist) {
            await reName(filePath, fileNewPath);
            console.log('File rename successfully');
        } else if (properFileExist){
            throw new Error('FS operation failed. properFilename.md is already exist.');
        } else {
            throw new Error('FS operation failed. wrongFilename.txt doesnt exist.');
        }
    } catch (error) {
        console.log(error.message);
    }
   
};

await rename();