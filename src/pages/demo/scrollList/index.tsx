import React, { useEffect, useRef, useState } from 'react';

import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import styles from './index.less';
import {
  Button,
  Card,
  DotLoading,
  ErrorBlock,
  InfiniteScroll,
  Input,
  List,
  PullToRefresh,
} from 'antd-mobile';
import CcsPlayFlvVideo from '@/components/common/CcsPlayFlvVideo';
import useRequest from '@ahooksjs/use-request';
import { client_search_cp } from './_serves';
import CcsScrollList from '@/components/common/CcsScrollList';

import { DelayUseEffect } from '@/hooks';
import { HttpResult } from '@/services/http';

const QueryList = (
  e: any,
): Promise<{ success: any; data: { totalNum: number; result: any[] } }> => {
  console.log(e);
  return new Promise((resolve) => {
    setTimeout(() => {
      const aList = [];
      for (
        let index = (e.pageNo - 1) * e.pageSize;
        index < (e.pageNo - 1) * e.pageSize + 20;
        index += 1
      ) {
        if (index < 65) {
          aList.push({ id: index, title: `name${index + 1}` });
        }
      }

      const newjson = {
        success: true,
        data: {
          result: aList,
          totalNum: 65,
        },
      };
      resolve(newjson);
    }, 500);
  });
};

const PlayVideo = (props: any) => {
  const [videoList, setVideoList] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(true);

  const QueryListApi = useRequest<HttpResult>(QueryList, {
    manual: true,
  });

  const params = useRef<any>({
    pageNo: 1,
    pageSize: 20,
    query: {},
  });

  // 获取数据
  const getQueryListData = async (type: 'refresh' | 'loadMore') => {
    if (type == 'refresh') {
      setloading(true);
      params.current.pageNo = 1;
    }
    if (type == 'loadMore') {
      params.current.pageNo += 1;
    }

    const { success, data } = await QueryListApi.run(params?.current);

    if (success) {
      if (type == 'loadMore') {
        setVideoList([...videoList, ...data.result]);
      } else {
        setVideoList([...data.result]);
      }
    }
    setloading(false);
  };

  DelayUseEffect(() => {
    getQueryListData('refresh');
  });

  return (
    <AppPage>
      <AppHeader>滚动与刷新</AppHeader>
      <AppContent style={{ backgroundColor: '#f4f5fb' }}>
        <CcsScrollList
          refresh={() => getQueryListData('refresh')}
          loadMore={() => getQueryListData('loadMore')}
          moreLoading={
            QueryListApi.data?.data.totalNum > params.current.pageSize
          }
          loading={loading}
          pagination={{
            totalNum: QueryListApi.data?.data.totalNum,
            height: '40%',
            pageSize: params.current.pageSize,
            pageNo: params.current.pageNo,
          }}
          style={{
            background: '#ffffff',
          }}
        >
          <div>
            <div>
              {videoList.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    height: '60px',
                    background: '#87ceeb',
                    borderRadius: '0px',
                    margin: '8px',
                    textAlign: 'center',
                    lineHeight: '60px',
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </CcsScrollList>
        <div className={styles.bg}>
          <div className={styles.content}>
            <Card title="使用说明(CcsScrollList)">
              refresh: 数据刷新接口
              <br />
              loadMore: 数据加载接口
              <br />
              moreLoading:是否加载更多
              <br />
              loading:加载
              <br />
              pagination:详细参数 如下
              <br />
              {
                '{totalNum 总数,height 高度,pageSize 单页查询大小,pageNo 当前页}'
              }
              <br />
            </Card>
          </div>
          <div className={styles.not}>配置请参考 CcsScrollList</div>
        </div>
      </AppContent>
    </AppPage>
  );
};

export default PlayVideo;
