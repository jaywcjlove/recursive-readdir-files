/// <reference types="jest" />

import path from 'path';
import recursiveReaddirFiles from './';

it('ignored test case', async () => {
  const files = await recursiveReaddirFiles(process.cwd(), {
    ignored: /\/(node_modules|coverage|\.git|\.husky)/,
  });
  expect(files.length).toBe(12);
  expect(Object.keys(files[0])).toEqual([
    'dev',
    'mode',
    'nlink',
    'uid',
    'gid',
    'rdev',
    'blksize',
    'ino',
    'size',
    'blocks',
    'atimeMs',
    'mtimeMs',
    'ctimeMs',
    'birthtimeMs',
    'atime',
    'mtime',
    'ctime',
    'birthtime',
    'name',
    'path',
    'ext',
  ]);
});

it('ignored/exclude/include test case', async () => {
  const files = await recursiveReaddirFiles(process.cwd(), {
    ignored: /\/(node_modules|coverage|\.git|\.husky)/,
    exclude: /(\.json)$/,
    include: /(package\.json)$/,
  });
  expect(files.length).toBe(9);
  const arrs = files.filter((item) => /package\.json$/.test(item.path)).map((item) => item.name);
  expect(arrs[0]).toEqual('package.json');
  const arrs2 = files.filter((item) => /renovate\.json$/.test(item.path)).map((item) => item.name);
  expect(arrs2.length).toEqual(0);
  expect(Object.keys(files[0])).toEqual([
    'dev',
    'mode',
    'nlink',
    'uid',
    'gid',
    'rdev',
    'blksize',
    'ino',
    'size',
    'blocks',
    'atimeMs',
    'mtimeMs',
    'ctimeMs',
    'birthtimeMs',
    'atime',
    'mtime',
    'ctime',
    'birthtime',
    'name',
    'path',
    'ext',
  ]);
});

it('Recursive Readdir Files, options', async () => {
  const files = await recursiveReaddirFiles(path.resolve(process.cwd(), 'lib'));
  expect(files.length).toBe(3);
});

it('Recursive Readdir Files, callback', async () => {
  const files = await recursiveReaddirFiles(path.resolve(process.cwd(), 'lib'), {}, (file, stat) => {
    // console.log(stat)
    expect(/(ts|js|js.map)$/.test(file)).toBeTruthy();
    expect(Object.keys(stat)).toEqual([
      'dev',
      'mode',
      'nlink',
      'uid',
      'gid',
      'rdev',
      'blksize',
      'ino',
      'size',
      'blocks',
      'atimeMs',
      'mtimeMs',
      'ctimeMs',
      'birthtimeMs',
      'atime',
      'mtime',
      'ctime',
      'birthtime',
      'ext',
      'name',
      'path',
    ]);
  });
  expect(files.length).toBe(0);
});

it('Recursive Readdir Files, callback', async () => {
  const files = await recursiveReaddirFiles(
    process.cwd(),
    {
      ignored: /\/(node_modules|coverage|\.git|\.husky)/,
      exclude: /(\.json)$/,
      include: /(package\.json)$/,
    },
    (file, stat, childs) => {
      expect(typeof stat.isFile === 'function').toBeTruthy();
      expect(typeof stat.isDirectory === 'function').toBeTruthy();
      expect(Array.isArray(childs)).toBeTruthy();
      if (stat.isDirectory() && file.endsWith('src')) {
        expect(childs.length).toEqual(2);
      }
    },
  );
  expect(files.length).toBe(0);
});

it('Recursive Readdir Files. try catch', async () => {
  try {
    // @ts-ignore
    const files = await recursiveReaddirFiles();
    expect(files.length).toBe(21);
  } catch (error) {
    expect(error.message).toEqual(
      'The "path" argument must be of type string or an instance of Buffer or URL. Received undefined',
    );
  }
});

it('filter options test case', async () => {
  const files = await recursiveReaddirFiles(process.cwd(), {
    ignored: /\/(node_modules|\.git|(coverage))/,
    filter: (item) => /(.md)/.test(item.path),
  });
  expect(files.length).toBe(1);
  expect(files[0].name).toEqual('README.md');
});
