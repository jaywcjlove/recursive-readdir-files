/// <reference types="jest" />

import path from 'path';
import recursiveReaddirFiles from './';

it('Recursive Readdir Files', async () => {
  const files = await recursiveReaddirFiles(process.cwd(), {
    ignored: /\/(node_modules|coverage|\.git)/
  });
  expect(files.length).toBe(10);
  expect(Object.keys(files[0])).toEqual(['name', 'path', 'size', 'ext']);
});

it('Recursive Readdir Files options', async () => {
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
