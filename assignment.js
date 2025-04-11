const fs = require("fs");
const path = require("path");

function copyFileStream (source, dest) {
    if (!fs.existsSync(source)){
        throw error ("file not exist")
    }
    
    const dir = path.dirname(dest);
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive : true})
    }
    
    const file =  fs.createReadStream(source)
    const newFile = fs.createWriteStream(dest)


    file.on('error', (err) => {
        console.error(`Error reading the file: ${err.message}`);
    });
    newFile.on('error', (err) => {
        console.error(`Error writing the file: ${err.message}`);
    });
    newFile.on('finish', () => {
        console.log('File copied successfully');
    });

     file.pipe(newFile);
     

};

const copyFolder = (source, dest) => {
    if (!fs.existsSync(source)){
        throw error ("folder not exist")
    }

    !fs.existsSync(dest) && fs.mkdirSync(dest, {recursive : true})

    const files = fs.readdirSync(source);
    
    for (const file of files){
        const sourcePath = path.join(source, file);
        const destPath = path.join(dest, file);
        fs.statSync(sourcePath).isDirectory() ? copyFolder(sourcePath, destPath) : copyFileStream(sourcePath, destPath);
    }

};

async function moveFolder(source, destination) {
    try {
      await copyFolder(source, destination);
      fs.rmSync(source, { recursive: true, force: true });
  
      console.log(`✅ Dossier déplacé avec succès de ${source} vers ${destination}`);
    } catch (err) {
      console.error('❌ Erreur lors du déplacement:', err.message);
    }
  }

moveFolder("./content", "./Folder/content")