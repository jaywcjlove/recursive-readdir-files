recursive-readdir-files
---

[![Coverage Status](https://coveralls.io/repos/github/jaywcjlove/recursive-readdir-files/badge.svg?branch=main)](https://coveralls.io/github/jaywcjlove/recursive-readdir-files?branch=main) [![npm version](https://img.shields.io/npm/v/@uiw/react-md-editor.svg)](https://www.npmjs.com/package/@uiw/react-md-editor)

Node.js module to list all files in a directory or any subdirectories.

## Installation

```bash
npm install recursive-readdir-files
```

## Usage

```js
const recursiveReaddirFiles = require("recursive-readdir-files");

recursiveReaddirFiles(process.cwd(), { ignored: /\/(node_modules|\.git)/ })
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
    ignored?: RegExp;
}
```

## Result

```ts
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
export default function recursiveReaddirFiles(rootPath: string, options?: RecursiveReaddirFilesOptions): Promise<IFileDirStat[]>;
/**
 * Get ext
 * @param {String} filePath `/a/b.jpg` => `jpg`
 */
export declare const getExt: (filePath: string) => string;

```

## License

Licensed under the MIT License.
