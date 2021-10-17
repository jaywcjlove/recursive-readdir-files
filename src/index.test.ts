/// <reference types="jest" />

import path from 'path';
import recursiveReaddirFiles from './';

it('ignored test case', async () => {
  const files = await recursiveReaddirFiles(process.cwd(), {
    ignored: /\/(node_modules|coverage|\.git)/
  });
  expect(files.length).toBe(10);
  expect(Object.keys(files[0])).toEqual(['dev', 'mode', 'nlink', 'uid', 'gid', 'rdev', 'blksize', 'ino', 'size', 'blocks', 'atimeMs', 'mtimeMs', 'ctimeMs', 'birthtimeMs', 'atime', 'mtime', 'ctime', 'birthtime', 'name', 'path', 'ext',]);
});

it('ignored/exclude/include test case', async () => {
  const files = await recursiveReaddirFiles(process.cwd(), {
    ignored: /\/(node_modules|coverage|\.git)/,
    exclude: /(\.json)$/,
    include: /(package\.json)$/,
  });
  expect(files.length).toBe(7);
  const arrs = files.filter(item => /package\.json$/.test(item.path)).map(item => item.name);
  expect(arrs[0]).toEqual('package.json');
  const arrs2 = files.filter(item => /renovate\.json$/.test(item.path)).map(item => item.name);
  expect(arrs2.length).toEqual(0);
  expect(Object.keys(files[0])).toEqual(['dev', 'mode', 'nlink', 'uid', 'gid', 'rdev', 'blksize', 'ino', 'size', 'blocks', 'atimeMs', 'mtimeMs', 'ctimeMs', 'birthtimeMs', 'atime', 'mtime', 'ctime', 'birthtime', 'name', 'path', 'ext',]);
});

it('Recursive Readdir Files, options', async () => {
  const files = await recursiveReaddirFiles(path.resolve(process.cwd(), 'lib'));
  expect(files.length).toBe(3);
});

it('Recursive Readdir Files. try catch', async () => {
  try {
    // @ts-ignore
    const files = await recursiveReaddirFiles();
    expect(files.length).toBe(21);
  } catch (error) {
    expect(error.message).toEqual('The "path" argument must be of type string or an instance of Buffer or URL. Received undefined')
  }
});

it('filter options test case', async () => {
  const files = await recursiveReaddirFiles(process.cwd(), {
    ignored: /\/(node_modules|\.git|(coverage))/,
    filter: (item) => /(.md)/.test(item.path)
  });
  expect(files.length).toBe(1);
  expect(files[0].name).toEqual('README.md');
});
