"use strict";

const rule = require("../../../lib/rules/notUseAbsoluteImport"),
    RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    }
});

const ruleTester = new RuleTester();
const errors = [{
    message: 'Use index.js file for import module',
    type: 'ImportDeclaration'
}];
ruleTester.run("notUseAbsoluteImport", rule, {
    valid: [
        {
            code: "import { ITitle } from '@/components/OtherModule/type';",
            filename: "src/components/ModuleName/Title",
        },
        {
            code: "import { myFormat } from '@/constants/time';",
            filename: "src/components/ModuleName/utils",
        }
    ],

    invalid: [
        {
            code: "import { ITitle } from '@/components/ModuleName/type';",
            filename: "src/components/ModuleName",
            errors,
        },
        {
            code: "import { ITitle } from '@/components/ModuleName/constant';",
            filename: "src/components/ModuleName/utils",
            errors,
        }
    ]
});