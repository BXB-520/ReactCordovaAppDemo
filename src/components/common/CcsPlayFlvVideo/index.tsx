import type { FC } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import flvjs from 'flv.js';
import styles from './index.less';
import { CaretRightOutlined } from '@ant-design/icons';
import { Toast } from 'antd-mobile';
import Lucency from '@/assets/lucency.png';

export interface PlayFlvVideoInterFace {
  type?: 'flv' | 'mp4';
  /** 封面Url */
  coverUrl?: string;
  /** flvUrl */
  playUrl: string;
  /** 是否解析音频 默认false */
  hasAudio?: boolean;
  /** 是否自动播放 默认 flase */
  isAutoPlay?: boolean;
  width?: string;
  height?: string;
  /** 播放时长 */
  duration?: number;
}

/** flv视频播放组件 */
const CcsPlayFlvVideo: FC<PlayFlvVideoInterFace> = (props) => {
  const {
    type = 'flv',
    coverUrl,
    playUrl,
    hasAudio = true,
    isAutoPlay = false,
    width,
    height,
    duration,
  } = props;

  const URLRef = useRef<string>('');
  const flvPlayerRef = useRef<flvjs.Player | null>();
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [childIsPlaying, setChildIsPlaying] = useState<boolean>(isAutoPlay);

  const reloadTime = useRef<number>(1);

  useEffect(() => {
    const videoElements: any = videoRef.current;
    if (duration)
      videoElements.addEventListener('timeupdate', videoPause, false);

    return () => {
      destroy();
      if (duration)
        videoElements.removeEventListener('timeupdate', videoPause, false);
    };
  }, []);

  useEffect(() => {
    destroy();
    reloadTime.current = 1;
    if (playUrl) {
      createflvPlayer(playUrl);
      /** 自动播放 */
      if (childIsPlaying) {
        setIsPlaying(true);
        flvPlayerRef.current?.load();
        flvPlayerRef.current?.play();
      }
    }
  }, [playUrl]);

  const videoPause = () => {
    // console.log(flvPlayerRef.current?.mediaInfo);

    //用秒数来显示当前播放进度
    const timedisplay = Math.floor(videoRef.current.currentTime);
    const lastS = duration! / 1000 - 0.5;
    //console.log(lastS, timedisplay);

    //当视频播放到 50s的时候做处理
    if (timedisplay >= lastS) {
      //暂停播放
      flvPlayerRef.current?.pause();
    }
  };

  /** 创建播放 */
  const createflvPlayer = (liveUrl: string) => {
    if (flvjs.isSupported()) {
      console.log('Create Player');
      URLRef.current = liveUrl;
      const videoElements: any = videoRef.current;
      flvPlayerRef.current = flvjs.createPlayer(
        {
          type,
          url: liveUrl,
          hasAudio,
          isLive: true,
          //duration,
        },
        {
          //accurateSeek: true,
          //fixAudioTimestampGap: false,
          //enableWorker: true, // 不启用分离的线程进行转换，之前为true
          //enableStashBuffer: false, // 关闭IO隐藏缓冲区
          //stashInitialSize: 512, // 减少首帧显示等待时长
          //autoCleanupSourceBuffer: true, // 打开自动清除缓存
          //fixAudioTimestampGap: false, //false才会音视频同步,新增
          // lazyLoad: true,
          // lazyLoadMaxDuration: 1 * 60,
          // lazyLoadRecoverDuration: 10,
        },
      );
      flvPlayerRef.current?.attachMediaElement(videoElements);

      /** 异常监听 */
      flvPlayerRef.current?.on('error', (err) => {
        console.log('\x1B[41m%s\x1B[0m', 'video:', err);
        if (err !== 'NetworkError') {
          /** 除开网络错误意外的，进行销毁重启 */

          if (reloadTime.current == 1) {
            Toast.show({
              content: '视频播放异常，为您重置播放',
              position: 'bottom',
            });
          } else {
            setChildIsPlaying(false);
          }

          reloadTime.current++;
          destroy();
          reloadPlay();
        }
      });
    } else {
      Toast.show({ content: '浏览器不支持FLV视频播放！', position: 'bottom' });
    }
  };
  /** 开始播放 */
  const startflvPlayer = () => {
    if (reloadTime.current == 1) {
      /** 正常播放视频 */
      if (URLRef.current) {
        setIsPlaying(true);
        flvPlayerRef.current?.load();
        flvPlayerRef.current?.play();
      } else {
        Toast.show({ content: '未找到视频', position: 'bottom' });
      }
    } else {
      /** 重启播放视频 */
      reloadTime.current = 1;
      reloadPlay();
    }
  };

  /** 销毁直播 */
  const destroy = () => {
    if (URLRef.current && flvPlayerRef.current) {
      setIsPlaying(false);

      flvPlayerRef.current?.unload();
      flvPlayerRef.current?.detachMediaElement();
      flvPlayerRef.current?.destroy();
      flvPlayerRef.current = null;
      URLRef.current = '';

      console.log('\x1B[31m%s\x1B[0m', 'has destroy the video');
    }
  };

  /** 重启播放 */
  const reloadPlay = () => {
    if (playUrl && reloadTime.current <= 2) {
      createflvPlayer(playUrl);

      setIsPlaying(true);
      flvPlayerRef.current?.load();
      flvPlayerRef.current?.play();
    }
  };

  return (
    <>
      <div className={styles.videobackground}>
        {!childIsPlaying && !isPlaying ? (
          <div className={styles.box} onClick={startflvPlayer}>
            <div className={styles.boxs}>
              <CaretRightOutlined style={{ fontSize: '75px' }} />
            </div>
          </div>
        ) : null}
        <video
          id="videoElement"
          width={width ?? '100%'}
          height={height ?? '100%'}
          ref={videoRef}
          poster={coverUrl ?? Lucency}
          controls
          autoPlay
          muted
        />
      </div>
    </>
  );
};

export default CcsPlayFlvVideo;
