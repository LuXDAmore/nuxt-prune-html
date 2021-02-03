/*
*   * Test utils
*/
import { setupTest } from '@nuxt/test-utils';

/*
*   * Utils
*/
import { getDomElements, BASE_URL } from './utils/dom';

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
                    },
                },
            }
        );

        /*
        *   * Tests
        */
        test(
            'render',
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
