/*
*   * Third party
*/
import { load } from 'cheerio';

/*
*   * Config
*/
import * as PACKAGE from '../package.json';
import { defaultConfig, deprecatedConfig } from './config';

/*
*   * Utils
*/
import log from './logger';
import { stringToArray, scriptOrLinkToHtml } from './utils';
import { queryParametersChecker, acceptQueryParameters } from './query-parameters';

/*
*   * Module info
*/
const moduleName = 'prune-html'
    , { error, info } = log(
        `nuxt:${ moduleName }`,
    )
;

/*
*   * Module method
*/
export default function nuxtPruneHtml(
    moduleOptions
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
    if( ! options.enabled || ! options.selectors.length || ! options.types.length )
        return;

    /*
    *   * Loggers, TODO: could be a `scoped function`
    */
    const logAnError = ( message = '', extra = '', show = ! options.hideErrorsInConsole ) => {

            show && error(
                '\x1B[31m%s\x1B[0m',
                moduleName,
                message,
                extra
            );

        }
        , logAMessage = ( message = '', extra = '', show = ! options.hideGenericMessagesInConsole ) => {

            show && info(
                '\x1B[32m%s\x1B[0m',
                moduleName,
                message,
                extra
            );

        }
    ;

    /*
    *   * Check for Deprecated config values
    */
    if( deprecatedConfig ) {

        const configKeys = Object.keys( options )
            , deprecatedConfigKeys = Object.keys( deprecatedConfig )
            , isOldOrInvalidConfig = deprecatedConfigKeys.some( v => configKeys.includes( v ) )
        ;

        if( isOldOrInvalidConfig ) {

            logAnError(
                'please, upgrade your configuration, there are some deprecation warnings, the plugin will stop its execution',
                deprecatedConfig,
            );

            return;

        }

    }

    /*
    *   * Pruning
    */
    function pruneHtml(
        html = '',
        {
            cheerio: cheerioConfig = {},
            selectors = [],
            classesSelectorsToKeep = [],
            script = [],
            link = [],
            types = [],
            htmlElementClass = null,
        }
    ) {

        if( ! html )
            return '';

        // Selector to selectors (in case of array)
        const classesSelectorsToKeepToArray = stringToArray( classesSelectorsToKeep );

        // Let's prune
        try {

            // Cheerio HTML
            const $ = load(
                html,
                cheerioConfig
            );

            // Selector to prune/keep
            for( const s of selectors ) {

                if( classesSelectorsToKeepToArray.length )
                    classesSelectorsToKeepToArray.forEach( keepMe => $( `${ s }:not(${ keepMe })` ).remove() );
                 else
                    $( s ).remove();

            }

            logAMessage(
                'html correctly pruned on type(s)',
                types.join( ', ' )
            );

            // Inject script only when prune
            if( link.length || script.length ) {

                link.length && link.forEach(
                    item => scriptOrLinkToHtml(
                        $,
                        item,
                        false
                    )
                );

                script.length && script.forEach(
                    item => scriptOrLinkToHtml(
                        $,
                        item,
                    )
                );

                logAMessage(
                    'scripts and/or links correctly injected',
                    {
                        scripts: script.length,
                        links: link.length,
                    }
                );

            }

            // Inject classes to the html tag
            htmlElementClass && $( 'html' ).addClass( htmlElementClass );

            return $.html();

        } catch( error ) {

            logAnError(
                'there was a problem pruning the HTML',
                error,
            );

        }

        return html;

    }

    /*
    *   * Types
    */
    const isTypeDefaultDetect = ( options.types || [] ).includes( 'default-detect' ) && !! options.headerNameForDefaultDetection
        , isTypeQueryParameters = ( options.types || [] ).includes( 'query-parameters' )
        , isTypeHeaders = ( options.types || [] ).includes( 'headers-exist' )
    ;

    /*
    *   * Triggers
    */
    options.hookRenderRoute && this.nuxt.hook(
        'render:route',
        async(
            _,
            result,
            {
                res,
                req: {
                    headers,
                    _parsedUrl,
                },
            },
        ) => {

            logAMessage( 'hook::render:route' );

            /*
            *   * Pruners
            */
            let shouldPruneFromBotAuditOrMobileDetection
                , shouldPruneFromQueryParameter
                , shouldPruneFromHeaderExist = false
            ;

            /*
            *   * default-detect, check `req.headers` with `MobileDetect` (User Agent / Audit)
            */
            if( isTypeDefaultDetect && headers && headers[ options.headerNameForDefaultDetection ] ) {

                const MobileDetect = require( 'mobile-detect' )
                    , mobileDetect = new MobileDetect(
                        headers[ options.headerNameForDefaultDetection ],
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
                    , isUserAgentMatched = (
                        options.matchUserAgent && options.matchUserAgent.length
                        && stringToArray( options.matchUserAgent ).some( v => mobileDetect.match( v ) )
                    )
                ;

                // Should prune?
                shouldPruneFromBotAuditOrMobileDetection = !! ( ( ignoreBotOrAudit || isBot || isAudit ) || isUserAgentMatched );

            }

            /*
            *   * query-parameters, can include or exclude urls
            */
            if( isTypeQueryParameters && _parsedUrl ) {

                const hasValidQueryParameters = acceptQueryParameters(
                        _parsedUrl.query,
                        options.queryParametersToPrune,
                        options.queryParametersToExcludePrune
                    )
                    , shouldExcludePrune = (
                        hasValidQueryParameters
                        && queryParametersChecker(
                            _parsedUrl.query,
                            options.queryParametersToExcludePrune
                        )
                    )
                ;

                // Should prune?
                if( shouldExcludePrune )
                    return;

                shouldPruneFromQueryParameter = (
                    hasValidQueryParameters
                    && queryParametersChecker(
                        _parsedUrl.query,
                        options.queryParametersToPrune
                    )
                );

            }

            /*
            *   * header-exists, check `req.headers`, can include or exclude pages
            */
            if( isTypeHeaders && headers ) {

                const headersExists = !! (
                        ( options.headersToPrune && options.headersToPrune.length )
                        || ( options.headersToExcludePrune && options.headersToExcludePrune.length )
                    )
                    , shouldExcludePrune = (
                        headersExists && options.headersToExcludePrune.some(
                            ( { key, value } ) => ( typeof headers[ key ] !== 'undefined' && headers[ key ] === value )
                        )
                    )
                ;

                // Should prune?
                if( shouldExcludePrune )
                    return;

                shouldPruneFromHeaderExist = (
                    headersExists && options.headersToPrune.some(
                        ( { key, value } ) => ( typeof headers[ key ] !== 'undefined' && headers[ key ] === value )
                    )
                );

            }

            // Should prune?
            if( ! shouldPruneFromBotAuditOrMobileDetection && ! shouldPruneFromQueryParameter && ! shouldPruneFromHeaderExist )
                return;

            /*
            *   * Events
            */
            options.onBeforePrune && typeof options.onBeforePrune === 'function' && await options.onBeforePrune(
                {
                    result,
                    headers,
                    res,
                }
            );

            /*
            *   * New HTML
            */
            result.html = pruneHtml(
                result.html,
                options,
            );

            /*
            *   * Events
            */
            options.onAfterPrune && typeof options.onAfterPrune === 'function' && await options.onAfterPrune(
                {
                    result,
                    headers,
                    res,
                }
            );

        },
    );

    options.hookGeneratePage && this.nuxt.hook(
        'generate:page',
        async result => {

            logAMessage( 'hook::generate:page' );

            /*
            *   * Pruners
            */
            const shouldPruneFromBotAuditOrMobileDetection = isTypeDefaultDetect
                , shouldPruneFromHeaderExist = isTypeHeaders
            ;

            // Query params
            let shouldPruneFromQueryParameter = false;

            if( isTypeQueryParameters && result.route ) {

                const query = result.route.split( '?' ).pop()
                    , hasValidQueryParameters = acceptQueryParameters(
                        query,
                        options.queryParametersToPrune,
                        options.queryParametersToExcludePrune
                    )
                    , shouldExcludePrune = (
                        hasValidQueryParameters
                        && queryParametersChecker(
                            query,
                            options.queryParametersToExcludePrune
                        )
                    )
                ;

                // Should prune?
                if( shouldExcludePrune )
                    return;

                shouldPruneFromQueryParameter = (
                    hasValidQueryParameters
                    && queryParametersChecker(
                        query,
                        options.queryParametersToPrune
                    )
                );

            }

            // Should prune?
            if( ! shouldPruneFromBotAuditOrMobileDetection && ! shouldPruneFromQueryParameter && ! shouldPruneFromHeaderExist )
                return;

            /*
            *   * Events
            */
            options.onBeforePrune && typeof options.onBeforePrune === 'function' && await options.onBeforePrune(
                {
                    result,
                }
            );

            /*
            *   * New HTML
            */
            result.html = pruneHtml(
                result.html,
                options,
            );

            /*
            *   * Events
            */
            options.onAfterPrune && typeof options.onAfterPrune === 'function' && await options.onAfterPrune(
                {
                    result,
                }
            );

        },
    );

}

/*
*   * Exports
*/
const meta = PACKAGE;

export { meta };

/*
*   * REQUIRED: if publishing the module as npm package
*/
module.exports.meta = require(
    '../package.json'
);
