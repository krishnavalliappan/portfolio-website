// lib/getMediaFiles.ts
import fs from 'fs/promises';
import path from 'path';

export async function getMediaFiles() {
  const mediaDirectory = path.join(process.cwd(), 'public', 'pics', 'malu');
  const files = await fs.readdir(mediaDirectory);

  const mediaFiles = files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpeg' || ext === '.jpg' || ext === '.mp4';
    })
    .map((file) => `/pics/malu/${file}`);

  return mediaFiles;
}
