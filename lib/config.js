export default {
    hideErrorsInConsole: false,
    hideGenericMessagesInConsole: false, // Disabled in production
    enabled: false, // Disabled in dev-mode due to the hot reload (is client-side)
    // Css selectors to prune
    selectors: [
        'link[rel="preload"][as="script"]',
        'script:not([type="application/ld+json"])',
    ],
    // It use Cheerio under the hood, so this is the config passed in the cheerio.load() method
    cheerio: {
        xmlMode: false,
    },
    ignoreBotOrLighthouse: false, // Remove selectors in any case, not depending on Bot or Lighthouse
    isBot: true, // Remove selectors if is a bot
    isLighthouse: true, // Remove selectors if match the Lighthouse UserAgent
    matchUserAgent: null, // Remove selectors if this userAgent is matched
    hookRenderRoute: true, // Activate in `hook:render:route`
    hookGeneratePage: true, // Activate in `hook:generate:page`
    lighthouseUserAgent: 'lighthouse', // Value of the Lighthouse UserAgent
};
