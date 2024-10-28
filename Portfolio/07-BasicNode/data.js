// data.js
import fs from 'fs';
import path from 'path';


const filePath = path.resolve('data', 'input.txt');


fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log('The secret message is:', data);
});
