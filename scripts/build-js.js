var browserify = require('browserify'),
    licensify = require('licensify'), 
    exorcist = require('exorcist'),
    path = require('path'),
    babelify = require('babelify'),
    prod = process.argv.indexOf('--prod') != -1,
    fast = process.argv.indexOf('--fast') != -1,
    b


if (prod) console.warn('\x1b[36m%s\x1b[0m', 'Building minified js bundle for production... This may take a while... ');

b = browserify(path.resolve(__dirname + '/../src/browser/js/browser.js'), {debug:!fast})

b.plugin(licensify)

b = b.transform(babelify, {presets: ["env"]})

if (prod) b = b.transform('uglifyify', {global: true})

b = b.bundle()

if (!fast) b = b.pipe(exorcist(path.resolve(__dirname + '/../browser/scripts.js.map')))

b.pipe(process.stdout)
