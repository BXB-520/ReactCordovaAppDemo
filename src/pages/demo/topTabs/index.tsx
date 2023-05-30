import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import styles from './index.less';
import { Card, Input } from 'antd-mobile';
import CcsTabs from '@/components/common/CcsTabs';
import React from 'react';

const TopTabs = () => {
  const list = [
    {
      key: '1',
      title: '测试数据1',
      children: (
        <div style={{ margin: '12px' }}>
          12
          <Input placeholder="请输入参数" />
        </div>
      ),
    },
    {
      key: '2',
      title: '测试数据2',
      children: (
        <div style={{ margin: '12px' }}>
          34
          <Input placeholder="请输入参数" />
        </div>
      ),
    },
    {
      key: '3',
      title: '测试数据3',
      disabled: true,
      children: (
        <div style={{ margin: '12px' }}>
          56
          <Input placeholder="请输入参数" />
        </div>
      ),
    },
    {
      key: '4',
      title: '测试数据4',
      destroyOnClose: true,
      children: (
        <div style={{ margin: '12px' }}>
          78
          <Input placeholder="请输入参数" />
        </div>
      ),
    },
  ];

  return (
    <AppPage>
      <AppHeader>多页签选择器</AppHeader>
      <AppContent style={{ backgroundColor: '#f4f5fb' }}>
        <CcsTabs list={list} />

        <div className={styles.bg} style={{ margin: '12px' }}>
          <div className={styles.content}>
            <Card title="使用说明(CcsTabs)">多页签选择器</Card>
          </div>
          <div className={styles.not}>配置json请参考 AntMobile Tabs</div>
        </div>
      </AppContent>
    </AppPage>
  );
};

export default TopTabs;
