import { resolve } from 'path';
import * as PACKAGE from '../package.json';

const meta = [
        {
            once: true,
            hid: 'description',
            name: 'description',
            content: PACKAGE.description,
        },
    ]
    , script = [
        {
            once: true,
            hid: 'keep-me',
            src: '/keep-me.js',
            class: 'nuxt-prune--keep',
            async: true,
            defer: true,
        },
    ]
;

export default {
    modern: true,
    css: [
        'modern-normalize/modern-normalize.css',
        'highlight.js/styles/github.css',
        '~assets/style.css',
    ],
    srcDir: __dirname,
    rootDir: resolve(
        __dirname,
        '..',
    ),
    buildDir: resolve(
        __dirname,
        '.nuxt',
    ),
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: PACKAGE.name,
        meta,
        script,
    },
    /*
     * Modules
     */
    modules: [
        '@nuxtjs/markdownit',
        {
            handler: require(
                '../'
            ).default,
        },
    ],
    /*
     * Router
     */
    router: {
        base: (
            process.env.NODE_ENV === 'production'
            ? `${ PACKAGE.homepage }/`
            : '/'
        ),
    },
    /*
     * Generate
     */
    generate: {
        dir: resolve(
            __dirname,
            '../docs'
        ),
    },
    /*
     ** Build configuration
     */
    build: {
        loaders: {
            vue: {
                compilerOptions: {
                    preserveWhitespace: false,
                    whitespace: 'condense',
                },
            },
        },
        babel: {
            presets: (
                { isServer },
            ) => [
                [
                    require.resolve(
                        '@nuxt/babel-preset-app',
                    ),
                    {
                        buildTarget: isServer ? 'server' : 'client',
                        corejs: {
                            version: 3,
                        },
                    },
                ],
            ],
        },
        /*
         ** Minifier
         */
        html: {
            minify: {
                collapseBooleanAttributes: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                collapseInlineTagWhitespace: true,
                removeOptionalTags: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                trimCustomFragments: true,
                useShortDoctype: true,
                collapseWhitespace: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true,
                continueOnParseError: true,
            },
        },
        /*
         ** Run lint on save
         */
        extend(
            config,
            {
                isDev,
                isClient,
            },
        ) {

            /*
             ** ESLint loaded
             */
            isDev && isClient && config.module.rules.push(
                {
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                },
            );

        },
    },
};
