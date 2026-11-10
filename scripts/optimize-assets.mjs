import sharp from 'sharp';
import {readdir} from 'node:fs/promises';
for(const name of await readdir('public/images')){
 if(name.endsWith('.png')) await sharp(`public/images/${name}`).webp({quality:86}).toFile(`public/images/${name.replace('.png','.webp')}`);
}
