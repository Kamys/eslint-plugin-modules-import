"use strict";

module.exports = context => ({
    ImportDeclaration: node => {
        node.specifiers.forEach(specifier => {
            if (specifier.type === 'ImportDefaultSpecifier' &&
                specifier.local.type === 'Identifier' &&
                specifier.local.name === '_') {

                context.report(node, 'Prefer importing single functions over a full FP library');
            }
        });
    }
});

module.exports.schema = [];