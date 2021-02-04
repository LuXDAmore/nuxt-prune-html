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
                    pruneHtml: {
                        enabled: true,
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
        *   * Headers
        */
        describe(
            'headers',
            () => {

                test(
                    'custom-name',
                    async() => {

                        const { length } = await getDomElements(
                            BASE_URL,
                            'script:not([type="application/ld+json"])',
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
                            'script:not([type="application/ld+json"])',
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
