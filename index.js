//--------------- fs/promises ----------------


// const { createReadStream, createWriteStream } = require('fs');
// const path = require('path');

// const first = path.dirname(__filename);
// console.log(first);


// const readableStream = createReadStream('./content/first.txt', { encoding: 'utf-8' });
// const writableStream = createWriteStream('./content/copied.txt');
// readableStream.on('data', (chunk) => {
//   writableStream.write(chunk);
// });

// readableStream.on('end', () => {
//   console.log('Finished reading the file.');
// });

// readableStream.on('error', (err) => {
//   console.error('Error reading the file:', err);
// });


//readableStream.pipe(writableStream);


// const writableStream = createWriteStream('./content/result-stream.txt');












// const http = require('http');


// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello, World!');
// });


// server.listen(3333, () => {
//   console.log('Server running at http://localhost:3333');
// });











const fs = require('fs');
const path = require('path');

const create = ()=>{
  !fs.existsSync("./newFolder/subFolder") && fs.mkdir("./newFolder/subFolder", { recursive:true }, (err)=>{
    if(err) throw err;
    console.log("create folder sucess")
  })
}

const del = ()=>{
  fs.existsSync("./noName/subFolder") && fs.rmdir("./noName/subFolder",(err) => {
    if (err) throw err;
    console.log("dossier supprimé avec succès");
});
}

const edit = ()=>{
  fs.existsSync("./noName") && fs.rename("./noNames/",(err) => {
    if (err) throw err;
    console.log("Edit folder sucess");
  });
};


const move = ()=>{
  fs.existsSync("./newFolder") && fs.rename("./newFolder/subFolder","./noName/subFolder",(err) => {
    if (err) throw err;
    console.log("Edit folder sucess");
  });
};

const read = (folderPath)=>{
  fs.readdir(folderPath, {withFileTypes:true}, (err, data) => {
  if (err) throw err;

  for (const el of data){
    if (el.isDirectory()) { 
      console.log("This a folder", el.name)
      read(path.join(folderPath, el.name))
    } else {
      console.log("This a file", el.name)
    }
  }
})
}
move();
//read("./newFolder");

// fs.writeFile("newFolder/demo.txt", "Just for fun purpose", { flag: 'a' }, (err) => {
//   if (err) throw err;
//    });

//    fs.appendFile("newFolder/demo.txt", " ertha3h 35h qh  54hy4qa5h  5h", {encoding : 'utf8'}, (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });
//   fs.appendFileSync