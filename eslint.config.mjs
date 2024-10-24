import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'public'],
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
    },
  },
  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended
);
