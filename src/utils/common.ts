import CryptoJS from 'crypto-js';
import { Toast } from 'antd-mobile';

declare const window: any;

/** 是否是app环境 */
export const isCordova = () =>
  !!(window.cordova || window.phonegap || window.PhoneGap);

/** key和偏移量 */
const KEY = 'dhhjfgshjdf';
const IV = 'dfjshdfjkdh';

/** aes加密 */
export const AesEnc = (data: string) => {
  const keys = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(KEY).toString());
  const ivs = CryptoJS.enc.Utf8.parse(
    CryptoJS.MD5(IV).toString().substr(0, 16),
  );
  const encrypted = CryptoJS.AES.encrypt(data, keys, {
    iv: ivs,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); //返回的是base64格式的密文
};

/**
 * 图片压缩方法
 * @param base64 ：base64
 * @param w ：压缩分辨率，建议1000-2000
 */
export function dealImage(base64: string, w: number): Promise<string> {
  return new Promise((resolve) => {
    const newImage = new Image();
    let quality = 0.9; // 压缩系数0-1之间
    newImage.src = base64;
    newImage.setAttribute('crossOrigin', 'Anonymous'); // url为外域时需要
    let imgWidth;
    let imgHeight;
    newImage.onload = () => {
      imgWidth = newImage.width;
      imgHeight = newImage.height;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (Math.max(imgWidth, imgHeight) > w) {
        if (imgWidth > imgHeight) {
          canvas.width = w;
          canvas.height = (w * imgHeight) / imgWidth;
        } else {
          canvas.height = w;
          canvas.width = (w * imgWidth) / imgHeight;
        }
      } else {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        quality = 0.9;
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(newImage, 0, 0, canvas.width, canvas.height);
      const base64Back: string = canvas.toDataURL('image/jpeg', quality); // 压缩语句
      // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
      // while (base64.length / 1024 > 150) {
      // 	quality -= 0.01;
      // 	base64 = canvas.toDataURL("image/jpeg", quality);
      // }
      // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
      // while (base64.length / 1024 < 50) {
      // 	quality += 0.001;
      // 	base64 = canvas.toDataURL("image/jpeg", quality);
      // }
      resolve(base64Back);
    };
  });
}

/** 请求设备环境 ios android */
export const requestMobileContext = () => {
  const mobileType = navigator.userAgent;
  const isAndroid =
    mobileType.indexOf('Android') > -1 || mobileType.indexOf('Adr') > -1; // android终端
  const isIOS = !!mobileType.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    return 'ios';
  }
  if (isAndroid) {
    return 'android';
  }
  return 'pc';
};

/**
 * file类型转base地址
 * @param file
 * @returns
 */
export const getBase64Url = (file: File) => {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = async (e) => {
      const base64 = e?.target?.result;
      resolve(base64);
    };
  });
};

export default class Tips {
  static isLoading = false;

  /**
   * 轻提示
   * @param content 提示内容
   * @param duration 弹窗展示时间 1000ms
   */
  static Toast(
    content: string,
    duration: number = 1000,
    afterClose?: () => void,
  ) {
    Toast.show({
      content,
      maskClickable: true,
      duration,
      afterClose,
    });
  }

  /**
   * 加载提示弹窗
   * @param content 加载中
   * @returns
   */
  static Loading(content = '加载中') {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    if (Toast.show) {
      Toast.show({
        content,
        icon: 'loading',
        maskClickable: false,
        duration: 10000, // 十秒后自动关闭,优化用户体验
      });
    }
  }

  /**
   * 加载完成
   */
  static Loaded() {
    let duration = 0;
    if (this.isLoading) {
      this.isLoading = false;
      Toast.clear();
      duration = 500;
    }
    // 设定隐藏的动画时长为500ms,防止直接toast时出现问题
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  /**
   * 成功提示框
   * @param content success提示语
   * @param duration 显示时间 1500
   * @returns
   */
  // eslint-disable-next-line consistent-return
  static Success(
    content: string = '操作成功',
    afterClose?: () => void,
    duration: number = 1000,
  ) {
    Toast.show({
      content,
      icon: 'success',
      duration,
      maskClickable: false,
      afterClose,
    });
    if (duration > 0) {
      return new Promise((resolve) => setTimeout(resolve, duration));
    }
  }
}

/** 设置session */
export const setSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

/** 获取session */
export const getSessionStorage = (key: string) => {
  return sessionStorage.getItem(key) || '';
};

/** 删除session */
export const delSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

/** 设置Local */
export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/** 获取Local */
export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key) || '';
};

/** 删除Local */
export const delLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
