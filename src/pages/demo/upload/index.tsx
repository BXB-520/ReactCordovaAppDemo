import React, { useEffect } from 'react';
import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import { Card, Button } from 'antd-mobile';
import { DelayUseEffect } from '@/hooks';
import styles from './index.less';
import CcsUseCamera from '@/components/common/CcsUseCamera';

const request = () => {
  DelayUseEffect(() => {});

  return (
    <AppPage>
      <AppHeader>图片选择</AppHeader>
      <AppContent style={{ backgroundColor: '#f4f5fb' }}>
        <div className={styles.bg}>
          <div className={styles.content}>
            <Card title="图片选择">
              <div>
                <CcsUseCamera
                  type="CAMERA"
                  backBase64={(Base64: string) => {
                    console.log(Base64);
                  }}
                >
                  <div className={styles.button}>点击启动相机</div>
                </CcsUseCamera>
              </div>

              <div>
                <CcsUseCamera
                  type="PHOTO"
                  backBase64={(Base64: string) => {
                    console.log(Base64);
                  }}
                >
                  <div className={styles.button}>点击选择图片</div>
                </CcsUseCamera>
              </div>
            </Card>
          </div>

          <div className={styles.content}>
            <Card title="使用说明(CcsUseCamera)">
              type：CAMERA | PHOTO
              <br />
              backBase64：返回图片的base64
              <br />
            </Card>
          </div>
        </div>
      </AppContent>
    </AppPage>
  );
};

export default request;
