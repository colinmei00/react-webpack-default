import { createRoot } from 'react-dom/client';
import App from './App';
import VConsole from 'vconsole';

/**
 * (BASE_ENV为dev、test、gray环境)在url上拼接vconsole=true
 */
if (
  process.env.BASE_ENV !== 'production' &&
  /vconsole=true/.test(window.location.search)
) {
  new VConsole();
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
