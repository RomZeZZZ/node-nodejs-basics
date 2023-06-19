const transform = async () => {
    process.stdin.on('data', (chunk) => {
        const reversedText = chunk.toString().split('').reverse().join('');
        process.stdout.write(reversedText + '\n');
    });
}
await transform();