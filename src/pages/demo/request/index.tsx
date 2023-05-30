import React, { useEffect } from 'react';
import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import publicStyle from './index.less';
import { Button } from 'antd-mobile';
import { DelayUseEffect } from '@/hooks';
import useRequest from '@ahooksjs/use-request';
import {
  get401,
  get500,
  geterror,
  getsuccess,
  post401,
  post500,
  posterror,
  postsuccess,
} from './service';

const Request = () => {
  useEffect(() => {}, []);

  DelayUseEffect(() => {});

  const apiGetSuccess: any = useRequest<any>(getsuccess, { manual: true });
  const apiGetError: any = useRequest<any>(geterror, { manual: true });
  const apiGet500: any = useRequest<any>(get500, { manual: true });
  const apiGet401: any = useRequest<any>(get401, { manual: true });

  const apiPostSuccess: any = useRequest<any>(postsuccess, { manual: true });
  const apiPostError: any = useRequest<any>(posterror, { manual: true });
  const apiPost500: any = useRequest<any>(post500, { manual: true });
  const apiPost401: any = useRequest<any>(post401, { manual: true });

  return (
    <AppPage>
      <AppHeader>请求接口</AppHeader>
      <AppContent style={{ backgroundColor: '#f4f5fb' }}>
        <div className={publicStyle.pickbg}>
          <div>
            <Button
              onClick={() => {
                apiGetSuccess.run({ id: 1, text: 'ces' });
              }}
            >
              Get成功
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                apiGetError.run({ id: 1, text: 'ces' });
              }}
            >
              Get失败
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                apiGet500.run({ id: 1, text: 'ces' });
              }}
            >
              Get500
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                apiGet401.run({ id: 1, text: 'ces' });
              }}
            >
              Get401
            </Button>
          </div>
        </div>

        <div className={publicStyle.pickbg}>
          <div>
            <Button
              onClick={() => {
                apiPostSuccess.run({ id: 1, text: 'ces' });
              }}
            >
              Post成功
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                apiPostError.run({ id: 1, text: 'ces' });
              }}
            >
              Post失败
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                apiPost500.run({ id: 1, text: 'ces' });
              }}
            >
              Post500
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                apiPost401.run({ id: 1, text: 'ces' });
              }}
            >
              Post401
            </Button>
          </div>
        </div>
      </AppContent>
    </AppPage>
  );
};

export default Request;
