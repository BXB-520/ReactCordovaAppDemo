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
import { useEffect, useState } from 'react';
import { cordovaCheckPermission } from '@/utils/cordova';


declare const Wechat: any;

const Home = () => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {

  }, []);

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
        leftContent={
          <div style={{ fontSize: '18px', fontWeight: '600' }}></div>
        }
        children="首页"
      />

      <AppContent>
        <div className={styles.bg}>
          <div className={styles.content}>
            <div className={styles.serach}>
              <div className={styles.title}>TitleBX</div>
              
            </div>
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
