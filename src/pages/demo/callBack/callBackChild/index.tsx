import React, { useContext, useEffect, useState } from 'react';
import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import styles from './index.less';
import { Button, Card } from 'antd-mobile';
import {
  RouteInfoContext,
  RouteInfoContextType,
} from '@/components/system/AppMain';

const PlayVideo = (props: any) => {
  const context: RouteInfoContextType = useContext(RouteInfoContext);

  const [a, seta] = useState('');
  console.log(a);

  useEffect(() => {
    return () => {
      console.log(a);
    };
  }, []);

  return (
    <AppPage>
      <AppHeader>子页面传递数据回去</AppHeader>
      <AppContent style={{ backgroundColor: '#f4f5fb' }}>
        <div className={styles.bg}>
          <div className={styles.content}>
            <Card title="参数：{userName: 'bx', userId: '123'}">
              <Button
                color="primary"
                onClick={() => {
                  context.onHandleCallBack({ userName: 'bx', userId: '123' });
                }}
              >
                携带参数返回
              </Button>
              <Button
                onClick={() => {
                  seta('564556456');
                }}
              >
                1
              </Button>
            </Card>
          </div>
        </div>
      </AppContent>
    </AppPage>
  );
};

export default PlayVideo;
