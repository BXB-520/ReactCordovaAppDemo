import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  base: '/',
  publicPath: './',
  outputPath: 'www',
  targets: {
    ie: 10,
    chrome: 80,
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  proxy,
  routes,
  devtool: 'eval',
  //headScripts: [{ src: '/flv.js', async: true, type: 'text/javascript' }],
});
