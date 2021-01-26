<template>
    <main class="container readme">
        <article
            v-if="readme"
            class="markdown-body"
            v-html="readme"
        />
    </main>
</template>

<script>
    // Highlight
    import hljs from 'highlight.js/lib/core';
    import bash from 'highlight.js/lib/languages/bash';
    import javascript from 'highlight.js/lib/languages/javascript';

    // Readme
    import readme from '~/../README.md';

    const markdown = readme.split(
        './example/static/'
    ).join(
        ''
    );

    // Highlight config
    hljs.registerLanguage(
        'bash',
        bash,
    );

    hljs.registerLanguage(
        'javascript',
        javascript,
    );

    export default {
        computed: {
            readme: () => markdown,
        },
        async mounted() {

            await this.$nextTick();

            this.initReadmeLinks();
            this.initHighlight();

        },
        methods: {
            initHighlight() {

                const PRE = document.querySelectorAll(
                    'pre',
                );

                PRE.forEach(
                    block => hljs.highlightBlock(
                        block,
                    ),
                );

            },
            initReadmeLinks() {

                const LINKS = document.querySelectorAll(
                    '.readme > article a',
                );

                LINKS.forEach(
                    link => {

                        link.setAttribute(
                            'target',
                            '_blank',
                        );

                        link.setAttribute(
                            'rel',
                            'noopener',
                        );

                        link.setAttribute(
                            'title',
                            link.textContent,
                        );

                    }
                );

            },
        },
    };
</script>

<style src="highlight.js/styles/github.css"></style>
