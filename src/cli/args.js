import { argv } from 'node:process';
const parseArgs = () => {
    const commandLineArgs = argv.slice(2);
    let argsArray = [];
    commandLineArgs.forEach((item, index) => {
        if (item.startsWith('--')) {
            argsArray.push(`${item.slice(2)} is ${commandLineArgs[index + 1]}`);
        }
    })
    console.log(argsArray.join(', '));
};

parseArgs();