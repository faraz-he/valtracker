const OFF = 0;
const ERROR = 2;

// A helper to build the `padding-line-between-statements` rule below
const blankLineRule = type => [
  { blankLine: 'always', prev: type, next: '*' },
  { blankLine: 'always', prev: '*', next: type },
];

module.exports = {
  rules: {
    /**
     * Default rules we are disabling
     */
    // Not every function needs an explicit return type
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    // Typescript is good at inferring return types
    '@typescript-eslint/explicit-function-return-type': OFF,
    // We need to interop with APIs which use snake_case
    '@typescript-eslint/camelcase': OFF,
    // It is often convenient to define helper functions at the bottom of a file
    '@typescript-eslint/no-use-before-define': OFF,
    // We can disable this because next.js ensures that react is always in scope
    'react/react-in-jsx-scope': OFF,
    // In practice most of these are unnecessary
    'react/no-unescaped-entities': OFF,
    // We're using typescript — we don't need propTypes
    'react/prop-types': OFF,
    // We don't need to explicitly supply display names; babel infers them
    'react/display-name': OFF,

    /**
     * Non-default rules we are adding
     */
    // Mitigate the risk of code injection by always sanitizing any direct DOM access
    'no-unsanitized/method': 'error',
    'no-unsanitized/property': 'error',
    // `dangerouslySetInnerHTML` is dangerous, as its name implies. It has led to
    // XSS vulnerabilities before. Make it an error unless a comment is supplied.
    'react/no-danger': ERROR,
    // Forbid using `javascript:` URLs on elements
    'react/jsx-no-script-url': ERROR,
    // Consistent order of imports
    'import/order': [ERROR, { alphabetize: { order: 'asc' } }],
    'import/first': ERROR,
    // Enforce using named exports
    'import/no-default-export': ERROR,
    // enforce camelCase naming
    camelcase: ERROR,
    // Prevents re-assigning function arguments
    'no-param-reassign': ERROR,
    // Prefers arrow functions to function-expressions where possible
    'prefer-arrow-functions/prefer-arrow-functions': ERROR,
    // Runs prettier within eslint
    'prettier/prettier': ERROR,
    // Prevents files exceeding 200 lines
    'max-lines': [ERROR, 200],
    // Prevents function parameters exceeding 5
    'max-params': [ERROR, 5],
    // Sorts CSS properties alphabetically
    'better-styled-components/sort-declarations-alphabetically': ERROR,
    // Forbids accidentally importing emotion instead of styled-components
    'no-restricted-imports': ['error', { patterns: ['@emotion/*'] }],
    // Only allow console.error() calls, no console.log()
    'no-console': [ERROR, { allow: ['error'] }],
    // Warns when using a trivial class component
    'react/prefer-stateless-function': ERROR,
    // TS itself complains about unused vars, so this rule just creates duplicate errors
    '@typescript-eslint/no-unused-vars': OFF,
    // Prevents using the `as` operator, which hides errors and has confusing semantics (it doesn't actually "cast" values)
    '@typescript-eslint/consistent-type-assertions': [ERROR, { assertionStyle: 'never' }],
    // Prevents using the `any` type in code. This is on by default, but only as a warning.
    '@typescript-eslint/no-explicit-any': [ERROR, { fixToUnknown: false }],
    // Prevents using a statement-based arrow function when an expression would be valid
    'arrow-body-style': ERROR,
    // Enforces the 'rules of hooks' for react
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    // Requires using the `===` operator instead of `==`
    eqeqeq: 'error',
    // Disallows `<Nice ok={'something'} />` in favour of `<Nice ok="something" />`
    'react/jsx-curly-brace-presence': [ERROR, { props: 'never', children: 'never' }],
    // Enforces padding lines around multi-line statements
    'padding-line-between-statements': [
      ERROR,
      ...blankLineRule('multiline-block-like'),
      ...blankLineRule('multiline-expression'),
      ...blankLineRule('multiline-const'),
      ...blankLineRule('export'),
      // Prevents blank lines before imports. Combined with the other import ordering rules, this means they must be in a single block.
      { blankLine: 'never', prev: '*', next: 'import' },
    ],
  },

  overrides: [
    // Rules that only make sense for TS
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Prevents invoking an any-typed value as if it was a function
        '@typescript-eslint/no-unsafe-call': ERROR,
      },
    },

    // Relaxed rules for JS files
    {
      files: ['*.js'],
      rules: {
        // For JS files running directly in Node, we have to use require()
        '@typescript-eslint/no-var-requires': OFF,
        // We have tests written in JS which refer to Jest globals
        'no-undef': OFF,
      },
    },
  ],

  // We use the default rules from these presets
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],

  // We import rules from these packages
  plugins: [
    'prefer-arrow-functions',
    '@typescript-eslint',
    'better-styled-components',
    'prettier',
    'react-hooks',
    'import',
    'no-unsanitized',
  ],

  env: { node: true },

  // Lets us parse typescript files
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: 'tsconfig.json',
  },

  // Tells eslint-plugin-react to automatically detect the version of React to use
  settings: { react: { version: 'detect' } },
};