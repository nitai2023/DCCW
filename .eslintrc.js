module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    soureType: 'module'
  },
  plugins: ['react', 'prettier', '@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // 使用单引号
        arrowParens: 'always', // 箭头函数始终包含圆括号
        endOfLine: 'auto', // 自动识别换行是LF还是CRLF，默认prettier是LF
        trailingComma: 'none' // 最后不需要逗号
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  // 针对eslint-plugin-react的配置，详见：https://github.com/yannickcr/eslint-plugin-react#configuration
  settings: {
    react: {
      version: 'detect'
    }
  }
};
