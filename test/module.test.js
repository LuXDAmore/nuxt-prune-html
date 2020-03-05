import config from '../example/nuxt.config';

import { Nuxt, Builder } from 'nuxt';
import { JSDOM } from 'jsdom';
import request from 'request-promise-native';
import getPort from 'get-port';

const BASE_URL = '/';

config.dev = false;
config.router.base = BASE_URL;

jest.setTimeout(
    60000
);

let nuxt
    , port
;

const url = path => `http://localhost:${ port }${ path }`
    , headers = ua => (
        ! ua
        ? {}
        : {
            'User-Agent': ua,
        }
    )
    , get = (
        path,
        ua
    ) => request(
        {
            url: url(
                path
            ),
            headers: headers(
                ua
            ),
        }
    )
;

describe(
    'nuxt',
    () => {

        beforeAll(
            async() => {

                nuxt = new Nuxt(
                    config
                );

                await nuxt.ready();

                await new Builder(
                    nuxt
                ).build();

                port = await getPort();

                await nuxt.listen(
                    port
                );

            }
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
                    'Nuxt'
                );

            }
        );

        const getElements = async(
            selector,
            ua
        ) => {

            const html = await get(
                    BASE_URL,
                    ua
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
            'website',
            () => {

                test(
                    'scripts',
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
            'is-bot',
            () => {

                const USER_AGENT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

                test(
                    'scripts',
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
