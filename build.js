const rollup = require('rollup');

// see below for details on the options
const inputOptions = {};
const outputOptions = {};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup({
      input: 'src.js'
  });

  //console.log(bundle.imports); // an array of external dependencies
  //console.log(bundle.exports); // an array of names exported by the entry point
  //console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap
  //const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write({
      file: './index.js',
      format: 'cjs'
  });
}

build();
/*
const rollup = require('rollup');

const watchOptions = ;

const watcher = rollup.rollup({
    input: 'src.js',
    output: {
        file: './index.js',
        format: 'cjs'
    }
});

watcher.on('event', event => {
  // event.code can be one of:
  //   START        — the watcher is (re)starting
  //   BUNDLE_START — building an individual bundle
  //   BUNDLE_END   — finished building a bundle
  //   END          — finished building all bundles
  //   ERROR        — encountered an error while bundling
  //   FATAL        — encountered an unrecoverable error
  if(['ERROR', 'FATAL'].indexOf(event.code)){
      console.error(event.error);
  }
});

// stop watching
//watcher.close();
*/
