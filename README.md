# 🎉 Nuxt Prune HTML

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Dependencies][dependencies-src]][dependencies-href]
[![License][license-src]][license-href]
[![Donate][donate-src]][donate-href]

[npm-version-src]: https://img.shields.io/npm/v/@luxdamore/nuxt-prune-html/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@luxdamore/nuxt-prune-html

[npm-downloads-src]: https://img.shields.io/npm/dt/@luxdamore/nuxt-prune-html.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@luxdamore/nuxt-prune-html

[circle-ci-src]: https://img.shields.io/circleci/project/github/LuXDAmore/nuxt-prune-html.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/LuXDAmore/nuxt-prune-html

[dependencies-src]: https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg?style=flat-square
[dependencies-href]: https://npmjs.com/package/@luxdamore/nuxt-prune-html

[license-src]: https://img.shields.io/npm/l/@luxdamore/nuxt-prune-html.svg?style=flat-square
[license-href]: https://npmjs.com/package/@luxdamore/nuxt-prune-html

[donate-src]: https://img.shields.io/badge/paypal-donate-black.svg?style=flat-square
[donate-href]: https://www.paypal.com/paypalme2/luxdamore

> Nuxt module to prune html before sending it to the browser (it removes elements matching CSS selector(s)), useful for boosting performance showing a different HTML for bots by removing all the scripts with dynamic rendering.

## 💘 Motivation

Due to the versatility of Nuxt (and of the SSR in general), a website generated (or served) via node, has everything it needs already injected (in the HTML, ex. styles).
So, usually, for a bot or for a human, the website its almost visually the same without Javascript.

These library was born to remove the scripts injected in the HTML only if a visitor is a **Bot** or a "**Chrome Lighthouse**". This should **speed up** (**blazing fast**) your *nuxt-website* up to a value of **~95** in **performance** during an *Audit* because it [cheats various scenarios](https://web.dev/lighthouse-performance/).

> Obviously this could cause some unexpected behaviors.

### Pro et contra

**_N.B. : Valid for Bots, PageSpeed Insights, Google Measure and Lighthouse Audits. This is known as [Dynamic Rendering](https://developers.google.com/search/docs/guides/dynamic-rendering)_**

**Cons:**

- no SPA navigation;
- no lazy-load for images (only if [native](https://web.dev/native-lazy-loading/), or with a custom `script` or with `selectorToKeep` );
- no `<client-only>` [html](https://nuxtjs.org/api/components-client-only/).

**Pro:**

- some of these features aren't "used by" a Bot or a Lighthouse Audit, so you don't really need them (ex. Bots doesn't need `SPA navigation`, `client-only` tags could lead in a slower TTI);
- less HTML;
- BOTS only have the Javascript they need;
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), [Measure](https://web.dev/measure/) and [Lighthouse Audit in Chrome](https://developers.google.com/web/tools/lighthouse) are already triggered by the plugin without the needing of change any value;
- fast TTI, fast FCP, fast FMP, *fast all*.

Inspired by this [rcfs](https://github.com/nuxt/rfcs/issues/22) and this [issue](https://github.com/nuxt/nuxt.js/issues/2822).

___

### Advices

- Before setting up the module, try to [Disable JavaScript With Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript/disable) while navigate your website, **this is how your website appear to a Bot (with this module activated)**;
- If you `generate` your site it's not possibile to check the *user-agent*, so i choose to always prune HTML (you can disable this behavior by setting the `hookGeneratePage` configuration value to `false`);
- If you use some `<client-only>` components, you should prepare a version that is visually the same with the [placeholder slot](https://nuxtjs.org/api/components-client-only/);
- This plugin was thought for Bots and uses only the `remove()` method of `Cheerio`;
- You can check the website as a GoogleBot, following [this guide](https://developers.google.com/web/tools/chrome-devtools/device-mode/override-user-agent).

### Related things you should know

- It use the [MobileDetect](http://hgoebl.github.io/mobile-detect.js/) library to check if `.is( 'bot' )`, `.match( options.lighthouseUserAgent )` or `.match( options.matchUserAgent )`;
- Nuxt [hooks](https://nuxtjs.org/api/configuration-hooks/), so the plugin has access to `req.headers[ 'user-agent' ]` only if the project is **running as a server** (ex. `nuxt start`);
- It use [Cheerio](https://github.com/cheeriojs/cheerio), *jQuery for servers*, library to prune the html.

___

#### 💡 Lighthouse

![Lighthouse Audit before](./example/static/lighthouse/before.jpg)
![Lighthouse Audit after](./example/static/lighthouse/after.jpg)
___

## Setup

1. Add `@luxdamore/nuxt-prune-html` dependency to your project;
2. Add `@luxdamore/nuxt-prune-html` in the `modules` section of your `nuxt.config.js`;

```bash

    yarn add @luxdamore/nuxt-prune-html # or npm install --save @luxdamore/nuxt-prune-html

```

## Configuration

**_N.B. : the config is only shallow merged, not deep merged._**

```js

    // nuxt.config.js
    export default {

        // Module installation
        modules: [ '@luxdamore/nuxt-prune-html' ],

        // Module config
        pruneHtml: {
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
            matchUserAgent: null, // Remove selectors if this userAgent is matched, either as String or RegExp (a string will be converted to a case-insensitive RegExp in the MobileDetect library)
            hookRenderRoute: true, // Activate the prune during the `hook:render:route`
            hookGeneratePage: true, // Activate the prune during the `hook:generate:page`
            lighthouseUserAgent: 'lighthouse', // Value of the Lighthouse UserAgent, either as String or RegExp (a string will be converted to a case-insensitive RegExp in the MobileDetect library)
            headerName: 'user-agent', // Value of a custom header name passed from a Lambda Edge function, or similar
        },

    };

```

With `link` and `script` it's possibile to add one or more objects ex.:

```javascript

    export default {
        pruneHtml: {
            script: [
                {
                    src: '/my-custom-lazy-load-for-bots.js',
                    lazy: true,
                    defer: true,
                },
            ],
            link: [
                {
                    src: '/my-custom-lazy-load-for-bots.js',
                    rel: 'preload',
                    as: 'script',
                    position: 'phead', // Default value is 'body' --> Other allowed values are: 'phead', 'head' and 'pbody'
                },
            ],
        },
    };

```

___

## Development

1. Clone this repository;
2. Install dependencies using `yarn install` or `npm install`;
3. Start development server using `yarn dev` or `npm run dev`;
4. Build *Github Pages* using `yarn generate` or `npm run generate` (the content is automatically generated into the `/docs` folder).

## 🐞 Issues

Please make sure to read the [Issue Reporting Checklist](/.github/ISSUE_TEMPLATE/bug_report.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## 👥 Contribution

Please make sure to read the [Contributing Guide](/.github/ISSUE_TEMPLATE/feature_request.md) before making a pull request.

## 📖 Changelog

Details changes for each release are documented in the [**release notes**](./CHANGELOG.md).

### 📃 License

[MIT License](./LICENSE) // Copyright (©) 2019-present [Luca Iaconelli](https://lucaiaconelli.it)

#### 💸 Are you feeling generous today?  :)

Do you want to share a beer? We can be good friends..
__[Paypal](https://www.paypal.me/luxdamore) // [Patreon](https://www.patreon.com/luxdamore)__

> _It's always a good day to be magnanimous - cit_

#### 💼 Hire me

[![Contacts](https://img.shields.io/badge/email-Contact%20me-success)](https://lucaiaconelli.it)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/luxdamore)
