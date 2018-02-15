import yaml from 'js-yaml';
import Promise from 'bluebird';
const readFile = Promise.promisify(require('fs').readFile);
const writeFile = Promise.promisify(require('fs').writeFile);

export { readFile, writeFile };

export function write({
    name = null,
    content = ''
} = {}){

    if(/\.yaml$/.test(name) && typeof content === 'object'){
        return writeYAML({name, content});
    }

    try{
        if(/\.json$/.test(name) && typeof content === 'object'){
            content = JSON.stringify(content, null, 2);
        }
    }catch(e){
        return Promise.resolve(e);
    }

    return writeFile(name, content);
}

export async function read({
    name = null
} = {}){

    if(/\.yaml$/.test(name)){
        return readYAML({name});
    }

    try{
        const contents = await readFile(name, 'utf8');

        if(/\.json/.test(name)){
            return JSON.parse(contents);
        }

        return contents;
    }catch(e){
        return Promise.reject(e);
    }
}

export function writeAll(info = []){
    const done = info.map(info=>{
        return write(info);
    });

    return Promise.all(done);
}

export function readAll(info = []){
    const done = info.map(info=>{
        return read(info);
    });

    return Promise.all(done);
}

export function writeYAML({
    name = null,
    content = {},
    options = {}
} = {}){
    const {safe = true} = options;

    try{
        content = safe
        ? yaml.safeDump(content, options)
        : yaml.dump(content, options);
    }catch(e){
        return Promise.reject(e);
    }

    return writeFile(name, content);
}

export async function readYAML({
    name = null,
    options = {}
} = {}){
    const {safe = true} = options;

    try{
        const content = await readFile(name, 'utf8');
        return safe
        ? yaml.safeLoad(content, options)
        : yaml.load(content, options);
    }catch(e){
        return Promise.reject(e);
    }
}
