
"use strict";

const rule = require("../../../lib/rules/notUseIndex"),
    RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    }
});

const ruleTester = new RuleTester();
ruleTester.run("notUseIndex", rule, {

    valid: [
        "import $ from 'jquery';",
        "import { filter } from 'lodash/fp'",
        "import Title from './components/Title';",
    ],

    invalid: [
        {
            code: "import Title from './components/Title/Title';",
            errors: [{
                message: 'Use index.js file for import module',
                type: 'ImportDeclaration'
            }]
        }
    ]
});