const fs = require('../');
const assert = require('assert');

describe('read/write', ()=>{
    it('should read', async ()=>{
        let contents = await fs.read({
            name: 'test/textfile'
        });

        assert.equal(contents, 'text\n');
    });

    it('should write', async ()=>{
        await fs.write({
            name: 'test/written',
            content: 'text'
        });

        const contents = await fs.readFile('test/written', 'utf8');

        assert.equal(contents, 'text');
    });
});

describe('read/write yaml', ()=>{
    it('should read', async ()=>{
        const contents = await fs.read({name:'test/yamlfile.yaml'});
        assert.deepEqual(contents, {
            prop: 'prop'
        });
    });

    it('should write', async ()=>{
        await fs.write({
            name:'test/written.yaml',
            content: {
                prop: 'prop'
            }
        });

        const contents = await fs.read({
            name: 'test/written.yaml'
        });

        assert.deepEqual(contents, {
            prop: 'prop'
        });
    });
});
