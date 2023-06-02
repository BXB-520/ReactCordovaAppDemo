import { Toast } from 'antd-mobile';
import { isCordova } from './common';

declare const navigator: any;
declare const Camera: any;
declare const cordova: any;
declare const webview: any;
declare const window: any;
declare const FileUploadOptions: any;
declare const FileTransfer: any;

/** 关闭App */
const cordovaCloseApp = () => {
  if (!isCordova()) return;
  webview.Close();
};

/**
 * 参数说明
 * quality: 100,//质量50-100
 * destinationType: Camera.DestinationType.FILE_URI,//选择返回值的格式设置图形格式
 * encodingType: Camera.EncodingType.BASE64,//选择返回的图像文件的编码JPEG,PNG
 * mediaType: Camera.MediaType.PICTURE,//设置要从中选择的媒体类型，图片
 * saveToPhotoAlbum: false,//保存到系统相册
 * cameraDirection: Camera.Direction.FRONT,//选择前置摄像头
 * */

/** 拍照返回base64数据 */
const cordovaGetPicture = (type: 'CAMERA' | 'PHOTO'): Promise<string> => {
  const options = {
    quality: 100,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    sourceType:
      type == 'CAMERA'
        ? Camera.PictureSourceType.CAMERA
        : Camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    cameraDirection: Camera.Direction.FRONT,
  };
  return new Promise((resolve) => {
    if (!isCordova()) resolve('');
    navigator.camera.getPicture(
      (imageData: string) => {
        resolve(`data:image/png;base64,${imageData}`);
      },
      (error: string) => {
        console.log('camera.getPicture 出错了', error);
        resolve('');
      },
      options,
    );
  });
};

export interface BarcodeScanData {
  text: string;
  format?: string;
  cancelled?: string;
}

/** 扫描二维码 */
const cordovaBarcodeScan = (): Promise<string> => {
  return new Promise((resolve) => {
    if (!isCordova()) resolve('');
    cordova.plugins.barcodeScanner.scan(
      (result: BarcodeScanData) => {
        resolve(result.text);
      },
      (error: string) => {
        console.log(`Scanning failed: ${error}`);
        resolve('');
      },
      {
        preferFrontCamera: false, // 是否默认使用前置摄像头（同时支持 iOS 和 Android）
        showFlipCameraButton: false, // 是否显示前后摄像头切换按钮（同时支持 iOS 和 Android）
        showTorchButton: false, // 是否显示打开关闭闪光灯按钮（同时支持 iOS 和 Android）
        torchOn: false, // 是否默认打开闪关灯（仅支持 Android）
        saveHistory: false, // 是否记录扫码历史（仅支持 Android）
        prompt: '请扫描二维码', // 扫码界面下方提示语（仅支持 Android）
        // resultDisplayDuration: 500, // 扫码文本在扫码界面上显示多少毫秒。0完全禁用。默认1500（仅Android）
        // formats : "QR_CODE,PDF_417", // 支持的格式,默认为除PDF_417和RSS_EXPANDED之外的所有格式
        orientation: 'portrait', // 设置为横向或纵向(portrait|landscape),默认跟随手机旋转（仅Android）
        // disableAnimations : true, // 禁用动画（仅支持 iOS）
        // disableSuccessBeep: false // 禁用成功蜂鸣声（同时支持 iOS 和 Android）
      },
    );
  });
};

interface PositionType {
  longitude: string;
  latitude: string;
  accuracy: string;
  data: string;
}

/** 获取定位 */
const cordovaGetPosition = (): Promise<PositionType> => {
  Toast.show({
    content: '正在获取位置信息',
    position: 'bottom',
  });

  let timer: null = null;

  return new Promise((resolve: Function) => {
    if (!isCordova()) {
      resolve({
        longitude: '',
        latitude: '',
        accuracy: '',
        data: '',
      });
    }

    timer = navigator.geolocation.getCurrentPosition(
      (position: {
        timestamp: string; // 获取时间
        coords: {
          longitude: number; // 经度
          latitude: number; // 纬度
          accuracy: number; // 准确度
        };
      }) => {
        Toast.show({
          content: '位置信息获取成功',
          position: 'bottom',
        });

        const newJson = {
          longitude: position.coords.longitude, //经度
          latitude: position.coords.latitude, //纬度
          accuracy: position.coords.accuracy, //准确度
          data: new Date(position.timestamp),
        };

        resolve(newJson);
        // 清除多次地理位置定位
        navigator.geolocation.clearWatch(timer);
      },
      (error: { code: number }) => {
        console.log(error.code);
        switch (error.code) {
          case 1:
            Toast.show({
              content: '定位未授权',
              position: 'bottom',
            });

            break;
          case 2:
            Toast.show({
              content: '位置信息获取失败',
              position: 'bottom',
            });

            break;
          case 3:
            Toast.show({
              content: '位置信息获取超时',
              position: 'bottom',
            });

            break;

          default:
            break;
        }
        const newJson = {
          longitude: '',
          latitude: '',
          accuracy: '',
          data: '',
        };

        resolve(newJson);
        // 清除多次地理位置定位
        navigator.geolocation.clearWatch(timer);
      },
      {
        /* 数据收集 :  json的形式
       enableHighAcuracy  :  更精确的查找，默认false
       timeout  :指定获取地理位置的超时时间，默认不限时，单位为毫秒
       maximumAge :最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
       */
        enableHighAccuracy: true,
        // maximumAge: 1000,
        timeout: 20000,
      },
    );
  });
};

