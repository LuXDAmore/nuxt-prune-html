/*
*   * Default Config
*/
export default {
    enabled: false, // `true` in production
    hideGenericMessagesInConsole: false, // `false` in production
    hideErrorsInConsole: false, // disable the `console.error` method
    selectors: [
        // CSS selectors to prune
        'link[rel="preload"][as="script"]',
        'script:not([type="application/ld+json"])',
    ],
    selectorsToKeep: null, // disallow pruning of scripts with this class (could be an array of classes), N.B.: each `selectorsToKeep` will be appended to every `selectors`, ex.: `script:not([type="application/ld+json"]):not(__selectorToKeep__)`
    script: [], // Inject custom scripts only if pruning
    link: [], // Inject custom links only if pruning
    cheerio: {
        // it use the Cheerio library under the hood, so this is the config passed in the `cheerio.load(__config__)` method
        xmlMode: false,
    },
    htmlElementClassOnPrune: null, // this is a string added as a class to the <html> tag (cheerio.addClass())
    hookRenderRoute: true, // Activate in `hook:render:route`
    hookGeneratePage: true, // Activate in `hook:generate:page`
    types: [
        // it's possibile to add different rules/types of pruning
        // array of values: [ 'mobile-detect', 'query-parameters', 'header-exist' ]
        // ex.: `[ 'query-parameters' ]` force only to check query-parameters values
        'mobile-detect',
    ],
    // 👇🏻 Type: `mobile-detect` (always trigger prune during `generate`, if `hookGeneratePage` is `true`)
    headerName: 'user-agent', // The header-key base for `mobile-detect`, `req.headers[ headerName ]`
    isBot: true, // remove selectors if is a bot
    isAudit: true, // remove selectors if match the `auditUserAgent`
    ignoreBotOrAudit: false, // remove selectors in any case, not depending on Bot or Audit
    auditUserAgent: 'lighthouse', // prune if `res.header[ headerName ]` match with this value, could be a string or an array of strings
    matchUserAgent: null, // prune if `res.header[ headerName ]` match with this value, could be a string or an array of strings
    // 👇🏻 Type: 'query-parameters', (you can also specify routes in the generate process, ex.: `generate: { routes: [ '/?prune=true' ] }` )
    queryParamToPrune: [
        // array of objects (key-value), trigger the pruning if 'query-parameters' is present in `types` and at least one value is matched from the query-parameters, ex. `/?prune=true`
        {
            key: 'prune',
            value: 'true',
        },
    ],
    queryParamToExcludePrune: [], // same as `queryParamToPrune`, exclude the pruning if 'query-parameters' is present in `types` and at least one value is matched from the query-parameters, this is priority over `queryParamToPrune`
    // 👇🏻 Type: 'header-exist' (always trigger prune during `generate`, if `hookGeneratePage` is `true`)
    headersToPrune: [], // same as `queryParamToPrune`, but it checks `req.headers` for `key-value`
    headersToExcludePrune: [], // same as `queryParamToExcludePrune`, but it checks `req.headers`, this is priority over `headersToPrune`
    // Events, callbacks
    onBeforePrune: null, // ({ result, [ headers, res ] }) => {}, `headers` and `res` are not available on `generate`
    onAfterPrune: null, // ({ result, [ headers, res ] }) => {}, `headers` and `res` are not available on `generate`
};
