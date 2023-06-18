import { access, constants, rename } from 'fs/promises';
const reName = async () => {
    const filePath = './src/fs/files/wrongFilename.txt';
    const fileNewPath = './src/fs/files/properFilename.md';
    try {
        const wrongFileExist = await access(filePath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        const properFileExist = await access(fileNewPath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        if (wrongFileExist && !properFileExist) {
            await rename(filePath, fileNewPath);
        } else if (properFileExist){
            throw new Error('FS operation failed. properFilename.md is already exist.');
        } else {
            throw new Error('FS operation failed. wrongFilename.txt doesnt exist.');
        }
    } catch (error) {
        console.log(error.message);
    }
   
};

await reName();