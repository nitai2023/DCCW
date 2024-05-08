# vite-react-template
vite + React + React-Router + Sass + ESLint With Prettier + lint-staged With husky

- Vite
  - [vite](https://cn.vitejs.dev/)

- React
  - [react](https://reactjs.org/)

- React-Router
  - [react-router](https://reactrouter.com/)

- Sass(Scss)

- ESLint + Prettier
  - [eslint](http://eslint.cn/)
  - [prettier](https://prettier.io/)
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
  - [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
  - [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)
  - [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint#readme)

    ESLint插件，包含了各类定义好的检测Typescript代码的规范

  - [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint#readme)
  
    ESLint的解析器，用于解析typescript，从而检查和规范Typescript代码

  - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
  - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

  对应代码：
  ```
    // eslintrc.js
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
  ```
  > endOfLine的官方文档的解释：[链接地址](https://prettier.io/docs/en/options.html#end-of-line)

  > trailingComma：[链接地址](https://prettier.io/docs/en/options.html#trailing-commas)

  VSCode设置里面加入保存文件时自动修复
  ```
  "editor.codeActionsOnSave": {"source.fixAll": true}
  ```
  
- lint-staged + husky
  - [lint-staged](https://github.com/okonet/lint-staged)
  - [husky](https://github.com/typicode/husky/)
  
  > 注意：husky 6 + lint-staged 11的使用方式跟前面的版本不再一样，老的配置方式不再适用，建议使用lint-staged的官方命令来自动安装相关配置，执行命令` npx mrm@2 lint-staged `，执行这个命令前请保证已配置了正确的ESLint。
  > 本模板为husky 4 + lint-staged 9

# 注意事项
## 在vite下启用css module功能
react下在样式部分没有vue那种原生带scoped的功能，我们需要手动去加配置才能让我们的css带上hash后缀来保证样式的独立性，避免造成样式干扰，具体需要做两部分操作，首先配置vite.config.js
```
export default defineConfig({
  ......
  css: {
    modules: {
      generateScopedName: '[name]__[local]--[hash:base64:5]'
    }
  }
});
```
同时保证你的css(scss|less)文件名有module关键字，比如你的App文件对应的样式需要这样命名：App.module.scss。
如果你想让你的样式不进行hash处理，在你对应的类名前加关键字:global
```
:global .about-wraper {
  color: red;
}
```





