recursive-readdir-files
===
<!--rehype:style=display: flex; height: 230px; align-items: center; justify-content: center; font-size: 38px; background: #f6f8fa; border: 0; border-radius: 5px;-->

[![Coverage Status](https://jaywcjlove.github.io/recursive-readdir-files/badges.svg)](https://jaywcjlove.github.io/recursive-readdir-files/lcov-report/)
[![npm version](https://img.shields.io/npm/v/recursive-readdir-files.svg)](https://www.npmjs.com/package/recursive-readdir-files)
[![NPM Download](https://img.shields.io/npm/dm/recursive-readdir-files.svg?style=flat)](https://www.npmjs.com/package/recursive-readdir-files)

Node.js module to list all files in a directory or any subdirectories.

## Installation

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c): Node 12+ is needed to use it and it must be `import` instead of `require`.

```bash
npm install recursive-readdir-files
```

## Usage

```js
import recursiveReaddirFiles from 'recursive-readdir-files';

recursiveReaddirFiles(process.cwd(), {
  ignored: /\/(node_modules|\.git)/
})
.then((files) => {
  // `files` is an array
  console.log(files);
})
.catch((error) => {
  console.error("something exploded", error);
});
```

## Options

```ts
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
```

## Result

```ts
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
export default function recursiveReaddirFiles(rootPath: string, options?: RecursiveReaddirFilesOptions): Promise<IFileDirStat[]>;
export { recursiveReaddirFiles };
/**
 * Get ext
 * @param {String} filePath `/a/b.jpg` => `jpg`
 */
export declare const getExt: (filePath: string) => string;
```

## License

Licensed under the MIT License.