helpful-fs
====

Install
---

`npm install --save helpful-fs`

Usage
---

```javascript
import { read, write } from 'helpful-js';

//read/write text files
async function modify(filename, str){
    const content = await read({
        name: filename
    });

    return write({
        name: filename,
        content: content + str;
    });
}

modify('myfile', '!');

//read/write yaml, or json file
async function setProp(name, prop, str){
    const content = await read({
        name
    });

    content[prop] = str;

    return write({
        name,
        content
    });
}

setProp('name.yaml', 'prop', 'value');
setProp('name.json', 'prop', 'value');

```

All the imports:

```javascript
import {
    read,
    write,
    readFile,
    writeFile,
    makeDir
} from 'helpful-js';
```

### read({name})

Read a text, yaml, or json file. The format returned is utf8, or an object for yaml, or json.

`read()` returns a promise that resolves to the file contents.

### write({name, content})

Write text, or an object to a yaml, or json file.

`write()` returns a promise.

### readFile(name, options)

`readFile()` returns a promise that resolves to the file contents.

### writeFile(name, content, options)

`writeFile()` returns a promise.

### makeDir(name, options)

`makeDir()` is a reference to [make-dir](https://github.com/sindresorhus/make-dir).

About
---

Some helpful functions for working with the file system.
