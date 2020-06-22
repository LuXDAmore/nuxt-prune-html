// Third party
import cheerio from 'cheerio';
import MobileDetect from 'mobile-detect';

// Config
import * as PACKAGE from '../package.json';
import defaultConfig from './config';

// Log
import log from './logger';

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
            selectorToKeep = null,
            script = [],
            link = [],
        }
    ) => {

        if( ! html )
            return '';

        try {

            const $ = cheerio.load(
                html,
                cheerioConfig
            );

            for( const s of selectors ) {

                const selector = ! selectorToKeep
                    ? s
                    : `${ s }:not(${ selectorToKeep })`
                ;

                $(
                    selector
                ).remove();

            }

            ! options.hideGenericMessagesInConsole && logger.info(
                '\x1B[32m%s\x1B[0m',
                moduleName,
                'HTML correctly pruned',
            );

            // Inject script only for matched UA
            if( script && script.length || link && link.length ) {

                // Transform to Cheerio
                const transformToHtml = (
                    item,
                    isScript = true
                ) => {

                    let scriptOrLink = isScript
                        ? '<script '
                        : '<link '
                    ;

                    Object
                        .keys(
                            item
                        )
                        .forEach(
                            key => {

                                key !== 'position' && item[ key ] && (
                                    scriptOrLink += `${ key }=${ item[ key ] } `
                                );

                            }
                        )
                    ;

                    scriptOrLink += isScript
                        ? '></script>'
                        : '/>'
                    ;

                    switch( item.position ) {
                        case 'phead':
                            $(
                                'head'
                            ).prepend(
                                scriptOrLink
                            );
                        break;
                        case 'head':
                            $(
                                'head'
                            ).append(
                                scriptOrLink
                            );
                        break;
                        case 'pbody':
                            $(
                                'body'
                            ).prepend(
                                scriptOrLink
                            );
                        break;
                        case 'body':
                        default:
                            $(
                                'body'
                            ).append(
                                scriptOrLink
                            );
                    }

                };

                script.length && script.forEach(
                    item => transformToHtml(
                        item,
                    )
                );

                link.length && link.forEach(
                    item => transformToHtml(
                        item,
                        false
                    )
                );

                ! options.hideGenericMessagesInConsole && logger.info(
                    '\x1B[32m%s\x1B[0m',
                    moduleName,
                    'Scripts and links correctly injected',
                );

            }

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

            const userAgent = req.headers[ options.headerName ]
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
