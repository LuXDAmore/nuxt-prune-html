/*
*   * Test utils
*/
import { setup, get } from '@nuxtjs/module-test-utils';

/*
*   * Nuxt configuration
*/
import config from '../src/nuxt.config';

/*
*   * Utils
*/
import { getDomElementsLength } from './utils/dom-elements';

delete config.server;
config.dev = false;

/*
*   * Module testing suite
*/
describe(
    'module',
    () => {

        /*
        *   * Nuxt
        */
        let nuxt;

        beforeAll(
            async() => {

                (
                    { nuxt } = (
                        await setup(
                            config
                        )
                    )
                );

            },
        );

        afterAll(
            async() => {

                await nuxt.close();

            },
        );

        /*
        *   * Tests
        */
        test(
            'render',
            async() => {

                const html = await get(
                    '/'
                );

                expect(
                    html
                ).toContain(
                    'Prune HTML'
                );

            },
        );

        /*
        *   * Humans
        */
        describe(
            'human',
            () => {

                test(
                    'preload-scripts',
                    async() => {

                        const elements = await getDomElementsLength(
                            'link[rel="preload"][as="script"]'
                        );

                        // Test
                        expect(
                            elements
                        ).toBeGreaterThanOrEqual(
                            0
                        );

                    },
                );

                test(
                    'scripts',
                    async() => {

                        const elements = await getDomElementsLength(
                            'script:not([type="application/ld+json"])',
                        );

                        // Test
                        expect(
                            elements
                        ).toBeGreaterThanOrEqual(
                            0
                        );

                    },
                );

            }
        );

        /*
        *   * Bots
        */
        describe(
            'bot',
            () => {

                const USER_AGENT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

                test(
                    'preload-scripts',
                    async() => {

                        const elements = await getDomElementsLength(
                            'link[rel="preload"][as="script"]',
                            USER_AGENT
                        );

                        // Test
                        expect(
                            elements
                        ).toEqual(
                            0
                        );

                    },
                );

                test(
                    'scripts',
                    async() => {

                        const elements = await getDomElementsLength(
                            'script:not([type="application/ld+json"])',
                            USER_AGENT
                        );

                        // Test
                        expect(
                            elements
                        ).toEqual(
                            0
                        );

                    },
                );

            }
        );

    }
);
