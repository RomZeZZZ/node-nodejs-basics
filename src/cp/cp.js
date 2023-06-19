import { spawn } from 'child_process';
const spawnChildProcess = async (args) => {
    const child = spawn('node', ['./src/cp/files/script.js', ...args], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
      });
    
      process.stdin.pipe(child.stdin);
      child.stdout.pipe(process.stdout);
    
      child.on('error', (error) => {
        console.error('Child process error:', error);
      });
    
      child.on('exit', (code) => {
        if (code !== 0) {
          console.error(`Child process exited with code ${code}`);
        }
      });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
