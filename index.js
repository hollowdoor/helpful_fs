'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var yaml = _interopDefault(require('js-yaml'));
var Promise = _interopDefault(require('bluebird'));
var makeDir = _interopDefault(require('make-dir'));

const readFile = Promise.promisify(require('fs').readFile);
const writeFile = Promise.promisify(require('fs').writeFile);

function write({
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

function writeAll(info = []){
    const done = info.map(info=>{
        return write(info);
    });

    return Promise.all(done);
}

async function read({
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

function readAll(info = []){
    const done = info.map(info=>{
        return read(info);
    });

    return Promise.all(done);
}

function writeYAML({
    name = null,
    content = {},
    options = {}
} = {}){
    const {safe = true} = options;
    content = safe
    ? yaml.safeDump(content, options)
    : yaml.dump(content, options);

    return writeFile(name, content);
}

async function readYAML({
    name = null,
    options = {}
} = {}){
    const {safe = true} = options;
    const content = await readFile(name, 'utf8');
    return safe
    ? yaml.safeLoad(content, options)
    : yaml.load(content, options);
}

exports.makeDir = makeDir;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.write = write;
exports.writeAll = writeAll;
exports.read = read;
exports.readAll = readAll;
exports.writeYAML = writeYAML;
exports.readYAML = readYAML;
