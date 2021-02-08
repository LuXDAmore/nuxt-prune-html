/*
*   * Test utils
*/
import { setupTest } from '@nuxt/test-utils';

/*
*   * Utils
*/
import {
    getDomElements,
    BASE_URL,
    BOT_USER_AGENT,
} from './utils';

/*
*   * Module testing suite
*/
describe(
    'module',
    () => {

        /*
        *   * Nuxt setup
        */
        setupTest(
           {
                server: true,
                testDir: __dirname,
                fixture: '../src',
                config: {
                    dev: false,
                    pruneHtml: {
                        enabled: true,
                        hookGeneratePage: false,
                    },
                },
            }
        );

        /*
        *   * Tests
        */
        describe(
            'render',
            () => {

                test(
                    'run',
                    async() => {

                        const { body } = await getDomElements(
                            BASE_URL
                        );

                        expect( body ).toContain(
                            'Prune HTML'
                        );

                    },
                );

            }
        );

        /*
        *   * Tests for Humans
        */
        describe(
            'is-human',
            () => {

                test(
                    'preload-scripts',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'link[rel="preload"][as="script"]'
                        );

                        // Test
                        expect( length ).toBeGreaterThanOrEqual(
                            1
                        );

                    },

                );

                test(
                    'scripts',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'script:not([type="application/ld+json"])',
                        );

                        // Test
                        expect( length ).toBeGreaterThanOrEqual(
                            1
                        );

                    },

                );

            }
        );

        /*
        *   * Tests for Bots or audits
        */
        describe(
            'is-bot',
            () => {

                test(
                    'preload-scripts',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'link[rel="preload"][as="script"]',
                            BOT_USER_AGENT
                        );

                        // Test
                        expect( length ).toEqual(
                            0
                        );

                    },

                );

                test(
                    'scripts',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'script:not([type="application/ld+json"])',
                            BOT_USER_AGENT
                        );

                        // Test
                        expect( length ).toEqual(
                            0
                        );

                    },

                );

            }
        );

        describe(
            'is-audit',
            () => {

                test(
                    'preload-scripts',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'link[rel="preload"][as="script"]',
                            BOT_USER_AGENT
                        );

                        // Test
                        expect( length ).toEqual(
                            0
                        );

                    },

                );

                test(
                    'scripts',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'script:not([type="application/ld+json"])',
                            BOT_USER_AGENT
                        );

                        // Test
                        expect( length ).toEqual(
                            0
                        );

                    },

                );

            }
        );

    }
);

/*
*   * Module testing suite
*/
describe(
    'module-selectors',
    () => {

        /*
        *   * Nuxt setup
        */
        setupTest(
           {
                server: true,
                testDir: __dirname,
                fixture: '../src',
                config: {
                    dev: false,
                    head: {
                        link: [
                            {
                                hid: 'preload-keep-me',
                                href: '/scripts/keep-me.js',
                                once: true,
                                rel: 'preload',
                                as: 'script',
                                class: 'keeped-in-head',
                            },
                        ],
                        script: [
                            {
                                hid: 'keep-me',
                                src: '/scripts/keep-me.js',
                                once: true,
                                body: true,
                                async: true,
                                class: 'keeped-in-head',
                            },
                        ],
                    },
                    pruneHtml: {
                        enabled: true,
                        hookGeneratePage: false,
                        classesSelectorsToKeep: [ '.keeped-in-head' ],
                        link: [
                            {
                                href: '#',
                                rel: 'preload',
                                as: 'script',
                                position: 'phead',
                                class: 'nuxt-prune--injected',
                            },
                        ],
                        script: [
                            {
                                src: '#',
                                position: 'head',
                                class: 'nuxt-prune--injected',
                            },
                            {
                                src: '#',
                                position: 'pbody',
                                class: 'nuxt-prune--injected',
                            },
                            {
                                src: '#',
                                class: 'nuxt-prune--injected',
                            },
                        ],
                    },
                },
            }
        );

        /*
        *   * Tests
        */
        describe(
            'scripts-and-links',
            () => {

                test(
                    'selectors-to-keep',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            '.keeped-in-head',
                            BOT_USER_AGENT
                        );

                        // Test
                        expect( length ).toEqual(
                            2
                        );

                    },
                );

                test(
                    'number-injected',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            '.nuxt-prune--injected',
                            BOT_USER_AGENT
                        );

                        // Test
                        expect( length ).toEqual(
                            4
                        );

                    },
                );

                test(
                    'total-number',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'script:not([type="application/ld+json"]), link[rel="preload"][as="script"]',
                            BOT_USER_AGENT
                        );

                        // Test
                        expect( length ).toEqual(
                            6
                        );

                    },
                );

                test(
                    'positions',
                    async() => {

                        const { elements: [ html ] } = await getDomElements(
                                BASE_URL,
                                'html',
                                BOT_USER_AGENT
                            )
                            // HTML
                            , head = html.querySelector( 'head' )
                            , body = html.querySelector( 'body' )
                        ;

                        // Test
                        expect( head.firstChild.tagName === 'LINK' ).toEqual(
                            true
                        );

                        expect( head.lastChild.tagName === 'SCRIPT' ).toEqual(
                            true
                        );

                        expect( body.firstChild.tagName === 'SCRIPT' ).toEqual(
                            true
                        );

                        expect( body.lastChild.tagName === 'SCRIPT' ).toEqual(
                            true
                        );

                    },
                );

            }
        );

    }
);

