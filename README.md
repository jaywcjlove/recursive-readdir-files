recursive-readdir-files
---

[![Coverage Status](https://coveralls.io/repos/github/jaywcjlove/recursive-readdir-files/badge.svg?branch=main)](https://coveralls.io/github/jaywcjlove/recursive-readdir-files?branch=main) [![npm version](https://img.shields.io/npm/v/recursive-readdir-files.svg)](https://www.npmjs.com/package/recursive-readdir-files)

Node.js module to list all files in a directory or any subdirectories.

## Installation

```bash
npm install recursive-readdir-files
```

## Usage

```js
const recursiveReaddirFiles = require("recursive-readdir-files");

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
}
```

## Result

```ts
export interface IFileDirStat {
  /**
   * E.g: `/a/sum.jpg` => `sum.jpg`;
   */
  name: string;
  /**
   * E.g: `/basic/src/utils/sum.ts`
   */
  path: string;
  /**
   * E.g: `/a/b.jpg` => `jpg`;
   */
  ext?: string;
  size?: number;
}

export default function recursiveReaddirFiles(rootPath: string, options?: RecursiveReaddirFilesOptions): Promise<IFileDirStat[]>;

/**
 * Get ext
 * @param {String} filePath `/a/b.jpg` => `jpg`
 */
export declare const getExt: (filePath: string) => string;
```

## License

Licensed under the MIT License.
