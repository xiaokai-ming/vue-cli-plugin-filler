const addImport = require('./utils/add-import')
const getContext = require('./utils/get-context')
const resolveFile = require('./utils/resolve-file')

function PluginHelper(api, options) {
    // makesure cli version
    api.assertCliVersion('>= 4.2.3')
    this._api = api
    this._options = options
}


PluginHelper.prototype.extendPackage = function (pkg, options) {
    if (typeof pkg === 'function') {
        pkg = pkg(this._api, this._options)
    }
    this._api.extendPackage(pkg, options)
    return this
}

PluginHelper.prototype.hasPlugin = function (plugin) {
    return this._api.hasPlugin(plugin)
}

PluginHelper.prototype.case = function (condition, handler) {
    if (typeof pkg === 'function') {
        condition = condition(this._api, this._options)
    }
    if (condition) {
        handler && handler(this)
    }

    return this
}

PluginHelper.prototype.addImport = function (file, specifier, source) {
    if (this._api && this._api.transformScript) {
        this._api.transformScript(resolveFile(this._api, file), function (fileInfo, api) {
            let context = getContext(fileInfo, api)
            addImport(context, specifier, source)
            return context.root.toSource({ lineTerminator: '\n' })
        })
    }

    return this
}

module.exports = PluginHelper
