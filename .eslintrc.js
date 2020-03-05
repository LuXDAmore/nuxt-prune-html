module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
    },
    extends: [
        '@nuxtjs',
        'eslint:recommended',
        'plugin:nuxt/recommended',
        'plugin:vue/recommended',
        '@vue/prettier',
    ],
    plugins: [
        'standard',
        'compat',
        'import',
        'promise',
        'unicorn',
    ],
    rules: {
        'indent': 'off',
        'no-console': 'off',
        'no-debugger': 'error',
        'one-var': [
            'warn',
            {
                separateRequires: true,
                var: 'consecutive',
                let: 'consecutive',
                const: 'consecutive',
            }
        ],
        'spaced-comment': [ 'warn', 'always' ],
        'function-call-argument-newline': [ 'warn', 'always' ],
        'prefer-const': 'warn',
        'no-useless-rename': [
            'warn',
            {
                ignoreExport: true,
            },
        ],
        'rest-spread-spacing': [
            'warn',
            'always',
        ],
        'template-curly-spacing': [
            'warn',
            'always',
        ],
        'array-element-newline': [
            'warn',
            {
                minItems: 2,
                multiline: true,
            }
        ],
        'array-bracket-newline': [
            'warn',
            {
                minItems: 2,
                multiline: true,
            }
        ],
        'function-paren-newline': [
            'warn',
            {
                minItems: 1,
            }
        ],
        'brace-style': [
            'warn',
            '1tbs',
            {
                allowSingleLine: true,
            }
        ],
        'comma-style': [
            'warn',
            'first',
            {
                exceptions: {
                    ArrayExpression: true,
                    ObjectExpression: true,
                }
            }
        ],
        'comma-spacing': [
            'warn',
            {
                before: false,
                after: true,
            }
        ],
        quotes: [
            'warn',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            }
        ],
        semi: [
            'warn',
            'always',
        ],
        'no-unreachable': 'warn',
        'no-confusing-arrow': 'warn',
        'no-constant-condition': 'warn',
        curly: [
            'warn',
            'multi-or-nest',
        ],
        'padding-line-between-statements': [
            'warn',
            {
                blankLine: 'always',
                prev: [
                    'const',
                    'let',
                    'var',
                ],
                next: '*',
            },
            {
                blankLine: 'any',
                prev: [
                    'const',
                    'let',
                    'var',
                ],
                next: [
                    'const',
                    'let',
                    'var',
                ]
            }
        ],
        'no-empty': 'warn',
        'no-return-await': 'warn',
        'no-multiple-empty-lines': [
            'warn',
            {
                max: 2,
                maxBOF: 1,
            }
        ],
        'lines-around-comment': [
            'warn',
            {
                beforeBlockComment: false,
                afterBlockComment: false,
                beforeLineComment: false,
                afterLineComment: false,
                allowBlockStart: true,
                allowBlockEnd: true,
                allowObjectStart: true,
                allowObjectEnd: true,
                allowArrayStart: true,
                allowArrayEnd: true,
            }
        ],
        'no-inner-declarations': [
            'warn',
            'functions',
        ],
        'no-tabs': 'warn',
        'operator-linebreak': [
            'warn',
            'before',
        ],
        'block-spacing': [
            'warn',
            'always',
        ],
        'dot-location': [
            'warn',
            'property',
        ],
        'func-call-spacing': [
            'warn',
            'never',
        ],
        'key-spacing': [
            'warn',
            {
                beforeColon: false,
            }
        ],
        'new-cap': [
            'warn',
            {
                newIsCap: true,
            }
        ],
        'no-duplicate-imports': [
            'warn',
            {
                includeExports: true,
            }
        ],
        'no-floating-decimal': 'warn',
        'no-multi-spaces': 'warn',
        'no-return-assign': [
            'warn',
            'except-parens',
        ],
        'require-await': 'warn',
        'no-undef': 'warn',
        'no-undef-init': 'warn',
        'no-whitespace-before-property': 'warn',
        'object-property-newline': [
            'warn',
            {
                allowAllPropertiesOnSameLine: false,
            }
        ],
        'object-curly-newline': [
            'warn',
            {
                ObjectExpression: {
                    multiline: true,
                    minProperties: 1,
                },
                ObjectPattern: {
                    multiline: true,
                    minProperties: 2,
                },
                ImportDeclaration: {
                    multiline: true,
                    consistent: false,
                    minProperties: 3,
                },
                ExportDeclaration: {
                    multiline: true,
                    consistent: false,
                    minProperties: 2,
                }
            }
        ],
        'padded-blocks': [
            'warn',
            {
                switches: 'never',
                blocks: 'always',
            }
        ],
        'yield-star-spacing': [
            'warn',
            'both',
        ],
        'one-var-declaration-per-line': [
            'warn',
            'always',
        ],
        'space-infix-ops': 'warn',
        'require-atomic-updates': 'warn',
        'comma-dangle': [
            'warn',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                exports: 'always-multiline',
                imports: 'always-multiline',
                functions: 'only-multiline',
            }
        ],
        'dot-notation': 'warn',
        'eqeqeq': [ 'warn', 'always' ],
        'camelcase': [
            'off',
            {
                ignoreDestructuring: true,
            },
        ],
        'no-prototype-builtins': 'warn',
        'no-extra-semi': 'warn',
        'no-new-object': 'warn',
        'no-array-constructor': 'warn',
        'no-new-wrappers': 'warn',
        'no-mixed-spaces-and-tabs': 'warn',
        'space-before-function-paren': [
            'warn',
            'never',
        ],
        'space-before-blocks': 'warn',
        'array-bracket-spacing': [
            'warn',
            'always',
            {
                singleValue: true,
                objectsInArrays: false,
                arraysInArrays: true,
            }
        ],
        'computed-property-spacing': [
            'warn',
            'always'
        ],
        'space-in-parens': [
            1,
            'always'
        ],
        'object-curly-spacing': [
            'warn',
            'always'
        ],
        'keyword-spacing': [
            'warn',
            {
                after: false,
                overrides: {
                    const: {
                        after: true,
                    },
                    else: {
                        before: true,
                        after: true,
                    },
                    from: {
                        before: true,
                        after: true,
                    },
                    return: {
                        after: true,
                    },
                    default: {
                        after: true,
                    },
                    export: {
                        after: true,
                    },
                    import: {
                        after: true,
                    },
                    case: {
                        after: true,
                    },
                    try: {
                        after: true,
                    },
                    catch: {
                        before: true,
                        after: false,
                    }
                }
            }
        ],
        'arrow-parens': [
            'warn',
            'as-needed'
        ],
        'no-irregular-whitespace': 'warn',
        'space-unary-ops': [
            'warn',
            {
                words: true,
                nonwords: true,
            }
        ],
        'arrow-spacing': [
            1,
            {
                before: true,
                after: true,
            }
        ],
        'object-shorthand': [
            'warn',
            'always',
        ],
        'no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'after-used', // This needs to be off so we can specify mixin interfaces
                ignoreRestSiblings: true,
                caughtErrors: 'all',
                argsIgnorePattern: '^_',
            }
        ],
        'max-len': [
            'warn',
            300,
            4,
            {
                ignoreUrls: true,
                ignoreTemplateLiterals: true,
                ignoreStrings: true,
            }
        ],
        'max-statements': [
            'warn',
            72,
            {
                ignoreTopLevelFunctions: true,
            }
        ],
        'lines-between-class-members': [
            'warn',
            'always',
            {
                exceptAfterSingleLine: true,
            }
        ],
        // Plugins
        // Standard
        'unicorn/prefer-includes': 'warn',
        'standard/computed-property-even-spacing': 'off',
        'standard/object-curly-even-spacing': [
            'warn',
            'either',
        ],
        // Import
        'import/order': 'warn',
        'import/first': 'warn',
        'import/namespace': [
            'warn',
            {
                allowComputed: true,
            }
        ],
        // Compat
        'compat/compat': 'warn',
        // Vuejs
        'vue/require-default-prop': 'warn',
        'vue/require-prop-types': 'warn',
        'vue/no-v-html': 'off',
        'vue/no-unused-vars': 'warn',
        'vue/no-unused-components': 'warn',
        'vue/no-use-v-if-with-v-for': [
            'warn',
            {
                allowUsingIterationVar: true,
            }
        ],
        'vue/component-name-in-template-casing': [
            'warn',
            'kebab-case',
        ],
        'vue/name-property-casing': [
            'warn',
            'kebab-case'
        ],
        'vue/attribute-hyphenation': [
            'warn',
            'always'
        ],
        'vue/max-attributes-per-line': [
            'warn',
            {
                'singleline': 2,
                'multiline': {
                    'max': 1,
                    'allowFirstLine': false
                }
            }
        ],
        'vue/html-end-tags': 'warn',
        'vue/html-indent': [
            'warn',
            4
        ],
        'vue/html-self-closing': 'warn',
        'vue/attributes-order': 'warn',
        'vue/html-quotes': [
            'warn',
            'double'
        ],
        'vue/order-in-components': 'warn',
        'vue/html-closing-bracket-newline': [
            'warn',
            {
                singleline: 'never',
                multiline: 'always'
            }
        ],
        'vue/html-closing-bracket-spacing': [
            'warn',
            {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'always'
            }
        ],
        'vue/script-indent': [
            'warn',
            4,
            {
                baseIndent: 1
            }
        ],
    },
};
