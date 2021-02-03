/*
*   * Test utils
*/
import { get } from '@nuxtjs/module-test-utils';

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
async function getDomElementsLength(
    selector,
    ua = null
) {

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

}

export { getDomElementsLength };
