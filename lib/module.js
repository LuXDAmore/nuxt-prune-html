/*
*   * Third party
*/
import cheerio from 'cheerio';
import MobileDetect from 'mobile-detect';

/*
*   * Config
*/
import * as PACKAGE from '../package.json';
import { defaultConfig, deprecatedConfig } from './config';

/*
*   * Log
*/
import log from './logger';
import { stringToArray } from './utils';

/*
*   * Module info
*/
const moduleName = 'prune-html'
    , logger = log(
        `nuxt:${ moduleName }`,
    )
;

/*
*   * Module method
*/
export default function nuxtPruneHtml(
    moduleOptions,
) {

    /*
    *   * User Options
    */
    const options = {
        ... defaultConfig,
        enabled: ! this.options.dev,
        hideGenericMessagesInConsole: ! this.options.dev,
        ... moduleOptions || {},
        ... this.options[ moduleName ] || {},
        ... this.options.pruneHtml || {},
    };

    /*
    *   * Check for correct config
    */
    if( ! options.enabled || ! options.selectors.length ) {

        ! options.selectors.length && logger.error(
            '\x1B[31m%s\x1B[0m',
            moduleName,
            'a `selectors` key with a value must be present in the configuration object',
            options
        );

        return;

    }

    /*
    *   * Check for Deprecated config values
    */
    if( deprecatedConfig ) {

        const configKeys = Object.keys( options )
            , deprecatedConfigKeys = Object.keys( deprecatedConfig )
            , isOldOrInvalidConfig = deprecatedConfigKeys.some( v => configKeys.includes( v ) )
        ;

        if( isOldOrInvalidConfig ) {

            logger.error(
                '\x1B[31m%s\x1B[0m',
                moduleName,
                'please, upgrade your configuration, there are some deprecation warnings',
                deprecatedConfig
            );

            return;

        }

    }

    /*
    *   * Pruning
    */
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

                const selector = selectorToKeep
                    ? `${ s }:not(${ selectorToKeep })`
                    : s
                ;

                $( selector ).remove();

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

                    for( const key of Object.keys( item ) ) {

                        key !== 'position' && item[ key ] && (
                            scriptOrLink += `${ key }=${ item[ key ] } `
                        );

                    }

                    scriptOrLink += isScript
                        ? '></script>'
                        : '/>'
                    ;

                    switch( item.position ) {
                        case 'phead':
                            $( 'head' ).prepend( scriptOrLink ); break;
                        case 'head':
                            $( 'head' ).append( scriptOrLink ); break;
                        case 'pbody':
                            $( 'body' ).prepend( scriptOrLink );
                        break;
                        case 'body':
                        default:
                            $( 'body' ).append( scriptOrLink );
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

        } catch( error ) {

            ! options.hideErrorsInConsole && logger.error(
                '\x1B[31m%s\x1B[0m',
                moduleName,
                'there was a problem pruning the HTML',
                error,
            );

        }

        return html;

    };

    /*
    *   * Triggers
    */
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

            /*
            *   * User Agents
            */
            const userAgent = req.headers[ options.headerName ]
                , mobileDetect = new MobileDetect(
                    userAgent,
                )
                , ignoreBotOrAudit = options.ignoreBotOrAudit
                , isBot = (
                    options.isBot
                    && mobileDetect.is(
                        'bot',
                    )
                )
                , isAudit = (
                    options.isAudit
                    && ( options.auditUserAgent && options.auditUserAgent.length )
                    && stringToArray( options.auditUserAgent ).some( v => mobileDetect.match( v ) )
                )
                , isMatched = (
                    options.matchUserAgent && options.matchUserAgent.length
                    && stringToArray( options.matchUserAgent ).some( v => mobileDetect.match( v ) )
                )
                // Should be pruned?
                , shouldPrune = ( ignoreBotOrAudit || isBot || isAudit ) || isMatched
            ;

            if( ! shouldPrune )
                return;

            result.html = pruneHtml(
                result.html,
                options,
            );

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

// Exports
const meta = PACKAGE;

export { meta };

// REQUIRED if publishing the module as npm package
module.exports.meta = require(
    '../package.json'
);
