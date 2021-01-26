/*
*   * Default Config
*/
export default {
    hideErrorsInConsole: false,
    hideGenericMessagesInConsole: false, // `false` in production
    enabled: false, // `true` in production, due of the `webpack hot-reload` that is client-side javascript
    selectors: [
        // CSS selectors to prune
        'link[rel="preload"][as="script"]',
        'script:not([type="application/ld+json"])',
    ],
    selectorToKeep: null, // Disallow pruning of scripts with this class (could be an array of classes), N.B.: each selector will be appended to every `selectors`, `ex. script:not([type="application/ld+json"]):not(__selectorToKeep__)`
    script: [], // Inject custom scripts only for matched UA (for bots and audits only)
    link: [], // Inject custom links only for matched UA (for bots and audits only)
    cheerio: {
        // It use the Cheerio library under the hood, so this is the config passed in the cheerio.load() method
        xmlMode: false,
    },
    ignoreBotOrAudit: false, // Remove selectors in any case, not depending on Bot or an Audit
    isBot: true, // Remove selectors if is a bot
    isAudit: true, // Remove selectors if match the `auditUserAgent`
    hookRenderRoute: true, // Activate in `hook:render:route`
    hookGeneratePage: true, // Activate in `hook:generate:page`
    matchUserAgent: null, // Remove selectors if this userAgent is matched
    headerName: 'user-agent', // The header-key value used for the detection from the request
    auditUserAgent: 'lighthouse', // Value of the Audit User Agent request header to check
    // TODO: New config, queryParams? checkHeaderExistenceOnly? onBeforePrune? onAfterPrune? selectorToKeep(array)? changedStringLighthouse?
};
