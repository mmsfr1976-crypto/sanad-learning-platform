import nextPlugin from '@next/eslint-plugin-next';

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**']
  },
  nextPlugin.configs['core-web-vitals']
];

export default eslintConfig;
