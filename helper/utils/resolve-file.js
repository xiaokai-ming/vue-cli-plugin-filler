const path = require('path')
const fs = require('fs')
module.exports = (api, file) => {
    if (!/\.(j|t)s$/ig.test(file)) {
        file += '.js'
    }
    let resolvedPath = api.resolve(file)
    const possiblePaths = [
        resolvedPath,
        resolvedPath.replace(/\.js$/ig, '.ts'),
        path.join(resolvedPath.replace(/\.js$/ig, ''), 'index.js'),
        path.join(resolvedPath.replace(/\.js$/ig, ''), 'index.ts')
    ]
    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            return path.relative(api.resolve('.'), p).replace(/\\/g, '/')
        }
    }
}