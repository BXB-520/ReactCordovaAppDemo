import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import styles from './index.less';
import { Button, Card } from 'antd-mobile';
import {
  RouteInfoContext,
  RouteInfoContextType,
} from '@/components/system/AppMain';
import { history } from 'umi';
import { DelayUseEffect } from '@/hooks';

const PlayVideo = (props: any) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {}, []);

  DelayUseEffect(() => {});

  const context: RouteInfoContextType = useContext(RouteInfoContext);

  const nextPage = () => {
    context.pageCallBackRef.current.push({
      pageurl: '/demo/callBack',
      fn: settingBack,
    });
    history.push('/demo/callBack/callBackChild');
  };

  const settingBack = (e: any) => {
    setValue(e);
  };

  return (
    <AppPage>
      <AppHeader>页面回调</AppHeader>
      <AppContent style={{ backgroundColor: '#f4f5fb' }}>
        <div className={styles.bg}>
          <div className={styles.content}>
            <Card title={`下一页返回的参数：${JSON.stringify(value)}`}>
              <Button color="primary" onClick={nextPage}>
                进入下一页
              </Button>
            </Card>
          </div>
          <div className={styles.content}>
            <Card title="使用说明(RouteInfoContext)">
              声明
              <br />
              const context: RouteInfoContextType =
              useContext(RouteInfoContext);
              <br />
              注册
              <br />
              {
                "context.pageCallBackRef.current.push({pageurl: '/demo/callBack',fn: settingBack,})"
              }
              <br />
              调用
              <br />
              {"context.onHandleCallBack({ userName: 'bx', userId: '123' })"}
              <br />
            </Card>
          </div>
          <div className={styles.not}>配置json请参考 PlayFlvVideoInterFace</div>
        </div>
      </AppContent>
    </AppPage>
  );
};

export default PlayVideo;
