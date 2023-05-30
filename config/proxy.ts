import { DEV_BASE_URL } from '../src/constants/system';

/**
 * 跨域代理
 */
export default {
  '/server': {
    target: DEV_BASE_URL,
    changeOrigin: true,
    //pathRewrite: { '^/api': '/airoom' },
  },

  /**本地mock*/
  // mock代理
  // '/mockApi': {
  //   target: devurl,
  //   changeOrigin: true,
  //   pathRewrite: { '^/mockApi': '' },
  // },
};
