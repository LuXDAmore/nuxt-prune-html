module.exports = {
    preset: '@nuxt/test-utils',
    setupFilesAfterEnv: [ './jest.setup.js' ],
    collectCoverage: true,
    collectCoverageFrom: [
        'lib/**/*.js',
        '!lib/config.**',
        '!lib/logger.js',
    ],
};
