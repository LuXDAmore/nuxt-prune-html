# 🔌⚡ Nuxt Prune HTML

[![Code Quality][quality-src]][quality-href]
[![Downloads][npm-downloads-src]][npm-downloads-href]
[![Dependencies][dependencies-src]][dependencies-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Version][npm-version-src]][npm-version-href]
[![Donate][paypal-donate-src]][paypal-donate-href]

[quality-src]: https://img.shields.io/badge/code%20quality-A-informational?style=flat
[quality-href]: https://luxdamore.github.io/nuxt-prune-html/

[npm-downloads-src]: https://img.shields.io/npm/dt/@luxdamore/nuxt-prune-html.svg?style=flat&color=darkgreen
[npm-downloads-href]: https://npmjs.com/package/@luxdamore/nuxt-prune-html

[dependencies-src]: https://img.shields.io/badge/dependencies-up%20to%20date-darkgreen.svg?style=flat
[dependencies-href]: https://npmjs.com/package/@luxdamore/nuxt-prune-html

[circle-ci-src]: https://img.shields.io/circleci/project/github/LuXDAmore/nuxt-prune-html.svg?style=flat&color=darkgreen
[circle-ci-href]: https://circleci.com/gh/LuXDAmore/nuxt-prune-html

[npm-version-src]: https://img.shields.io/npm/v/@luxdamore/nuxt-prune-html/latest.svg?style=flat&color=darkorange&label=version
[npm-version-href]: https://npmjs.com/package/@luxdamore/nuxt-prune-html

[paypal-donate-src]: https://img.shields.io/badge/paypal-donate-black.svg?style=flat
[paypal-donate-href]: https://www.paypal.me/luxdamore
[patreon-donate-href]: https://www.patreon.com/luxdamore
[kofi-donate-href]: https://ko-fi.com/luxdamore

> Nuxt module to prune html before sending it to the browser (it removes elements matching CSS selector(s)), useful for boosting performance showing a different HTML for bots/audits by removing all the scripts with dynamic rendering.

## 💘 Motivation

Due to the versatility of Nuxt (and of the SSR in general), a website generated (or served) via node server, has everything it needs already injected in the HTML (ex. *css styles*). So, usually, for a bot, a audit or for a human, the website its almost visually the same with or without Javascript.

