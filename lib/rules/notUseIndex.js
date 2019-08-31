"use strict";

module.exports = context => ({
    ImportDeclaration: node => {
        node.specifiers.forEach(specifier => {
            if (specifier.type === 'ImportDefaultSpecifier' &&
                specifier.local.type === 'Identifier' &&
                isNotUseIndex(node.source.value)) {

                context.report(node, 'Use index.js file for import module');
            }
        });
    }
});

const isNotUseIndex = (path) => {
    const pathParts = path.split('/');
    if (pathParts.length >= 2) {
        const lastTwoParts = pathParts.slice(-2);
        if (lastTwoParts[0] === lastTwoParts[1]) {
            return true;
        }
    }
    return false;
};

module.exports.schema = [];