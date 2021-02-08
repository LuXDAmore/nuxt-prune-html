/*
*   * Test utils
*/
import { setupTest, getNuxt } from '@nuxt/test-utils';

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

        /*
        *   * Closing
        */
        afterAll( () => getNuxt().close() );

    }
);
