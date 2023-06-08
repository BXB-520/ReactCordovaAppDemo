import React, { useEffect } from 'react';
import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import { Card, Button, Toast } from 'antd-mobile';
import { DelayUseEffect } from '@/hooks';
import styles from './index.less';
import CcsUseCamera from '@/components/common/CcsUseCamera';
import { cordovaBarcodeScan } from '@/utils/cordova';

import { getBase64Url } from '@/utils/common';
import CcsCarmaUpload from '@/components/common/CcsCarmaUpload';

const request = () => {
  DelayUseEffect(() => {});

  const imageType = ['image/jpeg', 'image/png', 'image/jpg'];
  //上传前限制
  async function beforeUpload(
    file: File,
    files: File[],
  ): Promise<File | null | undefined> {
    const isJPG = imageType.some((e) => e === file.type);
    if (!isJPG) {
      Toast.show({
        icon: 'fail',
        content: '只能上传png与jpg格式的图片',
      });
      return null;
    }
    if (file.size > 1024 * 1024 * 8) {
      Toast.show({
        icon: 'fail',
        content: '请选择小于 8M 的图片',
      });
      return null;
    }
    return file;
  }

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
                  direction="BACK"
                  backBase64={(Base64: string) => {
                    console.log(Base64);
                  }}
                >
                  <div className={styles.button}>点击启动相机后</div>
                </CcsUseCamera>
              </div>

              <div>
                <CcsUseCamera
                  type="CAMERA"
                  direction="FRONT"
                  backBase64={(Base64: string) => {
                    console.log(Base64);
                  }}
                >
                  <div className={styles.button}>点击启动相机前</div>
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
              <div>
                <CcsCarmaUpload
                  onChange={(file) => {
                    console.log(file);
                  }}
                  upload={async (vals) => {
                    const base64 =
                      typeof vals === 'string'
                        ? vals
                        : await getBase64Url(vals);
                    console.log(base64);
                  }}
                  type="PHOTO"
                  beforeUpload={beforeUpload as any}
                  maxCount={1}
                />
              </div>

              <div>
                <Button
                  onClick={() => {
                    cordovaBarcodeScan().then((e) => {
                      console.log(e);
                    });
                  }}
                >
                  扫描二维码
                </Button>
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
