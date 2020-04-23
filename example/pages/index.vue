<template>
    <main class="container readme">
        <article
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
        name: 'homepage',
        computed: {
            readme: () => readme,
        },
        mounted() {

            this.$nextTick(
                () => {

                    this.initHighlight();
                    this.initReadmeLinks();

                },
            );

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

                const links = document.querySelectorAll(
                    '.readme > article a, .readme > article pre',
                );

                for( let i = 0; i < links.length; i ++ ) {

                    if( links[ i ].tagName === 'A' ) {

                        links[ i ].setAttribute(
                            'target',
                            '_blank',
                        );

                        links[ i ].setAttribute(
                            'rel',
                            'noopener',
                        );

                        links[ i ].setAttribute(
                            'title',
                            links[ i ].textContent,
                        );

                    }

                }

            },
        },
    };
</script>
