// Test utils
import {
    setup,
    get,
} from '@nuxtjs/module-test-utils';

// Dom utils
import { JSDOM } from 'jsdom';

// Nuxt config
import config from '../example/nuxt.config';

const BASE_URL = '/';

config.dev = false;
config.router.base = BASE_URL;

// Url generator for User Agents
const headers = ua => (
    ! ua
    ? {}
    : {
        'User-Agent': ua,
    }
);

// Tests
describe(
    'module',
    () => {

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
            60000
        );

        afterAll(
            async() => {

                await nuxt.close();

            }
        );

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

            }
        );

        const getElements = async(
            selector,
            ua
        ) => {

            const html = await get(
                    BASE_URL,
                    {
                        headers: headers(
                            ua
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

        describe(
            'human',
            () => {

                test(
                    'preload-scripts',
                    async() => {

                        const elements = await getElements(
                            'link[rel="preload"][as="script"]'
                        );

                        // Test
                        expect(
                            elements
                        ).toBeGreaterThanOrEqual(
                            0
                        );

                    }
                );

                test(
                    'scripts',
                    async() => {

                        const elements = await getElements(
                            'script:not([type="application/ld+json"])',
                        );

                        // Test
                        expect(
                            elements
                        ).toBeGreaterThanOrEqual(
                            0
                        );

                    }
                );

            }
        );

        describe(
            'bot',
            () => {

                const USER_AGENT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

                test(
                    'preload-scripts',
                    async() => {

                        const elements = await getElements(
                            'link[rel="preload"][as="script"]',
                            USER_AGENT
                        );

                        // Test
                        expect(
                            elements
                        ).toEqual(
                            0
                        );

                    }
                );

                test(
                    'scripts',
                    async() => {

                        const elements = await getElements(
                            'script:not([type="application/ld+json"])',
                            USER_AGENT
                        );

                        // Test
                        expect(
                            elements
                        ).toEqual(
                            0
                        );

                    }
                );

            }
        );

    }
);
