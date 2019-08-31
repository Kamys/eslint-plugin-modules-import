"use strict";

module.exports = context => ({
    ImportDeclaration: node => {
        node.specifiers.forEach(specifier => {
            const fileName = context.getFilename();
            const importPath = node.source.value;
            if (specifier.type === 'ImportSpecifier' &&
                specifier.local.type === 'Identifier' &&
                isModule(fileName)) {

                const moduleName = extractModuleName(fileName);
                if (isAbsolutePath(importPath)
                    && extractModuleName(importPath) === moduleName) {
                    context.report(node, 'Use index.js file for import module');
                }
            }
        });
    }
});

const moduleContainers = ['components'];

const isModule = (filePath) => {
    const pathParts = filePath.split('/');
    const hasContainer = moduleContainers.some(container => container === pathParts[1]);
    return pathParts[0] === 'src' && hasContainer;

};

const extractModuleName = (filePath) => {
    const pathParts = filePath.split('/');
    if (pathParts.length >= 3) {
        return pathParts[2]
    }
    throw new Error('Failed get module name. Path not contains three part')
};

const isAbsolutePath = (path) => {
    const firstPart = path.split('/')[0];
    return firstPart === '@';
};

module.exports.schema = [];