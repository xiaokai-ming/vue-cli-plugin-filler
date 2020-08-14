module.exports = function (context, specifier, source) {
    const { j, root } = context

    if (specifier) {

        const isDefaultImport = typeof specifier === 'string'
        const localName = isDefaultImport
            ? specifier
            : specifier.local || specifier.imported

        const duplicate = root.find(j.ImportDeclaration, {
            specifiers: arr => arr.some(s => s.local.name === localName),
            source: {
                value: source
            }
        })


        if (duplicate.length) {
            return
        }

        let newImportSpecifier
        if (isDefaultImport) {
            newImportSpecifier = j.importDefaultSpecifier(j.identifier(specifier))
        } else {

            newImportSpecifier = j.importSpecifier(
                j.identifier(specifier.imported),
                j.identifier(specifier.local || specifier.imported)
            )
        }

        const matchedDecl = root.find(j.ImportDeclaration, {
            source: {
                value: source
            }
        })

        if (matchedDecl.length) {
            matchedDecl.get(0).node.specifiers.push(newImportSpecifier)
        } else {
            const newImportDecl = j.importDeclaration(
                [newImportSpecifier],
                j.stringLiteral(source)
            )

            const lastImportDecl = root.find(j.ImportDeclaration).at(-1)
            if (lastImportDecl.length) {
                lastImportDecl.insertAfter(newImportDecl)
            } else {
                root.get().node.program.body.unshift(newImportDecl)
            }
        }
    } else {
        const matchedDecl = root.find(j.ImportDeclaration, {
            source: {
                value: source
            }
        })
        if (!matchedDecl.length) {

            const newImportDecl = j.importDeclaration(
                [],
                j.stringLiteral(source)
            )

            const lastImportDecl = root.find(j.ImportDeclaration).at(-1)
            if (lastImportDecl.length) {
                lastImportDecl.insertAfter(newImportDecl)
            } else {
                root.get().node.program.body.unshift(newImportDecl)
            }
        }
    }

    return root
}