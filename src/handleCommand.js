import upDir from "./nwd/up.js";
import cd from "./nwd/cd.js";
import list from "./fs/list.js";
import readStream from "./streams/read.js";
import create from "./fs/create.js";
import rename from "./fs/rename.js";
import copyFile from "./streams/copy.js";
import moveFile from "./streams/mv.js";
import remove from "./fs/delete.js";
const handleCommand = async (rlCommand) => {
    try {
        const commandArr = rlCommand.trim().replace(/\s+/g, ' ').split(' '); 
        switch (true) {
            case commandArr[0] === 'up':
                upDir();
                break;
            case commandArr[0] === 'cd':
                if(commandArr.length === 2) cd(commandArr[1])
                else throw new Error();
                break;
            case commandArr[0] === 'ls':
                await list();
                break;
            case commandArr[0] === 'cat':
                if(commandArr.length === 2) await readStream(commandArr[1])
                else throw new Error('Wrong data in arguments');
                break;
            case commandArr[0] === 'add':
                if(commandArr.length === 2) await create(commandArr[1])
                else throw new Error('Wrong data in arguments');
                break;
            case commandArr[0] === 'rn':
                if(commandArr.length === 3) await rename(commandArr[1], commandArr[2])
                else throw new Error('Wrong data in arguments');
                break;
            case commandArr[0] === 'cp':
                if(commandArr.length === 3) await copyFile(commandArr[1], commandArr[2])
                else throw new Error('Wrong data in arguments');
                break;
            case commandArr[0] === 'mv':
                if(commandArr.length === 3) await moveFile(commandArr[1], commandArr[2])
                else throw new Error('Wrong data in arguments');
                break;
            case commandArr[0] === 'rm':
                if(commandArr.length === 2) await remove(commandArr[1])
                else throw new Error('Wrong data in arguments');
                break;
            default:
                throw new Error('Unknown operation'); 
        }
    } catch (error) {
        console.log(error.message);
    }
};
export default handleCommand;