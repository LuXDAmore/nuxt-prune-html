/*
*   * Default Config
*/
export default {
    enabled: false, // `true` in production
    hideGenericMessagesInConsole: false, // `false` in production
    hideErrorsInConsole: false, // disable the `console.error` method
    hookRenderRoute: true, // Activate in `hook:render:route`
    hookGeneratePage: true, // Activate in `hook:generate:page`
    selectors: [
        // CSS selectors to prune
        'link[rel="preload"][as="script"]',
        'script:not([type="application/ld+json"])',
    ],
    selectorsToKeep: null, // disallow pruning of scripts with this class (could be an array of classes), N.B.: each `selectorsToKeep` will be appended to every `selectors`, ex.: `script:not([type="application/ld+json"]):not(__selectorToKeep__)`
    link: [], // Inject custom links, only if pruned
    script: [], // Inject custom scripts, only if pruned
    htmlElementClass: null, // this is a string added as a class to the <html> element
    cheerio: {
        // this is the config passed in the `cheerio.load(__config__)` method
        xmlMode: false,
    },
    types: [
        // it's possibile to add different rules/types of pruning
        // array of values: [ 'mobile-detect', 'query-parameters', 'headers-exist' ]
        // ex.: `[ 'headers-exist' ]` force only to check query-parameters values
        'mobile-detect',
    ],
    // 👇🏻 Type: `mobile-detect`
    headerName: 'user-agent', // The header-key base for `mobile-detect`, `req.headers[ headerName ]`
    isBot: true, // remove selectors if is a bot
    isAudit: true, // remove selectors if match the `auditUserAgent`
    ignoreBotOrAudit: false, // remove selectors in any case, not depending on Bot or Audit
    auditUserAgent: 'lighthouse', // prune if `res.header[ headerName ]` match with this value, could be a string or an array of strings
    matchUserAgent: null, // prune if `res.header[ headerName ]` match with this value, could be a string or an array of strings
    // 👇🏻 Type: 'query-parameters', (you can also specify routes in the `nuxt.config`, ex.: `{ generate: { routes: [ '/?prune=true' ] } }` )
    queryParametersToPrune: [
        // array of objects (key-value), trigger the pruning if 'query-parameters' is present in `types` and at least one value, ex. `/?prune=true`
        {
            key: 'prune',
            value: 'true',
        },
    ],
    queryParametersToExcludePrune: [], // same as `queryParametersToPrune`, exclude the pruning if 'query-parameters' is present in `types` and at least one value is matched, this priority is over than `queryParametersToPrune`
    // 👇🏻 Type: 'headers-exist'
    headersToPrune: [], // same as `queryParametersToPrune`, but it checks `req.headers`
    headersToExcludePrune: [], // same as `queryParamToExcludePrune`, but it checks `req.headers`, this priority is over than `headersToPrune`
    // Events, callbacks
    onBeforePrune: null, // ({ result, [ headers, res ] }) => {}, `headers` and `res` are not available on `generate`
    onAfterPrune: null, // ({ result, [ headers, res ] }) => {}, `headers` and `res` are not available on `generate`
};
