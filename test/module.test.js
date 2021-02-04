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
                setupTimeout: 99999,
                testDir: __dirname,
                fixture: '../src',
                config: {
                    pruneHtml: {
                        enabled: true,
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
        *   * Humans
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
        *   * Bots or audits
        */
        describe(
            'is-bot',
            () => {

                const USER_AGENT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

                test(
                    'preload-scripts',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'link[rel="preload"][as="script"]',
                            USER_AGENT
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
                            USER_AGENT
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

                const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/61.0.3116.0 Safari/537.36 Chrome-Lighthouse';

                test(
                    'preload-scripts',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'link[rel="preload"][as="script"]',
                            USER_AGENT
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
                            USER_AGENT
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
