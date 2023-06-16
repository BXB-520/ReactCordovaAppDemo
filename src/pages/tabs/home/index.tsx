import AppHeader from '@/components/system/AppHeader';
import { AppContent } from '@/components/system/AppPages';
import styles from './index.less';
import { history } from 'umi';
import {
  AppstoreOutline,
  CameraOutline,
  CloseOutline,
  SearchOutline,
  SmileOutline,
  VideoOutline,
} from 'antd-mobile-icons';
import { Button, Card, Input } from 'antd-mobile';
import React, { useEffect, useState } from 'react';
import {
  cordovaBarcodeScan,
  cordovaCheckPermission,
  cordovaFileDownload,
  cordovaFileDownloadToJPG,
  cordovaOpenInAppBrowser,
} from '@/utils/cordova';
import {
  getLocalStorage,
  getSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from '@/utils/common';

declare const Wechat: any;

const Home = () => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {}, []);

  const list = [
    {
      url: '/demo',
      title: 'demo',
      icon: <AppstoreOutline />,
    },
  ];
  return (
    <>
      <AppHeader
        canBack={false}
        leftContent={<div style={{ fontSize: '18px', fontWeight: '600' }} />}
      >
        首页
      </AppHeader>

      <AppContent>
        <div className={styles.bg}>
          <div className={styles.content}>
            <div className={styles.serach}>
              <div className={styles.title}>TitleBX</div>
            </div>
            <Button
              onClick={() => {
                cordovaOpenInAppBrowser(
                  'http://xmtzx.cqyouths.com/match/',
                  // 'http://114.132.187.155:8082?ssoToken=123',
                );
              }}
            >
              open
            </Button>
            <Button
              onClick={() => {
                cordovaOpenInAppBrowser('https://m.bilibili.com/');
              }}
            >
              open1
            </Button>
            <Button
              onClick={() => {
                cordovaOpenInAppBrowser('http://114.132.187.155:8081/');
              }}
            >
              open2
            </Button>

            <Button
              onClick={() => {
                setSessionStorage('bx', '1');
              }}
            >
              sets
            </Button>

            <Button
              onClick={() => {
                console.log(getSessionStorage('bx'));
              }}
            >
              gets
            </Button>

            <Button
              onClick={() => {
                setLocalStorage('xb', '1');
              }}
            >
              setl
            </Button>

            <Button
              onClick={() => {
                console.log(getLocalStorage('xb'));
              }}
            >
              getl
            </Button>
            <Button
              onClick={() => {
                webview.ExitApp();
              }}
            >
              webview返回
            </Button>
            <Button
              onClick={() => {
                UserAgent.set('12345');
              }}
            >
              UserAgent.set(useragent)
            </Button>
            <Button
              onClick={() => {
                UserAgent.get(function (ua) {
                  console.log(ua);
                });
              }}
            >
              UserAgent.set(useragent)
            </Button>
            <Button
              onClick={() => {
                UserAgent.reset();
              }}
            >
              UserAgent.reset()
            </Button>
            <Button
              onClick={() => {
                cordovaFileDownloadToJPG(
                  ['http://114.132.187.155:8082/webview/android/12.jpg'],
                  '.jpg',
                );
              }}
            >
              下载1张
            </Button>
            <Button
              onClick={() => {
                cordovaFileDownloadToJPG(
                  [
                    'http://114.132.187.155:8082/webview/android/11.jpg',
                    'http://114.132.187.155:8082/webview/android/12.jpg',
                    'http://114.132.187.155:8082/webview/android/13.jpg',
                    'http://114.132.187.155:8082/webview/android/14.jpg',
                  ],
                  '.jpg',
                );
              }}
            >
              下载4张
            </Button>
            <Button
              onClick={() => {
                cordovaFileDownloadToJPG(
                  [
                    'http://114.132.187.155:8082/webview/android/11.jpg',
                    'http://114.132.187.155:8082/webview/android/12.jpg',
                    'http://114.132.187.155:8082/webview/android/19.jpg',
                    'http://114.132.187.155:8082/webview/android/14.jpg',
                  ],
                  '.jpg',
                );
              }}
            >
              下载4张 1张有问题
            </Button>

            <div className={styles.content}>
              {list.map((items: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={styles.card}
                    onClick={() => {
                      history.push(items.url);
                    }}
                  >
                    <div className={styles.icon}>Demo</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AppContent>
    </>
  );
};

export default Home;
