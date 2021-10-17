import fs from 'fs';
import path from 'path';

export interface RecursiveReaddirFilesOptions {
  /**
   * Ignore files
   * @example `/\/(node_modules|\.git)/`
   */
  ignored?: RegExp;
  /**
   * Specifies a list of `glob` patterns that match files to be included in compilation. 
   * @example `/(\.json)$/`
   */
  include?: RegExp;
  /**
   * Specifies a list of files to be excluded from compilation.
   * @example `/(package\.json)$/`
   */
  exclude?: RegExp;
  /** Provide filtering methods to filter data. */
  filter?: (item: IFileDirStat) => boolean;
}

 export interface IFileDirStat {
  /**
   * @example `/a/sum.jpg` => `sum.jpg`
   */
  name: string;
  /**
   * @example `/basic/src/utils/sum.ts`
   */
  path: string;
  /**
   * @example `/a/b.jpg` => `jpg`
   */
  ext?: string;
  size?: number;
}

export default function recursiveReaddirFiles(rootPath: string, options: RecursiveReaddirFilesOptions = {}): Promise<IFileDirStat[]> {
  return getFiles(rootPath, options);
}

export { recursiveReaddirFiles };

async function getFiles(rootPath: string, options: RecursiveReaddirFilesOptions = {}, files: IFileDirStat[] = []): Promise<IFileDirStat[]> {
  const { ignored, include, exclude, filter } = options;
  const filesData = await fs.promises.readdir(rootPath);
  const fileDir: IFileDirStat[] = filesData.map((file) => ({
    name: file,
    path: path.join(rootPath, file),
  })).filter(item => {
    if (filter && typeof filter === 'function') {
      return filter(item);
    }
    if (include && include.test(item.path)) {
      return true;
    }
    if (exclude && exclude.test(item.path)) {
      return false
    }
    if (!ignored || !ignored.test(item.path)) { 
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
        const arr = await getFiles(item.path, options);
        files = files.concat(arr);
      } else if (stat.isFile()) {
        item.ext = await getExt(item.path);
        files.push(item);
      }
    }),
  );
  return files;
}


/**
 * Get ext
 * @param {String} filePath `/a/b.jpg` => `jpg`
 */
 export const getExt = (filePath: string) => path.extname(filePath).replace(/^\./, '').toLowerCase();

/** CommonJS default export hack */
if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = Object.assign(module.exports.default, module.exports);
}