This library is born to remove all the scripts injected into the HTML **only** if a visitor is a **Bot** or a **Performance Audit** (ex. *a Lighthouse Audit*).
This should **speed up** (**blazing fast**) your *nuxt-website* up to a value of **~99** in **performance** because it [cheats various scenarios](https://web.dev/lighthouse-performance/).

Usually, with **less assets, resources and html** to download, the number of urls crawled by a bot are **widely boosted** 📈.

> Inspired by this [rcfs](https://github.com/nuxt/rfcs/issues/22) and this [issue](https://github.com/nuxt/nuxt.js/issues/2822).

### Features

- Prune based on **default detection**;
  - match the **user-agent**;
  - match a **bot**;
  - match an **audit**;
  - match a **custom-header**;
- Prune based on **headers values** (*useful in/for Lambdas*);
- Prune based on **query parameters** (*useful during navigation, hybrid-experience*).

### Pro et contra

> This could cause some unexpected behaviors, but..

**Cons.:**

- No [`SPA routing`](https://nuxtjs.org/docs/2.x/concepts/server-side-rendering/#server-side-rendering-steps-with-nuxtjs) on `client-side` for **bots and audits**;
- No [`hydration`](https://ssr.vuejs.org/guide/hydration.html) on `client-side` for **bots and audits**:
  - ex. [`vue-lazy-hydration`](https://github.com/maoberlehner/vue-lazy-hydration) need **Javascript client-side code** to trigger _hydrateOnInteraction_, _hydrateWhenIdle_ or _hydrateWhenVisible_;
- No [`<client-only>` components](https://nuxtjs.org/api/components-client-only/);
- Can break `lazy-load` for images.

**Pros.:**

- Some of these features **aren't "used by"** a bot/audit, so you don't really need them:
  - bots doesn't handle `SPA routing`;
  - [`<client-only>` components](https://nuxtjs.org/api/components-client-only/) could lead in a slower TTI;
  - [`<client-only>` components](https://nuxtjs.org/api/components-client-only/) can contain a [static placeholder](https://nuxtjs.org/api/components-client-only/);
- Images with `lazy-load` can be fixed with a [native attribute](https://web.dev/native-lazy-loading/), with a custom `script` or with `classesSelectorsToKeep` (_check the configuration_);
- You can pre-load ad inject **all of the data that you need** (Rest API, GraphQL, ecc) during the _build phase_ with [nuxt-apis-to-file](https://github.com/LuXDAmore/nuxt-apis-to-file), **speeding up** the website loading time;
- `Hydration` **decrease** performance, so it's ok to prune it for `bots or audits`;
- **Less HTML, assets and resources** are served to browsers and clients;
- Bot/audit only have *the Javascript they need*;
- With **less assets** to download, the number of urls crawled are **widely boosted**;
- Bots, [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), [Google Measure](https://web.dev/measure/) and [Lighthouse Audit](https://developers.google.com/web/tools/lighthouse) are already pruned by the plugin with the default configuration;
- Faster [web-vitals](https://web.dev/vitals/), faster TTI, faster FCP, faster FMP, **faster all**.

**N.B.:** _This is known as [Dynamic Rendering](https://developers.google.com/search/docs/guides/dynamic-rendering) and **it's not** considered [black-hat](https://www.wordstream.com/black-hat-seo) or [cloaking](https://en.wikipedia.org/wiki/Cloaking)_.

___

#### 💡 Lighthouse

![Lighthouse Audit before](./src/static/lighthouse/before.jpg)
![Lighthouse Audit after](./src/static/lighthouse/after.jpg)

___

## Setup

1. **Install** `@luxdamore/nuxt-prune-html` as a dependency:
   - `yarn add @luxdamore/nuxt-prune-html`;
   - or, `npm install --save @luxdamore/nuxt-prune-html`;
2. **Append** `@luxdamore/nuxt-prune-html` to the `modules` array of your `nuxt.config.js`.

## Configuration

```js

    // nuxt.config.js
    export default {

        // Module - installation
        modules: [ '@luxdamore/nuxt-prune-html' ],

        // Module - default config
        pruneHtml: {
            enabled: false, // `true` in production
            hideGenericMessagesInConsole: false, // `false` in production
            hideErrorsInConsole: false, // deactivate the `console.error` method
            hookRenderRoute: true, // activate `hook:render:route`
            hookGeneratePage: true, // activate `hook:generate:page`
            selectors: [
                // CSS selectors to prune
                'link[rel="preload"][as="script"]',
                'script:not([type="application/ld+json"])',
            ],
            classesSelectorsToKeep: [], // disallow pruning of scripts with this classes, n.b.: each `classesSelectorsToKeep` is appended to every `selectors`, ex.: `link[rel="preload"][as="script"]:not(__classesSelectorsToKeep__)`
            link: [], // inject custom links, only if pruned
            script: [], // inject custom scripts, only if pruned
            htmlElementClass: null, // a string added as a class to the <html> element if pruned
            cheerio: {
                // the config passed to the `cheerio.load(__config__)` method
                xmlMode: false,
            },
            types: [
                // it's possibile to add different rules for pruning
                'default-detect',
            ],

            // 👇🏻 Type: `default-detect`
            headerNameForDefaultDetection: 'user-agent', // The `header-key` base for `MobileDetection`, usage `request.headers[ headerNameForDefaultDetection ]`
            auditUserAgent: 'lighthouse', // prune if `request.header[ headerNameForDefaultDetection ]` match, could be a string or an array of strings
            isAudit: true, // remove selectors if match with `auditUserAgent`
            isBot: true, // remove selectors if is a bot
            ignoreBotOrAudit: false, // remove selectors in any case, not depending on Bot or Audit
            matchUserAgent: null, // prune if `request.header[ headerNameForDefaultDetection ]` match, could be a string or an array of strings

            // 👇🏻 Type: 'query-parameters'
            queryParametersToPrune: [
                // array of objects (key-value)
                // trigger the pruning if 'query-parameters' is present in `types` and at least one value is matched, ex. `/?prune=true`
                {
                    key: 'prune',
                    value: 'true',
                },
            ],
            queryParametersToExcludePrune: [], // same as `queryParametersToPrune`, exclude the pruning if 'query-parameters' is present in `types` and at least one value is matched, this priority is over than `queryParametersToPrune`

            // 👇🏻 Type: 'headers-exist'
            headersToPrune: [], // same as `queryParametersToPrune`, but it checks `request.headers`
            headersToExcludePrune: [], // same as `queryParamToExcludePrune`, but it checks `request.headers`, this priority is over than `headersToPrune`

            // Emitted events for callbacks methods
            onBeforePrune: null, // ({ result, [ req, res ] }) => {}, `req` and `res` are not available on `nuxt generate`
            onAfterPrune: null, // ({ result, [ req, res ] }) => {}, `req` and `res` are not available on `nuxt generate`
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

### Types / Rules

Possible values are `[ 'default-detect', 'query-parameters', 'headers-exist' ]`:

- `default-detect`: prune based on **one header**(`request.headers[ headerNameForDefaultDetection ]`)
  - different checks with [MobileDetect](https://hgoebl.github.io/mobile-detect.js/):
    - `isBot`, trigger `.is( 'bot' )` method;
    - `auditUserAgent` or `matchUserAgent`, trigger `.match()` method;
- `query-parameters`: prune based on **one or more query parameter**, tests `key / value` based on `queryParametersToPrune / queryParametersToExcludePrune`:
  - you can also specify routes in `nuxt.config`, ex. *`{ generate: { routes: [ '/?prune=true' ] } }`*
- `headers-exist`: prune based on **one or more header**, tests `key / value` based on `headersToPrune / headersToExcludePrune`.

N.B.: *It's possibile to mix different types.*

___

### Related things you should know

- Nuxt [hooks](https://nuxtjs.org/api/configuration-hooks/), the plugin has access to `request.headers` only if the project is **running as a server** (ex. `nuxt start`)
  - If you `generate` your site it's not possibile to check *request.headers*, so (for `types: [ 'default-detect', 'headers-exist' ]`) it **always prune**, but You can disable this behavior by setting `hookGeneratePage` to `false` (or by using the type `query-parameters`);
- Usage with `types: [ 'default-detect' ]`, load the [MobileDetect](https://hgoebl.github.io/mobile-detect.js/) library;
- It use [Cheerio](https://github.com/cheeriojs/cheerio), *jQuery for servers*, library to **filter and prune** the html.

___

### Advices

- Before setting up the module, try to [Disable JavaScript With Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript/disable) while navigate your website, **this is how your website appear (when *nuxt-prune-html* is enabled)**;
- For [`<client-only>` components](https://nuxtjs.org/api/components-client-only/) you should prepare a version that is visually the same with the [placeholder slot](https://nuxtjs.org/api/components-client-only/);
- You can check the website as a *GoogleBot*, following [this guide](https://developers.google.com/web/tools/chrome-devtools/device-mode/override-user-agent);
- The [nuxt-apis-to-file](https://github.com/LuXDAmore/nuxt-apis-to-file) module can help you with **data payload extraction** during the build time.

___

## 👩🏻‍💻👨🏻‍💻 Development

1. **Clone** the repository:
   - `git clone https://github.com/LuXDAmore/nuxt-prune-html.git`;
2. **Install** dependencies:
   - `yarn install` (or `npm install`);
3. **Start** a development server:
   - `yarn dev` (or `npm run dev`);
4. **Test** your code:
   - `yarn test` (or `npm run test`);
5. **Extra**, generate the documentation ([*Github Pages*](https://pages.github.com/)):
   - `yarn generate` (or `npm run generate`);
   - _the content is automatically generated into the `/docs` folder_.

## 🐞 Issues

Please make sure to read the [**issue reporting checklist**](./.github/ISSUE_TEMPLATE/bug_report.md) before opening an issue.
*Issues not conforming to the guidelines may be closed immediately*.

## 📝 Discussions

We're using [**Github discussions**](https://github.com/LuXDAmore/nuxt-prune-html/discussions) as a place to connect with other members of our community.
*You are free to ask questions and share ideas, so enjoy yourself*.

## 👥 Contribution

Please make sure to read the [**contributing guide**](./.github/ISSUE_TEMPLATE/feature_request.md) before making a pull request.

## 📖 Changelog

Details changes for each release are documented in the [**release notes**](./CHANGELOG.md).

### 🆓 License

[MIT License](./LICENSE) // Copyright (©) 2019-now [Luca Iaconelli](https://lucaiaconelli.it)

#### 💼 Hire me

[![Contacts](https://img.shields.io/badge/Contact%20Me-Let's%20Talk-informational?style=social&logo=minutemailer)](https://curriculumvitae.lucaiaconelli.it)

#### 💸 Are you feeling generous today?

If You want to share a beer, we can be really good friends 😄

__[Paypal][paypal-donate-href] // [Patreon][patreon-donate-href] // [Ko-fi][kofi-donate-href]__

> ☀ _It's always a good day to be magnanimous_ - cit.
