'use strict';

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:unicorn/recommended',
        '@nuxtjs',
        'prettier',
        'prettier/vue',
        'plugin:prettier/recommended',
        '@vue/prettier',
        'plugin:vue/strongly-recommended',
        'plugin:nuxt/recommended',
    ],
    plugins: [
        'standard',
        'unicorn',
        'prettier',
        'compat',
        'promise',
        'import',
        'eslint-comments',
    ],
    overrides: [
        {
            files: [ 'test/**/*.{j,t}s?(x)' ],
            env: {
                jest: true,
            },
        },
    ],
    rules: {
        indent: 'off',
        'no-console': [
            'warn',
            {
                allow: [
                    'info',
                    'error',
                ],
            },
        ],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'one-var': [
            'warn',
            {
                separateRequires: true,
                var: 'consecutive',
                let: 'consecutive',
                const: 'consecutive',
            },
        ],
        'spaced-comment': [
            'warn',
            'always',
        ],
        'function-call-argument-newline': [
            'warn',
            'always',
        ],
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
            },
        ],
        'array-bracket-newline': [
            'warn',
            {
                minItems: 2,
                multiline: true,
            },
        ],
        'function-paren-newline': [
            'warn',
            'multiline-arguments',
        ],
        'brace-style': [
            'warn',
            '1tbs',
            {
                allowSingleLine: true,
            },
        ],
        'comma-style': [
            'warn',
            'first',
            {
                exceptions: {
                    ArrayExpression: true,
                    ObjectExpression: true,
                },
            },
        ],
        'comma-spacing': [
            'warn',
            {
                before: false,
                after: true,
            },
        ],
        quotes: [
            'warn',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
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
                ],
            },
        ],
        'no-empty': 'warn',
        'no-return-await': 'warn',
        'no-multiple-empty-lines': [
            'warn',
            {
                max: 1,
                maxEOF: 1,
                maxBOF: 1,
            },
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
            },
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
            },
        ],
        'new-cap': [
            'warn',
            {
                newIsCap: true,
            },
        ],
        'no-duplicate-imports': [
            'warn',
            {
                includeExports: true,
            },
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
            },
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
                    minProperties: 3,
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
                },
            },
        ],
        'padded-blocks': [
            'warn',
            {
                switches: 'never',
                blocks: 'always',
            },
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
            },
        ],
        'dot-notation': 'warn',
        'eqeqeq': [
            'warn',
            'always',
        ],
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
            },
        ],
        'computed-property-spacing': [
            'warn',
            'always',
        ],
        'space-in-parens': [
            1,
            'always',
        ],
        'object-curly-spacing': [
            'warn',
            'always',
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
                    },
                    finally: {
                        after: true,
                    },
                },
            },
        ],
        'arrow-parens': [
            'warn',
            'as-needed',
        ],
        'no-irregular-whitespace': 'warn',
        'space-unary-ops': [
            'warn',
            {
                words: true,
                nonwords: true,
            },
        ],
        'arrow-spacing': [
            1,
            {
                before: true,
                after: true,
            },
        ],
        'object-shorthand': [
            'warn',
            'always',
        ],
        'no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                caughtErrors: 'all',
                argsIgnorePattern: '^_',
            },
        ],
        'max-len': [
            'off',
            1200,
            4,
            {
                ignoreUrls: true,
                ignoreTemplateLiterals: true,
                ignoreStrings: true,
            },
        ],
        'max-statements': [
            'warn',
            72,
            {
                ignoreTopLevelFunctions: true,
            },
        ],
        'lines-between-class-members': [
            'warn',
            'always',
            {
                exceptAfterSingleLine: true,
            },
        ],
        // Plugins
        // Unicorn
        'unicorn/import-style': 'off',
        'unicorn/no-hex-escape': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-object-as-default-parameter': 'off',
        'unicorn/no-for-loop': 'warn',
        'unicorn/prefer-number-properties': 'warn',
        'unicorn/no-zero-fractions': 'warn',
        'unicorn/catch-error-name': 'warn',
        'unicorn/prevent-abbreviations': [
            'warn',
            {
                whitelist: {
                    obj: true,
                },
            },
        ],
        'unicorn/filename-case': [
            'warn',
            {
                cases: {
                    kebabCase: true,
                    camelCase: true,
                    pascalCase: true,
                },
            },
        ],
        'unicorn/explicit-length-check': 'off',
        'unicorn/prefer-exponentiation-operator': 'off',
        'unicorn/no-array-instanceof': 'off',
        'unicorn/prefer-starts-ends-with': 'off',
        'unicorn/prefer-text-content': 'off',
        'unicorn/prefer-includes': 'warn',
        'unicorn/better-regex': [
            'error',
            {
                sortCharacterClasses: false,
            },
        ],
        'unicorn/no-null': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-useless-undefined': 'off',
        // Standard
        'standard/computed-property-even-spacing': [
            'warn',
            'always',
        ],
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
            },
        ],
        'import/no-anonymous-default-export': 'off',
        'import/no-absolute-path': 'warn',
        'import/no-named-default': 'warn',
        'import/no-webpack-loader-syntax': 'warn',
        'import/no-self-import': 'warn',
        'import/default': 'warn',
        'import/export': 'warn',
        'import/extensions': [
            'warn',
            {
                js: 'never',
                jsx: 'never',
                md: 'always',
                json: 'always',
                svg: 'always',
                css: 'always',
            },
        ],
        'import/no-useless-path-segments': [
            'warn',
            {
                noUselessIndex: true,
            },
        ],
        'import/no-extraneous-dependencies': 'off',
        'import/no-mutable-exports': 'warn',
        'import/no-named-as-default-member': 'warn',
        'import/no-named-as-default': 'warn',
        'import/no-unassigned-import': [
            'error',
            {
                allow: [
                    '@babel/polyfill',
                    '**/register',
                    '**/register/**',
                    '**/*.css',
                    '**/*.scss',
                    '**/*.sass',
                    '**/*.postcss',
                    '**/*.less',
                ],
            },
        ],
        // Promise
        'promise/param-names': 'warn',
        'promise/no-return-wrap': [
            'warn',
            {
                allowReject: true,
            },
        ],
        'promise/no-new-statics': 'warn',
        'promise/no-return-in-finally': 'warn',
        'promise/valid-params': 'warn',
        'promise/prefer-await-to-then': 'warn',
        // Comments
        'eslint-comments/disable-enable-pair': [
            'warn',
            {
                allowWholeFile: true,
            },
        ],
        'eslint-comments/no-aggregating-enable': 'warn',
        'eslint-comments/no-duplicate-disable': 'warn',
        'eslint-comments/no-unused-disable': 'warn',
        'eslint-comments/no-unused-enable': 'warn',
        // Compat
        'compat/compat': 'warn',
        // Vuejs
        'vue/require-default-prop': 'warn',
        'vue/require-prop-types': 'warn',
        'vue/no-v-html': 'off',
        'vue/no-unused-vars': 'warn',
        'vue/no-unused-components': 'warn',
        'vue/valid-v-slot': [
            'warn',
            {
                allowModifiers: true,
            },
        ],
        'vue/no-use-v-if-with-v-for': [
            'warn',
            {
                allowUsingIterationVar: true,
            },
        ],
        'vue/component-definition-name-casing': [
            'warn',
            'kebab-case',
        ],
        'vue/component-name-in-template-casing': [
            'warn',
            'kebab-case',
        ],
        'vue/name-property-casing': [
            'warn',
            'kebab-case',
        ],
        'vue/singleline-html-element-content-newline': [
            'warn',
            {
                ignoreWhenEmpty: false,
                ignores: [ 'slot' ],
            },
        ],
        'vue/multiline-html-element-content-newline': [
            'warn',
            {
                ignoreWhenEmpty: false,
                allowEmptyLines: true,
            },
        ],
        'vue/attribute-hyphenation': [
            'warn',
            'always',
        ],
        'vue/max-attributes-per-line': [
            'warn',
            {
                'singleline': 2,
                'multiline': {
                    'max': 1,
                    'allowFirstLine': false,
                },
            },
        ],
        'vue/html-end-tags': 'warn',
        'vue/html-indent': [
            'warn',
            4,
        ],
        'vue/html-self-closing': 'warn',
        'vue/attributes-order': 'warn',
        'vue/html-quotes': [
            'warn',
            'double',
        ],
        'vue/order-in-components': 'warn',
        'vue/html-closing-bracket-newline': [
            'warn',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
        'vue/html-closing-bracket-spacing': [
            'warn',
            {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'always',
            },
        ],
        'vue/script-indent': [
            'warn',
            4,
            {
                baseIndent: 1,
            },
        ],
    },
};
