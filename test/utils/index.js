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
*   * Data
*/
const BASE_URL = PACKAGE.homepage.replace(
        'https://luxdamore.github.io/',
        '/'
    )
    , BOT_USER_AGENT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
;

/*
*   * Utils
*/
async function getDomElements(
    url = '/',
    selector = '*',
    headerValue = null,
    headerName = 'User-Agent'
) {

    /*
    *   * HTML
    */
    const { body } = await get(
            url,
            {
                headers: (
                    headerValue
                    ? {
                        [ headerName ]: headerValue,
                    }
                    : {}
                ),
            }
        )
        , { window: { document } } = new JSDOM(
            body
        )
        , elements = document.querySelectorAll(
            selector
        )
    ;

    /*
    *   * Body and result of the selector
    */
    return {
        body,
        elements,
        length: elements && elements.length ? elements.length : 0,
    };

}

/*
*   * Exports
*/
export {
    getDomElements,
    BASE_URL,
    BOT_USER_AGENT,
 };
