<template>
    <main class="container">
        <nuxt />
    </main>
</template>

<script>
    export default {
        name: 'default',
        jsonld() {

            return {
                '@context': 'https://schema.org/',
                '@type': 'SoftwareSourceCode',
                programmingLanguage: 'Javascript',
                targetProduct: 'NuxtJs, VueJs',
                name: process.env.title,
                description: process.env.description,
                about: process.env.description,
                author: process.env.author,
                url: process.env.hostname,
                codeSampleType: process.env.hostname,
                workExample: process.env.hostname,
                codeRepository: process.env.hostname,
            };

        },
    };
</script>
