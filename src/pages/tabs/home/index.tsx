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
  cordovaCheckPermission,
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
                cordovaOpenInAppBrowser('http://114.132.187.155:8082');
              }}
            >
              open
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
                webview.Close();
              }}
            >
              webview返回
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
