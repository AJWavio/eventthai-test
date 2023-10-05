/** @type  */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist/**/*'],
  rules: {
    //#region code style rules
    'quotes': ['warn', 'single'],
    'indent': ['error', 4, { 'ignoredNodes': ['PropertyDefinition'], 'SwitchCase': 1 }],
    'lines-between-class-members': ['warn', 'always', {
      exceptAfterSingleLine: true
    }],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'multiline-expression', next: '*' },
      { blankLine: 'always', prev: '*', next: 'multiline-expression' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'for', next: '*' },
      { blankLine: 'always', prev: '*', next: 'for' },
      { blankLine: 'always', prev: '*', next: 'while' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: '*', next: 'switch' },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    //#endregion
    
    //#region logic error rules
    '@typescript-eslint/no-base-to-string': ['error'],
    'default-case': ['warn'],
    'no-fallthrough': ['warn'],
    //#endregion

    //#region efficiency rules
    '@typescript-eslint/no-unused-vars': ['error', {
      'varsIgnorePattern': '^_',
      'argsIgnorePattern': '^_'
    }],
    //#endregion

    //#region excluded rules
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-types': ['error', {
      types: {
        '{}': false
      }
    }],
    'prettier/prettier': 'off',
    'no-unused-vars': 'off',
    //#endregion
  },
};
