import React, { ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { AppPage } from '../AppPages';

export interface TabsDataType {
  title: string;
  key: string;
  badge?: number | string;
  icon: string;
  selectedIcon: string;
  dot?: boolean;
  component: ReactNode;
}

/** 获取key */
export function getTabCurrentByKey(current: any, tabKey: string) {
  return current?.querySelector(`div[tabkey=${tabKey}]`);
}

/** 风格选择 */
const stylesList = [styles.theme1, styles.theme2];

/** 获取页面组件 */
const AppTab: React.FC<TabsDataType> = React.memo((tab) => {
  const View: any = tab.component;
  return <View />;
});
const AppTabs: React.FC<{ tabs: TabsDataType[] }> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);
  const [currentTabs, setCurrentTabs] = useState([tabs[0]] || []);

  const ref = useRef<any>(null);

  // tab change
  const onTabChange = (key: string) => {
    const hasTab = currentTabs.find((e) => e.key === key);

    if (!hasTab) {
      const tab: TabsDataType | undefined = tabs.find((e) => e.key === key);
      if (tab) setCurrentTabs([...currentTabs, tab]);
    }
    ref.current = { cur: key, last: selectedTab };
    setSelectedTab(key);
  };

  /** 页面加载不卸载 */
  const renderTab = (tab: TabsDataType) => {
    return (
      <div
        {...{ tabkey: tab.key }}
        className={styles.apptabs}
        style={{ display: tab.key === selectedTab ? '' : 'none' }}
        key={tab.key}
      >
        <AppTab {...tab} />
      </div>
    );
  };

  return (
    <AppPage>
      <div className={styles.tabsinner}>
        {currentTabs.map((tab) => renderTab(tab))}
      </div>
      <div className={stylesList[0]}>
        <div className={styles.tabscontent} style={{ height: '56px' }}>
          {tabs.map((tab) => {
            return (
              <div
                key={tab.key}
                className={styles.tabsalone}
                onClick={() => {
                  if (selectedTab !== tab.key) onTabChange(tab.key);
                }}
              >
                {tab.badge ? (
                  <div className={styles.tabsbadge}>{tab.badge}</div>
                ) : null}
                <img
                  src={selectedTab === tab.key ? tab.selectedIcon : tab.icon}
                  alt=""
                />
                <div
                  className={`${styles.tabstitle} ${
                    selectedTab === tab.key
                      ? styles.selectcolor
                      : styles.unselectcolor
                  }`}
                >
                  {tab.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppPage>
  );
};

export default AppTabs;
