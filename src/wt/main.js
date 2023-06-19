import os from 'os';
import { Worker } from 'worker_threads'
const performCalculations = async () => {
    let n = 10;
    const workerPromises = [];
    const systemCores = os.cpus().length;
    for (let index = 0; index < systemCores; index++) {
        const worker = new Worker('./src/wt/worker.js', {
            workerData: n++,
        });
        const promise = new Promise((resolve, reject) => {
            worker.on('message', (message) => {
                resolve({ status: 'resolved', data: message });
            });
    
             worker.on('error', () => {
                reject({ status: 'reject', data: null });
            });
        });
        workerPromises.push(promise);
    }
    try {
        const results = await Promise.all(workerPromises);
        console.log(results);
    } catch (error) {
        console.error(error.message);
    }
};

await performCalculations();