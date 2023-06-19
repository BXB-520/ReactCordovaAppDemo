import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { history } from 'umi';
import { Toast } from 'antd-mobile';
import AppMain from '../AppMain';
import { THEMECOLOR } from '@/constants/system';
import styles from '../AppMain/index.less';
import { cordovaHideSplashscreen } from '@/utils/cordova';

declare const StatusBar: any;
declare const navigator: any;
declare const window: any;

let exitNum = 0;
let backNum: number = 1;

const AppGesture = ({ gestureprops }: any) => {
  const ref = useRef<{ getHistorys: Function }>(null);

  /** 是否黑暗模式 */
  const [enableDarkMode, setEnableDarkMode] = useState(true);

  useEffect(() => {
    // 初始化APP，修改状态栏颜色

    const onDeviceReady = () => {
      // 沉浸式状态栏不需要这个
      // StatusBar.backgroundColorByHexString(THEMECOLOR);
      // StatusBar.styleLightContent();

      StatusBar.overlaysWebView();

      /** 返回按钮绑定 */
      document.addEventListener('backbutton', eventBackButton);

      cordovaHideSplashscreen();
    };

    // 待设备初始化完成，才能使用cordova插件
    document.addEventListener('deviceready', onDeviceReady, false);

    setdarkModeHander();
  }, []);

  /** 黑暗模式切换 */
  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      'data-prefers-color-scheme',
      enableDarkMode ? 'dark' : 'light',
    );
  }, [enableDarkMode]);

  /** 设置黑暗模式 */
  const setdarkModeHander = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const darkModeHander = () => {
      if (mediaQuery.matches) {
        setEnableDarkMode(true);
      } else {
        setEnableDarkMode(false);
      }
    };
    darkModeHander();
    mediaQuery.addListener(darkModeHander);
  };

  const eventBackButton = async () => {
    // 返回按钮关闭模态框
    if (window.RmcModal) return;
    const parentNode = document.getElementById('root')?.parentNode;
    const nodes: any = parentNode?.children;

    const modalElement: HTMLElement[] = [];
    nodes.forEach((node: HTMLElement) => {
      if (
        node.id.includes('am-modal-container-') ||
        node.id.includes('rmc-dialog-container-')
      )
        modalElement.push(node);
    });

    if (modalElement.length > 0) {
      modalElement.forEach((element: HTMLElement) => {
        parentNode?.removeChild(element);
      });
      return;
    }

    if (backNum == 1) {
      backNum++;
      backHistorys();
      /** 防止安卓返回按钮退出过快 */
      setTimeout(() => {
        backNum = 1;
      }, 280);
    }
  };

  const backHistorys = () => {
    // 返回历史页面或退出APP
    const historys = ref.current?.getHistorys();

    if (historys.length > 1) {
      history.goBack();
    } else if (exitNum > 0) {
      navigator.app.exitApp();
    } else {
      Toast.show({
        content: '再按一次退出APP',
        position: 'bottom',
      });
      exitNum += 1;
      setTimeout(() => {
        exitNum = 0;
      }, 2000);
    }
  };

  return (
    <>
      <AppMain mainprops={{ ...gestureprops, ref }} />
      {/* 预加载一次 页面前进动画，不然在安卓上页面跳转会卡顿 */}
      <div className={styles.open}>
        <div className={styles.now} />
        <div className={styles.old} />
      </div>
    </>
  );
};

export default AppGesture;
