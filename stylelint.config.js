const tailwindIgnored = [
    '/^@/',
    'custom',
    'tailwind',
    'extends',
    'apply',
    'variants',
    'screen',
    'transform-timing-function',
    'v-deep',
    'css-doodle',
];

module.exports = {
    root: true,
    parser: 'postcss-scss',
    syntax: 'postcss-scss',
    extends: [
        'stylelint-config-standard',
        'stylelint-config-prettier',
        'stylelint-config-sass-guidelines',
        'stylelint-config-rational-order',
    ],
    plugins: [
        'stylelint-scss',
        'stylelint-no-unsupported-browser-features',
    ],
    // add your custom rules here
    defaultSeverity: 'warning',
    rules: {
        // Plugins
        'plugin/no-unsupported-browser-features': [
            true,
            {
                severity: 'warning',
                ignore: [
                    'multicolumn',
                    'object-fit',
                    'calc',
                    'border-radius',
                    'user-select-none',
                    'pointer-events',
                    'background-img-opts',
                    'boxshadow',
                    'css-boxshadow',
                    'animation',
                    'css-animation',
                    'gradients',
                    'css-gradients',
                    'transitions',
                    'css-transitions',
                    'transform',
                    'will-change',
                    'font-unicode-range',
                    'transforms2d',
                    'transforms3d',
                    'viewport-units',
                    'css-appearance',
                    'css-filters',
                    'css3-cursors',
                    'css3-cursors-newer',
                    'outline',
                    'flexbox',
                    'fixed',
                    'fontface',
                    'css-fixed',
                ],
            },
        ],
        // Property Order
        'order/properties-order': [
            [],
            {
                severity: 'warning',
            },
        ],
        'order/properties-alphabetical-order': null,
        'plugin/rational-order': [
            true,
            {
                severity: 'warning',
            },
        ],
        // Generic
        'indentation': 4,
        'no-descending-specificity': null,
        'selector-type-no-unknown': [
            true,
            {
                ignore: [ 'custom-elements' ],
                ignoreTypes: [
                    'css-doodle',
                    'v-deep',
                ],
            },
        ],
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: [
                    'v-deep',
                    'css-doodle',
                ],
            },
        ],
        'custom-property-empty-line-before': [
            'always',
            {
                except: [
                    'after-comment',
                    'after-custom-property',
                ],
                ignore: [
                    'after-comment',
                    'inside-single-line-block',
                ],
            },
        ],
        'block-closing-brace-newline-before': [ 'always-multi-line' ],
        'block-closing-brace-empty-line-before': [ 'always-multi-line' ],
        'string-quotes': 'double',
        'media-feature-parentheses-space-inside': 'always',
        'block-opening-brace-newline-after': 'always-multi-line',
        'function-parentheses-space-inside': 'always-single-line',
        'block-no-empty': null,
        'function-url-quotes': 'always',
        'max-empty-lines': [ 2 ],
        'selector-max-id': 1,
        'selector-max-compound-selectors': [ 9 ],
        'max-nesting-depth': [ 9 ],
        'at-rule-no-unknown': null,
        'property-no-vendor-prefix': true,
        'selector-descendant-combinator-no-non-space': true,
        'unit-allowed-list': [
            'vh',
            'vw',
            'px',
            'em',
            'rem',
            's',
            'fr',
            'deg',
            '%',
        ],
        'rule-empty-line-before': [
            'always',
            {
                except: [ 'after-single-line-comment' ],
                ignore: [
                    'after-comment',
                    'inside-block',
                ],
            },
        ],
        'selector-no-qualifying-type': [
            true,
            {
                ignore: [
                    'attribute',
                    'class',
                ],
            },
        ],
        'at-rule-empty-line-before': [
            'always',
            {
                except: [
                    'after-same-name',
                    'blockless-after-same-name-blockless',
                    'blockless-after-blockless',
                ],
                ignore: [ 'after-comment' ],
            },
        ],
        'number-leading-zero': 'never',
        'declaration-empty-line-before': [
            'always',
            {
                except: [
                    'after-comment',
                    'after-declaration',
                ],
            },
        ],
        'block-opening-brace-space-before': 'always',
        'selector-list-comma-newline-after': 'always',
        'selector-class-pattern': [
            // http://stylelint.cn/user-guide/faq/
            // .your-component--primary
            // .your-component__container
            '^([a-z][a-z0-9]*)((--?|(__)?)[a-z0-9]+)*$',
            {
                resolveNestedSelectors: true,
            },
        ],
        'block-closing-brace-newline-after': [
            'always',
            {
                ignoreAtRules: [
                    'if',
                    'else',
                ],
            },
        ],
        'at-rule-name-space-after': 'always',
        // SASS - SCSS
        // If - Else
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: tailwindIgnored,
            },
        ],
        'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
        'scss/at-else-closing-brace-space-after': 'always-intermediate',
        'scss/at-else-empty-line-before': 'never',
        'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
        'scss/at-if-closing-brace-space-after': 'always-intermediate',
        'scss/at-function-parentheses-space-before': 'never',
    },
};
