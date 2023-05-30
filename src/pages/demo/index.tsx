import React, { useEffect, useState } from 'react';
import { List, Switch } from 'antd-mobile';
import { history } from 'umi';
import { dealImage } from '@/utils/common';
import bg404 from '@/assets/404.svg';
import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import styles from './index.less';
import { DelayUseEffect } from '@/hooks';

const WebView = (props: any) => {
  useEffect(() => {}, []);

  DelayUseEffect(() => {});

  const list = [
    {
      url: '/demo/morePicker',
      title: '多条件选择器',
    },
    {
      url: '/demo/playVideo',
      title: 'flv视频播放器',
    },
    {
      url: '/demo/scrollList',
      title: '滚动与刷新',
    },
    {
      url: '/demo/callBack',
      title: '页面回调上一级',
    },
    {
      url: '/demo/topTabs',
      title: '多页签选择器',
    },
    {
      url: '/demo/newPopup',
      title: '新弹出层',
    },
    {
      url: '/demo/upload',
      title: '图片上传',
    },
    {
      url: '/demo/request',
      title: '接口使用',
    },
  ];
  return (
    <AppPage>
      <AppHeader>demo</AppHeader>
      <AppContent>
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
                <div className={styles.title}>{items.title}</div>
              </div>
            );
          })}
        </div>
      </AppContent>
    </AppPage>
  );
};

export default WebView;
