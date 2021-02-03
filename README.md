# 🔌⚡ Nuxt Prune HTML

[![Code Quality][quality-src]][quality-href]
[![Version][npm-version-src]][npm-version-href]
[![Downloads][npm-downloads-src]][npm-downloads-href]
[![Dependencies][dependencies-src]][dependencies-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Donate][paypal-donate-src]][paypal-donate-href]

[quality-src]: https://img.shields.io/badge/code%20quality-A-informational?style=flat
[quality-href]: https://luxdamore.github.io/nuxt-prune-html/

[npm-version-src]: https://img.shields.io/npm/v/@luxdamore/nuxt-prune-html/latest.svg?style=flat&color=darkorange&label=version
[npm-version-href]: https://npmjs.com/package/@luxdamore/nuxt-prune-html

[npm-downloads-src]: https://img.shields.io/npm/dt/@luxdamore/nuxt-prune-html.svg?style=flat&color=darkgreen
[npm-downloads-href]: https://npmjs.com/package/@luxdamore/nuxt-prune-html

[dependencies-src]: https://img.shields.io/badge/dependencies-up%20to%20date-darkgreen.svg?style=flat
[dependencies-href]: https://npmjs.com/package/@luxdamore/nuxt-prune-html

[circle-ci-src]: https://img.shields.io/circleci/project/github/LuXDAmore/nuxt-prune-html.svg?style=flat&color=darkgreen
[circle-ci-href]: https://circleci.com/gh/LuXDAmore/nuxt-prune-html

[paypal-donate-src]: https://img.shields.io/badge/paypal-donate-black.svg?style=flat
[paypal-donate-href]: https://www.paypal.me/luxdamore
[patreon-donate-href]: https://www.patreon.com/luxdamore
[kofi-donate-href]: https://ko-fi.com/luxdamore

> Nuxt module to prune html before sending it to the browser (it removes elements matching CSS selector(s)), useful for boosting performance showing a different HTML for bots/audits by removing all the scripts with dynamic rendering.

## 💘 Motivation

Due to the versatility of Nuxt (and of the SSR in general), a website generated (or served) via node server, has everything it needs already injected (in the HTML, ex. styles). So, usually, for a bot or for a human, the website its almost visually the same without Javascript.

