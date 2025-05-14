/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // Bỏ qua lỗi import không sử dụng cho một số thư viện cụ thể
    // Framer Motion sử dụng JSX namespaces (motion.div) nên ESLint không phát hiện được việc sử dụng
    'no-unused-vars': ['error', { 
      varsIgnorePattern: '^(motion|AnimatePresence|useMotionValue|useTransform|useScroll|useSpring|useTime|useHover)$', 
      argsIgnorePattern: '^_', 
      ignoreRestSiblings: true 
    }],
    
    // Các quy tắc khác
    'react/prop-types': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}; 