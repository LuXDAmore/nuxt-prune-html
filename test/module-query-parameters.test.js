/*
*   * Test utils
*/
import { setupTest } from '@nuxt/test-utils';

/*
*   * Utils
*/
import { getDomElements, BASE_URL } from './utils';

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
                setupTimeout: 99999,
                testDir: __dirname,
                fixture: '../src',
                config: {
                    pruneHtml: {
                        enabled: true,
                        types: [ 'query-parameters' ],
                    },
                },
            }
        );

        /*
        *   * Query Parameters
        */
        test(
            'scripts',
            async() => {

                const { length } = await getDomElements(
                    `${ BASE_URL }?prune=true`,
                    'script:not([type="application/ld+json"])',
                );

                // Test
                expect( length ).toEqual(
                    0
                );

            },

        );

    }
);
