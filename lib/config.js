export default {
    hideErrorsInConsole: false,
    hideGenericMessagesInConsole: false, // Disabled in production
    enabled: false, // Disabled in dev-mode due to the hot reload (is client-side)
    selectors: [ // Css selectors to prune
        'link[rel="preload"][as="script"]',
        'script:not([type="application/ld+json"])',
    ],
    selectorToKeep: null, // Disallow pruning of scripts with this class, N.B.: this selector will be appended to every selectors, `ex. script:not([type="application/ld+json"]):not(__VALUE__)`
    script: [], // Inject custom scripts only for matched UA (BOTS-only)
    link: [], // Inject custom links only for matched UA (BOTS-only)
    cheerio: { // It use Cheerio under the hood, so this is the config passed in the cheerio.load() method
        xmlMode: false,
    },
    ignoreBotOrLighthouse: false, // Remove selectors in any case, not depending on Bot or Lighthouse
    isBot: true, // Remove selectors if is a bot
    isLighthouse: true, // Remove selectors if match the Lighthouse UserAgent
    matchUserAgent: null, // Remove selectors if this userAgent is matched
    hookRenderRoute: true, // Activate in `hook:render:route`
    hookGeneratePage: true, // Activate in `hook:generate:page`
    lighthouseUserAgent: 'lighthouse', // Value of the Lighthouse UserAgent
    headerName: 'user-agent', // Override header name, defaults to 'user-agent'
};
