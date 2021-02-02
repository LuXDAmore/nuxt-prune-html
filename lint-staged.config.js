module.exports = {
    '*.vue': 'npm run lint',
    '*.{ts,js}': 'npm run eslint',
    '*.css': 'npm run stylelint',
    '*.scss': 'npm run stylelint --syntax=scss',
};
