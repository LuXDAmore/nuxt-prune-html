/*
*   * Test utils
*/
import { setup, get } from '@nuxtjs/module-test-utils';

/*
*   * DOM
*/
import { JSDOM } from 'jsdom';

/*
*   * Package data
*/
import * as PACKAGE from '../package.json';

/*
*   * Nuxt configuration
*/
import config from '../src/nuxt.config';

delete config.server;
config.dev = false;

/*
*   * Set url for the generated website
*/
const BASE_URL = PACKAGE.homepage.replace(
        'https://luxdamore.github.io/',
        '/'
    )
    , TIMING = 90000
;

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
            TIMING
        );

        afterAll(
            async() => {

                await nuxt.close();

            },
            TIMING
        );

        /*
        *   * Tests
        */
        test(
            'render',
            async() => {

                const html = await get(
                    BASE_URL
                );

                expect(
                    html
                ).toContain(
                    'Prune HTML'
                );

            },
            TIMING
        );

        /*
        *   * Utils
        */
        const getDomElementsLength = async(
            selector,
            ua = null
        ) => {

            /*
            *   * HTML
            */
            const html = await get(
                    BASE_URL,
                    {
                        headers: (
                            ua
                            ? {
                                'User-Agent': ua,
                            }
                            : {}
                        ),
                    }
                )
                , { window } = new JSDOM(
                    html
                ).window
                , elements = window.document.querySelectorAll(
                    selector
                )
            ;

            return elements.length;

        };

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
                    TIMING
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
                    TIMING
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
                    TIMING
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
                    TIMING
                );

            }
        );

    }
);
