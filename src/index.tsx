import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * eruda移动端调试工具
 * 仅在开发环境且url中包含?eruda=true时初始化;
 */
if (
  process.env.NODE_ENV === 'development' &&
  /eruda=true/.test(window.location.search)
) {
  import('eruda').then(eruda => eruda.default.init());
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
