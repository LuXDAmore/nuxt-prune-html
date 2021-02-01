module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: [ './jest.setup.js' ],
    collectCoverage: true,
    collectCoverageFrom: [
        'lib/**/*.js',
        '!lib/config.**.js',
        '!lib/logger.js',
        '!lib/plugin.js',
    ],
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/lib/$1',
        '^~~$': '<rootDir>',
        '^@@$': '<rootDir>',
        '^@/(.*)$': '<rootDir>/lib/$1',
    },
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
};
