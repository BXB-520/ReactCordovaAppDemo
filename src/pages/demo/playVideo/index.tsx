import React, { useEffect, useRef, useState } from 'react';

import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import styles from './index.less';
import { Button, Card, Input } from 'antd-mobile';
import CcsPlayFlvVideo from '@/components/common/CcsPlayFlvVideo';
import { DelayUseEffect } from '@/hooks';

const PlayVideo = (props: any) => {
  const [value, setValue] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const valueRef = useRef<any>(null);

  useEffect(() => {}, []);

  DelayUseEffect(() => {
    setShow(true);
  });

  return (
    <AppPage>
      <AppHeader>flv视频播放器</AppHeader>
      <AppContent style={{ backgroundColor: '#f4f5fb' }}>
        <div className={styles.video}>
          {show ? <CcsPlayFlvVideo playUrl={value} /> : null}
        </div>
        <div className={styles.bg}>
          <div className={styles.content}>
            <Card title="请输入flv视频Url">
              <div className={styles.inputs}>
                <Input placeholder="请输入flv视频Url" ref={valueRef} />
                <Button
                  style={{ width: '70px' }}
                  onClick={() => {
                    setValue(valueRef.current.nativeElement.value);
                  }}
                >
                  播放
                </Button>
              </div>
            </Card>
          </div>
          <div className={styles.content}>
            <Card title="使用说明(CcsPlayFlvVideo)">
              type?: flv | mp4
              <br />
              coverUrl?: 封面Url
              <br />
              playUrl:视频Url
              <br />
              hasAudio:是否解析音频 默认false
              <br />
              isAutoPlay:是否自动播放 默认flase
              <br />
              width?: string; height?: string;
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
