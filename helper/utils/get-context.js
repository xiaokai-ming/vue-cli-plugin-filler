module.exports = function (fileInfo, api) {
    const j = api.jscodeshift
    const root = j(fileInfo.source)
    return { j, root }
}