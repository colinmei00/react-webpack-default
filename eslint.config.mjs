import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    ignores: [
      'node_modules',
      'dist',
      'public',
      'package-lock.json',
      'scripts',
      'src/utils/*.js',
      '.vscode',
      '.stylelintcache',
      '.eslintcache',
    ],
  },
  /**
   * 配置全局变量
   */
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
  /**
   * javascript 规则
   */
  {
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   * 如果该方法还是会造成eslint和prettier冲突，请使用下方extends配置
   */
  eslintPluginPrettierRecommended
  // {
  //   extends: [
  //     'standard-with-typescript',
  //     'plugin:react/recommended',
  //     'prettier',
  //   ],
  // }
);
