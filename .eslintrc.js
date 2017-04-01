module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb", "plugin:react/recommended"], // eslint:recommended
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['error'],
    'no-console': 0,
    'import/no-extraneous-dependencies': [
      'error', {'devDependencies': true}
    ]
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import'
  ]
};
