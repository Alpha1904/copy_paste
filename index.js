// import funn, * as fun from './function.js';

// // console.log(fun.sum(2,3), funn.s);

// const path = require('node:path');

// console.log(path.resolve(__dirname));

//  const file = path.parse(__filename);
//  console.log(file.dir);

// import path from 'node:path';
// import { fileURLToPath } from 'node:url';

// const __filename = fileURLToPath(import.meta.url);

// console.log(path.basename(__filename));
// // const path = require('node:path'); // This line is commented out and can be removed
// console.log("test");



//  const { readFile, writeFile } = require('fs/promises');

// const first = readFileSync('./content/first.txt', 'utf8');
// const second = readFileSync('./content/second.txt', 'utf8');

// writeFileSync(
//     './content/result-sync.txt',
//     `Here is the result : ${first}, ${second}`,
//     { flag: 'a' }
//     )


// readFile(
//     './content/first.txt',
//     'utf8',
//     (err, result)=>{
//         if(err){
//             console.log(err);
//             return;
//         }
//         readFile(
//             './content/second.txt',
//             'utf8',
//             (err, result)=>{
//                 if(err){
//                     console.log(err);
//                     return;
//                 }
//                 writeFile(
//                     './content/result-async.txt',
//                     `Here is the result : ${result}`,
//                     (err, result)=>{
//                         if(err){
//                             console.log(err);
//                             return;
//                         }
//                         console.log(result);
//                     }
//                 )

//             }
//         )
//     }
// )

//const { readFile, writeFile } = require('fs/promises');


// const fileRead = async ()=>{
//     try{
//         const first = await readFile('./content/first.txt', 'utf8');
//         const second = await readFile('./content/second.txt', 'utf8');
//         const result = await writeFile(
//             './content/result-prom.txt',
//             `Here is the result : ${first}, ${second}`,
//             { flag: 'a' }
//             )
//             console.log(result);
//     }catch(error){
//         console.log(error);
//     }
// };
const { createReadStream, createWriteStream } = require('fs');
const path = require('path');

const readableStream = createReadStream('./content/first.txt', { encoding: 'utf-8' });
const writableStream = createWriteStream('./content/copied.txt');
readableStream.on('data', (chunk) => {
  writableStream.write(chunk);
});

// readableStream.on('end', () => {
//   console.log('Finished reading the file.');
// });

// readableStream.on('error', (err) => {
//   console.error('Error reading the file:', err);
// });


//readableStream.pipe(writableStream);


// const writableStream = createWriteStream('./content/result-stream.txt');