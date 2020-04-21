import { resolve } from 'path';
import * as PACKAGE from '../package.json';

const meta = [
    {
        once: true,
        hid: 'description',
        name: 'description',
        content: PACKAGE.description,
    },
];

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
    },
    /*
     * Modules
     */
    modules: [
        '@nuxtjs/markdownit',
        resolve(
            __dirname,
            '../lib/module'
        ),
    ],
    /*
     * Router
     */
    router: {
        base: (
            process.env.NODE_ENV === 'production'
            ? '/nuxt-prune-html/'
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
     * Env
     */
    env: {
        package: PACKAGE,
    },
    /*
     * Server
     */
    server: {
        host: '0.0.0.0',
    },
};
