import AppHeader from '@/components/system/AppHeader';
import { AppContent } from '@/components/system/AppPages';
import { AddSquareOutline } from 'antd-mobile-icons';
import React, { useState } from 'react';
import styles from './index.less';
import { history, useDispatch } from 'umi';
import { Button } from 'antd-mobile';

const Home = () => {
  const dispatch = useDispatch();
  return (
    <>
      <AppHeader canBack={false}>我的</AppHeader>
      <AppContent>
        <Button
          color="primary"
          onClick={() => {
            dispatch({
              type: 'login/logout',
              payload: {},
            });
          }}
        >
          退出系统
        </Button>
      </AppContent>
    </>
  );
};

export default Home;
