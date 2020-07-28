import { randomBytes } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';

const filePath = '.env'

let fileContent = readFileSync(filePath).toString();

// Generate Secret Key
let key: any = randomBytes(32);
key = key.toString('hex');

// Write Secret Key
fileContent = fileContent.replace(/SECRET_KEY=.*/, `SECRET_KEY=${key}`);
writeFileSync(filePath, fileContent);

console.log(`The New Secret Key is \n\n\t${key}\n`);