/** 在内部浏览器打开链接 */
const cordovaOpenInAppBrowser = (url: string) => {
  if (!isCordova()) return;
  // cordova.InAppBrowser.open(
  //   url,
  //   '_blank',
  //   'location=no',
  //   'clearcache:false',
  //   'clearsessioncache:false',
  // );
  webview.Show(
    url,
    (success: any) => {
      console.log('success', success);
    },
    (error: any) => {
      console.log('error', error);
    },
  );
};

/** 在浏览器打开链接 */
const cordovaOpenOutAppBrowser = (url: string) => {
  if (!isCordova()) return;
  cordova.InAppBrowser.open(url, '_system');
};

/** 隐藏屏闪页面 */
const cordovaHideSplashscreen = () => {
  if (!isCordova()) return;
  navigator.splashscreen.hide();
};

/** app录音插件
 * limit：最大录制数量
 * duration：录制最大时间
 */
const cordovaGetCaptureAudio = (
  limit: number,
  duration: number,
): Promise<{}[]> => {
  return new Promise((resolve: Function) => {
    if (!isCordova()) resolve('');
    navigator.device.capture.captureAudio(
      (result: {}[]) => {
        console.log('result', result);
        resolve(result);
      },
      (error: string) => {
        console.log('err', error);
        resolve([]);
      },
      { limit, duration },
    );
  });
};

/** 文件上传
 * fileURL：文件路径
 * uploadUrl：上传地址
 * uploadParams：上传参数
 */
const cordovaFileUpload = (
  fileURL: string,
  uploadUrl: string,
  uploadParams: {},
): Promise<boolean> => {
  return new Promise((resolve: Function) => {
    const options = new FileUploadOptions();

    options.fileKey = 'file';
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = 'application/json;charset=UTF-8';
    options.httpMethod = 'POST';
    options.headers = null;
    options.params = { ...uploadParams };

    const FT = new FileTransfer();

    // 上传成功
    const success = (r: { responseCode: string }) => {
      console.log(`上传成功! Code = ${r.responseCode}`);
      resolve(true);
    };

    // 上传失败
    const fail = (error: { code: string }) => {
      console.log(`上传失败! Code = ${error.code}`);
      resolve(false);
    };
    FT.upload(fileURL, encodeURI(uploadUrl), success, fail, options);
  });
};

/**
 * app拨打高清视频通话插件
 * phoneNumber：电话号码
 */
const cordovaCallVolte = (phoneNumber: number): Promise<boolean> => {
  return new Promise((resolve: Function) => {
    window.plugins.VideoCall.videoCall(
      (success: string) => {
        console.log(success);
        resolve(true);
      },
      (error: string) => {
        Toast.show({ content: '拨打Volte视频通话失败', position: 'bottom' });
        console.log(error);
        resolve(false);
      },
      phoneNumber,
    );
  });
};

/** App权限申请，防止视频黑屏 */
const cordovaCheckPermission = () => {
  if (!isCordova()) return '';
  const { permissions } = cordova.plugins;
  // 定义需要获取的手机权限List
  const permList: any[] = [
    permissions.WRITE_EXTERNAL_STORAGE,
    // permissions.ACCESS_FINE_LOCATION,
    permissions.CAMERA,
  ];

  // 检查权限
  return permissions.hasPermission(
    permList,
    (success: { hasPermission: boolean }) => {
      // 检查成功
      console.log(`s===${success}`);
      cordovaCheckingPermission(success, permList, permissions);
    },
    (error: string) => {
      // 检查失败
      console.log(`rror===${error}`);
    },
  );
};

/** 权限检查 */
const cordovaCheckingPermission = (
  type: { hasPermission: boolean },
  permList: any[],
  permissions: {
    requestPermissions: (
      arg0: any[],
      arg1: (success: { hasPermission: boolean }) => void,
      arg2: (error: string) => void,
    ) => void;
  },
) => {
  // hasPermission 验证app是否有权限
  if (!type.hasPermission) {
    // 没有权限	调用申请
    permissions.requestPermissions(
      permList,
      (success: { hasPermission: boolean }) => {
        if (success.hasPermission) {
          // 申请成功
          console.log('申请成功');
        } else {
          // 申请失败
          console.log('申请失败');
        }
      },
      (error: string) => {
        console.log(`申请失败:${JSON.stringify(error)}`);
      },
    );
  } else {
    // 拥有权限
    console.log('拥有权限');
  }
};

/** 模拟 */
const timeOut = (delay = 1000) => {
  return new Promise((resolve: Function) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

export {
  cordovaCloseApp, //关闭App
  cordovaGetPicture, //拍照返回base64数据
  cordovaBarcodeScan, //扫描二维码
  cordovaGetPosition, //获取定位
  cordovaOpenInAppBrowser, //在内部浏览器打开链接
  cordovaOpenOutAppBrowser, //在浏览器打开链接
  cordovaHideSplashscreen, //隐藏屏闪
  cordovaGetCaptureAudio, //录音
  cordovaFileUpload, //文件上传
  cordovaCallVolte, //拨打高清视频通话
  cordovaCheckPermission, //权限申请
};
