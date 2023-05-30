import React, { useEffect, useState } from 'react';
import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import styles from './index.less';
import { Button, Card } from 'antd-mobile';
import CcsPopup from '@/components/common/CcsPopup';

const NewPopup = (props: any) => {
  const [visable1, setVisable1] = useState<boolean>(false);
  const [visable2, setVisable2] = useState<boolean>(false);
  const [visable3, setVisable3] = useState<boolean>(false);
  const [visable4, setVisable4] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <AppPage>
      <AppHeader>新弹出层</AppHeader>
      <AppContent style={{ backgroundColor: '#f4f5fb' }}>
        <div className={styles.bg}>
          <div className={styles.content}>
            <Card title="">
              <div>
                <Button
                  onClick={() => {
                    setVisable1(!visable1);
                  }}
                >
                  右边出来的内容
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    setVisable2(!visable2);
                  }}
                >
                  左边出来的内容
                </Button>
              </div>

              <div style={{ marginTop: '10px' }}>
                <Button
                  onClick={() => {
                    setVisable3(!visable3);
                  }}
                >
                  上边出来的内容
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    setVisable4(!visable4);
                  }}
                >
                  下边出来的内容
                </Button>
              </div>
            </Card>
          </div>
          <div className={styles.content}>
            <Card title="使用说明(CcsPopup)">
              visable:开关状态控制
              <br />
              contentWidth:展开宽度
              <br />
              onMaskClick:遮罩事件
              <br />
              position:展开方向 top | bottom | right | left
              <br />
              children:内容
              <br />
            </Card>
          </div>
          <div className={styles.not}>
            配置json请参考 CcsPopup : CcsPopupType
          </div>
        </div>

        <CcsPopup
          visable={visable1}
          onMaskClick={() => setVisable1(!visable1)}
          contentWidth="60vw"
          position="right"
        >
          这是右边出来的内容
        </CcsPopup>
        <CcsPopup
          visable={visable2}
          onMaskClick={() => setVisable2(!visable2)}
          contentWidth="60vw"
          position="left"
        >
          这是左边出来的内容
        </CcsPopup>
        <CcsPopup
          visable={visable3}
          onMaskClick={() => setVisable3(!visable3)}
          contentWidth="30vh"
          position="top"
        >
          这是上边出来的内容
        </CcsPopup>
        <CcsPopup
          visable={visable4}
          onMaskClick={() => setVisable4(!visable4)}
          contentWidth="30vh"
          position="bottom"
        >
          这是下边出来的内容
        </CcsPopup>
      </AppContent>
    </AppPage>
  );
};

export default NewPopup;
