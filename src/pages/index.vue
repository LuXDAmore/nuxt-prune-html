<template>
    <article
        v-if="readme"
        class="readme markdown-body"
        v-html="readme"
    />
</template>

<script>
    // Code Highlight
    import hljs from 'highlight.js/lib/core';
    import bash from 'highlight.js/lib/languages/bash';
    import javascript from 'highlight.js/lib/languages/javascript';

    // Readme
    import readme from '~/../README.md';

    const markdown = readme
        .split(
            './src/static/'
        )
        .join(
            ''
        )
    ;

    // Highlight config
    hljs.registerLanguage(
        'bash',
        bash,
    );

    hljs.registerLanguage(
        'javascript',
        javascript,
    );

    // Page
    export default {
        name: 'homepage',
        computed: {
            readme: () => markdown,
        },
        async mounted() {

            await this.$nextTick();

            // Init External Links
            this.initHighlight();
            this.initReadmeLinks();

        },
        methods: {
            initHighlight() {

                const CODE_BLOCKS = document.querySelectorAll(
                    '.readme code',
                );

                for( const block of CODE_BLOCKS ) {

                    hljs.highlightBlock(
                        block
                    );

                }

            },
            initReadmeLinks() {

                const LINKS = document.querySelectorAll(
                    '.readme a',
                );

                for( const link of LINKS ) {

                    link.setAttribute(
                        'target',
                        '_blank',
                    );

                    link.setAttribute(
                        'rel',
                        'noopener',
                    );

                    link.textContent && link.setAttribute(
                        'title',
                        link.textContent,
                    );

                }

            },
        },
    };
</script>

<style src="highlight.js/styles/github.css"></style>

<style scoped src="./index.css"></style>
