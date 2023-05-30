/* eslint-disable guard-for-in */
import { history } from 'umi';
import { extend, Context, RequestMethod } from 'umi-request';
import { delLocalStorage, getLocalStorage, isCordova } from '../utils/common';
import { DEV_BASE_URL, NEWWORK_CODE_MESSAGE } from '@/constants/system';
import { Toast } from 'antd-mobile';

export interface HttpResult<T = any> {
  code: number;
  success: boolean;
  data: T;
  msg: string;
}

declare const cordova: any;

/** 请求异常处理程序 */
const errorHandler = (error: any, resolve?: Function) => {
  const response = isCordova() ? error : error?.response;

  if (response && response.status) {
    const errorText = isCordova()
      ? response.error
      : NEWWORK_CODE_MESSAGE[response.status] || response.statusText;
    const { status, url } = response;

    if (status == 401) {
      //app 回执
      if (resolve) resolve(response.error);

      Toast.show({
        content: '登录失效，请重新登录',
        position: 'bottom',
      });
      delLocalStorage('APP_TICKET');
      history.push({
        pathname: '/login',
      });
    } else if (status == -6) {
      //未连接网络处理为正常进入
      if (resolve) {
        resolve({
          code: 200,
          data: {},
          msg: '无网络',
          success: false,
        });
      }

      Toast.show({
        content: '您的网络发生异常，无法连接服务器',
        position: 'bottom',
      });
    } else {
      //app 回执
      if (resolve) resolve(response.error);

      console.log(`请求错误 ${status}: ${url}${errorText}${response.error}`);
      Toast.show({
        content: `请求错误 ${status}: ${url}${errorText}`,
        position: 'bottom',
      });
    }
  } else if (!response) {
    Toast.show({
      content: `您的网络发生异常，无法连接服务器`,
      position: 'bottom',
    });
  }
  return error;
};

// 配置request请求时的默认参数
const httpHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

const http: RequestMethod = extend({
  errorHandler,
  headers: httpHeaders,
  //credentials: 'include', //允许 cookie 共享
});

// 请求拦截添加token
http.use(async (ctx: Context, next: () => void) => {
  const {
    req: {
      options: { headers },
    },
  } = ctx;

  // 获取ticket
  const appTicket = getLocalStorage('APP_TICKET');

  ctx.req.options.headers = {
    ...headers,
    ticket: appTicket,
  };
  await next();
});

const request = async (
  url: string,
  params: any = {},
  data: any = {},
  method: 'POST' | 'GET',
) => {
  /** 手机环境 */
  if (isCordova()) {
    let newUrl = url;
    let urlData = {};

    /** app需要完整URL */
    if (newUrl.startsWith('/server')) {
      newUrl = `${DEV_BASE_URL}${url}`;
    }

    // console.log(newUrl);

    if (method == 'GET') {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in params) {
        const source = { [key]: params[key] + '' };
        urlData = Object.assign(urlData, source);
      }
      // console.log('Get', urlData);
    } else {
      // console.log('Post', data);
    }

    // 获取ticket
    const appTicket = getLocalStorage('APP_TICKET');

    const options = {
      method,
      data,
      params: method == 'GET' ? urlData : params,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ticket: appTicket,
      },
    };
    cordova.plugin.http.setDataSerializer('json');
    return new Promise((resolve) => {
      cordova.plugin.http.sendRequest(
        newUrl,
        options,
        (response: any) => {
          try {
            response.data = JSON.parse(response.data);
            resolve(response.data);
          } catch (e) {
            console.error('JSON parsing error');
          }
        },
        (response: any) => {
          errorHandler(response, resolve);
        },
      );
    });
  }

  // 浏览器环境
  if (method === 'POST') {
    return http(url, { data, params, method: 'POST' });
  }
  if (method === 'GET') {
    return http(url, { params });
  }
  return false;
};

/** GET请求 */
export const get = (url: string, params?: any) => {
  return request(url, params, {}, 'GET');
};

/** POST请求 */
export const post = (url: string, data?: any, params?: any) => {
  return request(url, params, data, 'POST');
};
