import { resolve } from 'path';
import * as PACKAGE from '../package.json';

const meta = [
        {
            once: true,
            hid: 'description',
            name: 'description',
            content: PACKAGE.description,
        },
        {
            once: true,
            hid: 'keywords',
            name: 'keywords',
            content: PACKAGE.keywords.join(
                ','
            ),
        },
    ]
    , link = [
        {
            once: true,
            hid: 'favicon',
            rel: 'shortcut icon',
            type: 'image/x-icon',
            href: '/favicon.ico',
        },
        {
            once: true,
            hid: 'humans',
            rel: 'author',
            type: 'text/plain',
            href: '/humans.txt',
        },
    ]
    , script = [
        {
            once: true,
            hid: 'keep-me',
            src: '/scripts/keep-me.js',
            class: 'nuxt-prune--keep',
            async: true,
            defer: true,
        },
    ]
;

export default {
    // Options
    target: 'static',
    modern: true,
    srcDir: __dirname,
    rootDir: resolve(
        __dirname,
        '..',
    ),
    buildDir: resolve(
        __dirname,
        '.nuxt',
    ),
    watch: [
        resolve(
            __dirname,
            '../lib/module'
        ),
    ],
    // Library
    css: [
        'modern-normalize/modern-normalize.css',
        'highlight.js/styles/github.css',
        '~assets/style.css',
    ],
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: PACKAGE.name,
        meta,
        link,
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
    buildModules: [
        'nuxt-compress',
        '@nuxtjs/sitemap',
    ],
    sitemap: {
        hostname: PACKAGE.homepage,
        gzip: true,
    },
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
    /*
    * Build
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