This library is born to remove the scripts injected in the HTML **only** if a visitor is a **Bot** (or a "**Performance Audit**", ex. **Lighthouse**).
This should **speed up** (**blazing fast**) your *nuxt-website* up to a value of **~95** in **performance** during an *Audit* because it [cheats various scenarios](https://web.dev/lighthouse-performance/).

> Inspired by this [rcfs](https://github.com/nuxt/rfcs/issues/22) and this [issue](https://github.com/nuxt/nuxt.js/issues/2822).

### Features

- Prune based on **mobile detection**;
  - Match the **user agent**;
  - Match a **bot**;
  - Match an **audit**;
- Prune based on **headers values** (*useful in Lambdas*);
- Prune based on **query parameters** (*useful during navigation or generation, for an hybrid-experience*).

### Pro et contra

> This could cause some unexpected behaviors.

**Cons.:**

- no [`SPA routing`](https://nuxtjs.org/docs/2.x/concepts/server-side-rendering/#server-side-rendering-steps-with-nuxtjs) on `client-side` for **bots and audits**;
- no [`hydration`](https://ssr.vuejs.org/guide/hydration.html) on `client-side` for **bots and audits**:
  - ex. [`vue-lazy-hydration`](https://github.com/maoberlehner/vue-lazy-hydration), _hydrateOnInteraction_, _hydrateWhenIdle_ and _hydrateWhenVisible_ are **javascript client-side code** so they're pruned out;
- no [`<client-only>` components](https://nuxtjs.org/api/components-client-only/);
- can break `lazy-load` for images.

**Pros.:**

- some of these features **aren't "used by"** a bot/audit, so you don't really need them:
  - bots doesn't handle `SPA routing`;
  - [`<client-only>` components](https://nuxtjs.org/api/components-client-only/) could lead in a slower TTI;
  - [`<client-only>` components](https://nuxtjs.org/api/components-client-only/) can contain a [static placeholder](https://nuxtjs.org/api/components-client-only/);
- `lazy-load` for images can be fixed with a [native attribute](https://web.dev/native-lazy-loading/), or with a custom `script`/`selectorToKeep` (_check the configuration_);
- `hydration` **decrease** performance, so it's ok to prune it for `bots or audits`;
- less HTML, assets and resources are served to browsers and clients;
- bot/audit only have the Javascript they need;
- with **less assets** to download, the number of urls crawled are **widely boosted**;
- bots, [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), [Google Measure](https://web.dev/measure/) and [Lighthouse Audit](https://developers.google.com/web/tools/lighthouse) are already pruned by the plugin with the default configuration;
- faster [web-vitals](https://web.dev/vitals/), faster TTI, faster FCP, faster FMP, **faster all**.

**N.B.:** _This is known as [Dynamic Rendering](https://developers.google.com/search/docs/guides/dynamic-rendering) and **it's not** considered [black-hat](https://www.wordstream.com/black-hat-seo) or [cloaking](https://en.wikipedia.org/wiki/Cloaking)_.

___

#### 💡 Lighthouse

![Lighthouse Audit before](./src/static/lighthouse/before.jpg)
![Lighthouse Audit after](./src/static/lighthouse/after.jpg)

___

## Setup

1. Install `@luxdamore/nuxt-prune-html` as a dependency:
   - `yarn add @luxdamore/nuxt-prune-html`;
   - or, `npm install --save @luxdamore/nuxt-prune-html`;
2. Add `@luxdamore/nuxt-prune-html` in the `modules` array of your `nuxt.config.js`.

## Configuration

```js

    // nuxt.config.js
    export default {

        // Module - extension
        modules: [ '@luxdamore/nuxt-prune-html' ],

        // Module - default config
        pruneHtml: {
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
            // Emitted events for callbacks methods
            onBeforePrune: null, // ({ result, [ headers, res ] }) => {}, `headers` and `res` are not available on `generate`
            onAfterPrune: null, // ({ result, [ headers, res ] }) => {}, `headers` and `res` are not available on `generate`
        },

    };

```

With `link` and `script` it's possibile to add one or more objects on the pruned HTML, ex.:

```javascript

    export default {
        pruneHtml: {
            link: [
                {
                    rel: 'preload',
                    as: 'script',
                    href: '/my-custom-lazy-load-for-bots.js',
                    position: 'phead', // Default value is 'body', other allowed values are: 'phead', 'head' and 'pbody'
                },
                {
                    rel: 'stylesheet',
                    href: '/my-custom-styles-for-bots.css',
                    position: 'head',
                },
            ],
            script: [
                {
                    src: '/my-custom-lazy-load-for-bots.js',
                    lazy: true,
                    defer: true,
                },
            ],
        },
    };

```

> **N.B.:** _the config is only shallow merged, not deep merged_.

___

### Related things you should know

- Usage with `types: [ 'mobile-detect' ]`, load the [MobileDetect](http://hgoebl.github.io/mobile-detect.js/) library and check if `req.headers[ headerName ]`:
  - `.is( 'bot' )`;
  - and/or `.match( options.auditUserAgent )`;
  - and/or `.match( options.matchUserAgent )`;
- Nuxt [hooks](https://nuxtjs.org/api/configuration-hooks/), the plugin has access to `req.headers` only if the project is **running as a server** (ex. `nuxt start`);
- It use [Cheerio](https://github.com/cheeriojs/cheerio), *jQuery for servers*, library to **filter and prune** the html.

___

### Advices

- Before setting up the module, try to [Disable JavaScript With Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript/disable) while navigate your website, **this is how your website appear (when *prune* is activated)**;
- If you `generate` your site it's not possibile to check *req.headers*, so, I choose to **always prune** (for types `mobile-detect` and/or `headers-exist`), but You can disable this behavior by setting `hookGeneratePage` to `false` (or by using type `query-parameters`);
- If you use [`<client-only>` components](https://nuxtjs.org/api/components-client-only/) you should prepare a version that is visually the same with the [placeholder slot](https://nuxtjs.org/api/components-client-only/);
- This plugin was thought for *Bots / Audits* and uses only few `methods` from the `Cheerio` library;
- You can check the website as a *GoogleBot*, following [this guide](https://developers.google.com/web/tools/chrome-devtools/device-mode/override-user-agent).

___

## 👩🏻‍💻👨🏻‍💻 Development

1. **Clone** this repository:
   - `git clone https://github.com/LuXDAmore/nuxt-prune-html.git`;
2. **Install** the dependencies:
   - `yarn install` (or `npm install`);
3. **Start** the development server:
   - `yarn dev` (or `npm run dev`);
4. **Extra**, generate the documentation ([*Github Pages*](https://pages.github.com/)):
   - `yarn generate` (or `npm run generate`);
   - _the content is automatically generated into the `/docs` folder_.

## 🐞 Issues

Please make sure to read the [Issue Reporting Checklist](/.github/ISSUE_TEMPLATE/bug_report.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## 👥 Contribution

Please make sure to read the [Contributing Guide](/.github/ISSUE_TEMPLATE/feature_request.md) before making a pull request.

## 📖 Changelog

Details changes for each release are documented in the [**release notes**](./CHANGELOG.md).

### 📃 License

[MIT License](./LICENSE) // Copyright (©) 2019-present [Luca Iaconelli](https://lucaiaconelli.it)

#### 💼 Hire me

[![Contacts](https://img.shields.io/badge/Contact%20Me-Let's%20Talk-informational?style=social&logo=minutemailer)](https://lucaiaconelli.it)

#### 💸 Are you feeling generous today?

If You want to share a beer, we can be really good friends 😄

__[Paypal][paypal-donate-href] // [Patreon][patreon-donate-href] // [Ko-fi][kofi-donate-href]__

> ☀ _It's always a good day to be magnanimous_ - cit.
