import * as PACKAGE from '../package.json';
import defaultConfig from './config';

import log from './logger';

// Externals
import cheerio from 'cheerio';
import MobileDetect from 'mobile-detect';

// Options
const moduleName = 'prune-html'
    , logger = log(
        `nuxt:${ moduleName }`,
    )
;

export default function(
    moduleOptions,
) {

    const options = {
        ... defaultConfig,
        enabled: ! this.options.dev,
        hideGenericMessagesInConsole: ! this.options.dev,
        ... moduleOptions || {},
        ... this.options[ moduleName ] || {},
        ... this.options.pruneHtml || {},
    };

    if( ! options.enabled || ! options.selectors.length )
        return;

    const pruneHtml = (
        html = '',
        {
            cheerio: cheerioConfig = {},
            selectors = [],
        }
    ) => {

        if( ! html )
            return '';

        try {

            const $ = cheerio.load(
                html,
                cheerioConfig
            );

            for( const selector of selectors ) {

                $(
                    selector
                ).remove();

            }

            ! options.hideGenericMessagesInConsole && logger.info(
                '\x1B[32m%s\x1B[0m',
                moduleName,
                'HTML correctly pruned',
            );

            return $.html();

        } catch( e ) {

            ! options.hideErrorsInConsole && logger.error(
                '\x1B[31m%s\x1B[0m',
                moduleName,
                'there was a problem pruning the HTML',
                e,
            );

        }

        return html;

    };

    // Delete all scripts for bots:
    // https://github.com/nuxt/nuxt.js/issues/2822
    // https://www.npmjs.com/package/prune-html

    options.hookRenderRoute && this.nuxt.hook(
        'render:route',
        (
            _,
            result,
            { req },
        ) => {

            ! options.hideGenericMessagesInConsole && logger.info(
                '\x1B[32m%s\x1B[0m',
                moduleName,
                'hook:render:route',
            );

            const userAgent = req.headers[ 'user-agent' ]
                , mobileDetect = new MobileDetect(
                    userAgent,
                )
                , isBot = (
                    options.isBot
                    && mobileDetect.is(
                        'bot',
                    )
                )
                , isLighthouse = (
                    options.isLighthouse
                    && options.lighthouseUserAgent
                    && mobileDetect.match(
                        options.lighthouseUserAgent,
                    )
                )
                , isMatched = options.matchUserAgent && mobileDetect.match(
                    options.matchUserAgent,
                )
            ;

            if( ( options.ignoreBotOrLighthouse || isBot || isLighthouse ) || isMatched ) {

                result.html = pruneHtml(
                    result.html,
                    options,
                );

            }

        },
    );

    options.hookGeneratePage && this.nuxt.hook(
        'generate:page',
        result => {

            ! options.hideGenericMessagesInConsole && logger.info(
                '\x1B[32m%s\x1B[0m',
                moduleName,
                'hook:generate:page',
            );

            result.html = pruneHtml(
                result.html,
                options,
            );

        },
    );

}

const meta = PACKAGE;

export { meta };

/*
    hooks: {
        generate:page,
        render: {
            route(
                _,
                result,
                { req },
            ) {

                // Eliminare tutti gli script per i bot:
                // https://github.com/nuxt/nuxt.js/issues/2822
                // https://www.npmjs.com/package/prune-html

                const userAgent = req.headers[ 'user-agent' ]
                    , mobileDetect = new MobileDetect(
                        userAgent,
                    )
                    , isBot = mobileDetect.is(
                        'bot',
                    )
                    , isLighthouse = mobileDetect.match(
                        'lighthouse',
                    )
                ;

                if( isBot || isLighthouse ) {

                    result.html = pruneHtml(
                        [
                            'link[rel="preload"][as="script"]',
                            'script:not([type="application/ld+json"])',
                        ],
                        result.html
                    );

                }

            },
        },
    },
*/
