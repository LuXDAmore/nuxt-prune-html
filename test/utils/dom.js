/*
*   * Test utils
*/
import { get } from '@nuxt/test-utils';

/*
*   * DOM
*/
import { JSDOM } from 'jsdom';

/*
*   * Package data
*/
import * as PACKAGE from '../../package.json';

/*
*   * Set url for the generated website
*/
const BASE_URL = PACKAGE.homepage.replace(
    'https://luxdamore.github.io/',
    '/'
);

/*
*   * Utils
*/
async function getDomElements(
    url = '/',
    selector = '*',
    ua = null
) {

    /*
    *   * HTML
    */
    const { body } = await get(
            url,
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
        , { window: { document } } = new JSDOM(
            body
        )
        , { length } = document.querySelectorAll(
            selector
        )
    ;

    /*
    *   * Body and result of the selector
    */
    return {
        body,
        length,
    };

}

/*
*   * Exports
*/
export {
    getDomElements,
    BASE_URL,
};