/*
*   * Module testing suite
*/
describe(
    'module-query-parameters',
    () => {

        /*
        *   * Nuxt setup
        */
        setupTest(
           {
                server: true,
                testDir: __dirname,
                fixture: '../src',
                config: {
                    dev: false,
                    pruneHtml: {
                        enabled: true,
                        hookGeneratePage: false,
                        types: [ 'query-parameters' ],
                    },
                },
            }
        );

        /*
        *   * Tests
        */
        describe(
            'scripts-and-links',
            () => {

                test(
                    'total-number',
                    async() => {

                        const { length } = await getDomElements(
                            `${ BASE_URL }?prune=true`,
                            'script:not([type="application/ld+json"]), link[rel="preload"][as="script"]',
                        );

                        // Test
                        expect( length ).toEqual(
                            0
                        );

                    },

                );

            }
        );

    }
);

/*
*   * Module testing suite
*/
describe(
    'module-headers',
    () => {

        /*
        *   * Nuxt setup
        */
        setupTest(
           {
                server: true,
                testDir: __dirname,
                fixture: '../src',
                config: {
                    dev: false,
                    pruneHtml: {
                        enabled: true,
                        hookGeneratePage: false,
                        headerNameForDefaultDetection: 'custom-name',
                        types: [
                            'default-detect',
                            'headers-exist',
                        ],
                        headersToPrune: [
                            {
                                key: 'prune',
                                value: 'true',
                            },
                        ],
                    },
                },
            }
        );

        /*
        *   * Tests
        */
        describe(
            'custom-headers',
            () => {

                test(
                    'custom-name',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'script:not([type="application/ld+json"]), link[rel="preload"][as="script"]',
                            BOT_USER_AGENT,
                            'custom-name'
                        );

                        // Test
                        expect( length ).toEqual(
                            0
                        );

                    },
                );

                test(
                    'exists',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'script:not([type="application/ld+json"]), link[rel="preload"][as="script"]',
                            'true',
                            'prune',
                        );

                        // Test
                        expect( length ).toEqual(
                            0
                        );

                    },
                );

            }
        );

    }
);

/*
*   * Module testing suite
*/
describe(
    'module-deprecations',
    () => {

        /*
        *   * Nuxt setup
        */
        setupTest(
           {
                server: true,
                testDir: __dirname,
                fixture: '../src',
                config: {
                    dev: false,
                    pruneHtml: {
                        enabled: true,
                        hookGeneratePage: false,
                        hideErrorsInConsole: true,
                        headerName: 'deprecated-old-config',
                        isLighthouse: 'deprecated-old-config',
                        ignoreBotOrLighthouse: 'deprecated-old-config',
                        lighthouseUserAgent: 'deprecated-old-config',
                        selectorToKeep: 'deprecated-old-config',
                    },
                },
            }
        );

        /*
        *   * Tests
        */
        describe(
            'v2.0',
            () => {

                test(
                    'has-scripts',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'script:not([type="application/ld+json"]), link[rel="preload"][as="script"]',
                            BOT_USER_AGENT,
                        );

                        // Test
                        expect( length ).toBeGreaterThan(
                            1
                        );

                    },
                );

            }
        );

    }
);

/*
*   * Module testing suite
*/
describe(
    'module-generate',
    () => {

        /*
        *   * Nuxt setup
        */
        setupTest(
           {
                server: true,
                generate: true,
                setupTimeout: 180000,
                testDir: __dirname,
                fixture: '../src',
                config: {
                    dev: false,
                    pruneHtml: {
                        enabled: true,
                        hookRenderRoute: false,
                    },
                },
            }
        );

    }
);
