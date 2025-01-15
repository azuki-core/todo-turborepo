// @ts-check

import { FlatCompat } from '@eslint/eslintrc'

import globals from 'globals'
import eslintJs from '@eslint/js'
import tseslint from 'typescript-eslint'

import react from 'eslint-plugin-react'
import love from 'eslint-config-love'
import configPrettier from 'eslint-config-prettier'

import importPlugin from 'eslint-plugin-import'
import importX from 'eslint-plugin-import-x'
import n from 'eslint-plugin-n'

import simpleImportSort from 'eslint-plugin-simple-import-sort'
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments'
import regexp from 'eslint-plugin-regexp'
import security from 'eslint-plugin-security'
import tailwind from 'eslint-plugin-tailwindcss'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import reactHooks from 'eslint-plugin-react-hooks'
import promise from 'eslint-plugin-promise'
import tsParser from '@typescript-eslint/parser'
import vitest from '@vitest/eslint-plugin'

const baseFiles = ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx']
const flatCompat = new FlatCompat()

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      // これいるのかな？他の設定に含まれているのかも？
      parser: tsParser,
      // https://typescript-eslint.io/getting-started/typed-linting
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      // noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
  },

  // @eslint/js
  eslintJs.configs.recommended,
  {
    rules: {
      'no-console': 'error',
    },
  },

  // typescript-eslint
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // plugin-import-x
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    settings: {
      // https://blog.nnn.dev/entry/2023/10/19/110000 アップデートされるまでの回避策
      // fix: warning  Parse errors in imported module 'something': parserPath or languageOptions.parser is required! (undefined:undefined)  import-x/namespace
      // 2024-08-24 comment outして様子見
      // 'import-x/parsers': {
      //   '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
      // },
    },
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        { devDependencies: false, optionalDependencies: false, peerDependencies: false },
      ],
      'import-x/no-internal-modules': [
        'error',
        {
          // subpathのimportはTSでビルドできてもNodejsで実行時エラーになるので禁止
          forbid: ['@salescore/*/*/**'],
        },
      ],
      'import-x/no-relative-packages': 'error',

      // 以下typescriptの静的解析でエラーになるためコメントアウト
      'import-x/namespace': 'off',
      'import-x/named': 'off',
      'import-x/default': 'off',
      'import-x/no-named-as-default-member': 'off',
    },
  },

  // plugin-n
  n.configs['flat/recommended'],
  {
    settings: {
      // n/no-missing-import用→よって不要と思われる
      // node: { tryExtensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '/index.ts', '/index.tsx', '/index.d.ts'] },
    },
    rules: {
      'n/no-missing-import': ['off'], // import解決エラーはtsc・bundlerに任せたほうが良い
      'n/no-missing-require': ['off'], // import解決エラーはtsc・bundlerに任せたほうが良い
      'n/no-restricted-import': ['warn', []],
    },
  },

  // plugin-promise
  promise.configs['flat/recommended'],

  // eslint-config-love
  // @typescript-eslint・import・n・promiseのルールセット
  {
    plugins: {
      import: importPlugin,
      'eslint-comments': eslintCommentsPlugin,
    },
    rules: love.rules,
  },

  // plugin-unicorn
  unicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/filename-case': [
        'warn',
        {
          cases: { pascalCase: true, camelCase: true },
        },
      ], // 現状合わせ
      'unicorn/no-null': ['off'], // prismaで使う
    },
  },
  {
    // next.jsのpage名はsnake_caseで良い
    files: ['apps/frontend/*/src/pages/**/*.{ts,tsx}'],
    rules: {
      'unicorn/filename-case': [
        'warn',
        {
          cases: { snakeCase: true },
        },
      ],
    },
  },

  // plugin-next
  // TODO: 動かない https://github.com/vercel/next.js/issues/64409
  // ...flatCompat.extends('plugin:@next/next/recommended'),

  // plugin-react-hooks
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // plugin-react-hooks: eslint9未対応
  {
    files: baseFiles,
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
  },

  // plugin-functional
  // 現状functionalで書くという合意があるわけでもないので無効にする
  // functional.configs.recommended,

  // plugin-simple-import-sort
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // plugin-compat
  // polyfillなどがあるので不要では？
  // {
  //   ...compat.configs['flat/recommended'],
  // },

  // plugin-vitest
  {
    files: ['**/test/**'], // or any other pattern
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
    },
  },
  // plugin-comments https://github.com/mysticatea/eslint-plugin-eslint-comments
  comments.recommended,
  // {
  //   rules: {
  //     '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  //   },
  // },

  // plugin-regexp
  regexp.configs['flat/recommended'],

  // plugin-security
  security.configs.recommended,

  // tailwind
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'tailwindcss/no-custom-classname': [
        'error',
        {
          whitelist: [
            'disable-on-click-outside', // click eventのコントロールに使っている
            // LESSで使われるのでローカルでは必要なクラスと扱われるがCIでエラーになり混乱しやすい
            'ant-tree-node-hover-navigation',
            'antd-tree-my-directory-tree',
            'dispaly-none-print',
            'footer',
            'overflow-scroll-layout-content',
            'overflow-visible-print',
            'v2-desgin',
            'views-sider-v2',
            // 以下未評価
            '-50',
            'ClosableResizableSiderWithPercent',
            'ant-modal-without-padding',
            'ant-picker-calendar-date',
            'ant-picker-calendar-date-content',
            'ant-picker-calendar-date-value',
            'ant-picker-cell-inner',
            'antd-tree-one-level-columns',
            'bg-',
            'blink-slow',
            'bold',
            'border-b-1',
            'business-day-calendar',
            'cell-body',
            'closable-resizable-sider',
            'closable-resizable-sider-body',
            'closable-resizable-sider-sider',
            'closable-resizable-sider-sider-inner',
            'components-table-demo-nested',
            'description-vertical-small-label',
            'dimensions-picker',
            'draggable-tab',
            'draggable-tab-content',
            'draggable-tab-tabs',
            'draggable-tab-tabs-inner',
            'expandable-sider-body',
            'expandable-sider-layout',
            'expandable-sider-sider',
            'extracted-calling-metadata-page-chat-message',
            'fixed-footer-row-left',
            'fixed-footer-row-right',
            'font-gray-500',
            'font-lg',
            'gap',
            'gray',
            'header',
            'header-with-bigicon',
            'html-cell-popover',
            'is-user',
            'justify-left',
            'kanban-item',
            'kanban-root',
            'locked-section',
            'message-',
            'my-date-picker',
            'my-dropdown-menu-overlay',
            'no-scrollbar',
            'not-loadable',
            'overflow-none',
            'placeholder:text-md',
            'property-cascader',
            'pseudo-private-tree',
            'result',
            'rsheet-cell',
            'rsheet-cell-body-imvalid-row-index',
            'rsheet-cell-group',
            'rsheet-cell-row-index',
            'rsheet-empty-cell',
            'rsheets',
            'rsheets-header-row',
            'rsheets-row',
            'sortable-flex-element-content',
            'text-default',
            'text-md',
            'user-groups-tree',
            'view-component-root',
            'view-ui-kpi-pivot-sheet',
            'view-ui-kpi-sheet',
            'view-ui-sheet',
            'view-ui-sheet-with-navigator',
            'virtualized-list-footer',
            'visible-on-hover',
            'wrapper',
          ],
        },
      ],
      // 以下はfixable
      'tailwindcss/classnames-order': ['error'],
      'tailwindcss/enforces-shorthand': ['error'],
    },
  },

  // unused-imports
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error', // @typescript-eslint/no-unused-varsをerrorにできたらこのプラグインは不要になる
    },
  },

  // strict-dependencies eslint9未対応
  // import-x等で対応できるので不要かも→一旦コメントアウト
  // ...flatCompat.config({
  //   plugins: ['strict-dependencies'],
  //   rules: {
  //     'strict-dependencies/strict-dependencies': ['error', []],
  //   },
  // }),

  // 移行のため一旦エラーをwarnにする
  // 修正するか無効にする対象かの判断は別途する
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': ['warn'],
      '@typescript-eslint/no-magic-numbers': ['warn'],
      '@typescript-eslint/no-misused-promises': ['warn'],
      '@typescript-eslint/no-non-null-assertion': ['warn'],
      '@typescript-eslint/no-unnecessary-condition': ['warn'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/only-throw-error': ['warn'],
      '@typescript-eslint/prefer-destructuring': ['warn'],
      '@typescript-eslint/strict-boolean-expressions': ['warn'],
      'array-callback-return': ['warn'],
      complexity: ['error', { max: 20, variant: 'modified' }],
      'eslint-comments/require-description': ['warn'], // 多過ぎ
      'react-hooks/exhaustive-deps': ['warn'],
      'react-hooks/rules-of-hooks': ['warn'],
      'react/jsx-key': ['warn'],
      'regexp/no-unused-capturing-group': ['warn'],
      'unicorn/no-array-for-each': ['warn'], // Effect-tsで誤検知
      'unicorn/no-array-method-this-argument': ['off'], // Effect-tsで誤検知
      'unicorn/no-array-reduce': ['warn'],
      'unicorn/prefer-global-this': ['warn'], // app-clientのnextのbuildがなぜかエラーを出すのでfixしにくい
      'unicorn/prefer-top-level-await': ['warn'],
      'unicorn/prevent-abbreviations': ['warn'],
    },
  },

  {
    files: ['apps/frontend/**/*.{ts,tsx}', 'packages/frontend/**/*.{ts,tsx}'],
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },

  // eslint対象外
  {
    ignores: [
      'eslint.config.mjs',
      'packages/common/core/src/dsl/syntax/expression.js',
      'packages/common/buff-common/src/mustache/peg/buff_mustache_parser.js',
      'packages/common/buff-common/src/pg-emulator/parser/grammer.js',
      'apps/backend/cli/dev/tmp/**/*',
      '**/_next/**',
      '**/.next/**',
      '**/dist/**',
      '**/generated/**',
      '**/migrations/old/**',
      '**/node_modules/**',
      '**/*.config.ts',
      '**/*.config.js',
      '**/_auth0/hubspot.js',
      '**/_auth0/zoho.js',
      '**/*.d.ts',
    ],
  },

  // config-prettier
  configPrettier,
)
