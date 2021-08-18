import fs from 'fs';
import path from 'path';

export interface RecursiveReaddirFilesOptions {
  ignored?: RegExp
}

/**
 * IFileDirStat
 * @param {string} name E.g: `sum.ts`;
 * @param {string} path E.g: `/basic/src/utils/sum.ts`
 * @param {string} outputPath E.g: `/basic/src/utils/sum.js`
 */
 export interface IFileDirStat {
  name: string;
  path: string;
  ext?: string;
  size?: number;
  isDirectory?: boolean;
}

let files: IFileDirStat[] = [];

export default async function recursiveReaddirFiles(rootPath: string, options: RecursiveReaddirFilesOptions = {}): Promise<IFileDirStat[]> {
  const { ignored } = options;
  const filesData = await fs.promises.readdir(rootPath);
  const fileDir: IFileDirStat[] = filesData.map((file) => ({
    name: file,
    path: path.join(rootPath, file),
  })).filter(item => {
    if (ignored && !ignored.test(item.path)) { 
      return true;
    }
    return false;
  });
  
  await Promise.all(
    fileDir.map(async (item: IFileDirStat) => {
      const stat = await fs.promises.stat(item.path);
      item.size = stat.size;
      item.ext = '';
      if (stat.isDirectory()) {
        await recursiveReaddirFiles(item.path, options);
      } else if (stat.isFile()) {
        item.ext = await getExt(item.path);
        files.push(item);
      }
      return item;
    }),
  );
  return files;
}


/**
 * Get ext
 * @param {String} filePath `/a/b.jpg` => `jpg`
 */
 export const getExt = (filePath: string) => path.extname(filePath).replace(/^\./, '').toLowerCase();