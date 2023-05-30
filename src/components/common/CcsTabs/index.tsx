import { FC } from 'react';
import styles from './index.less';
import { Tabs } from 'antd-mobile';

export interface CcsTabsType {
  /** 配置列表 */
  list: { key: string; title: string; children: React.ReactNode }[];
}

const CcsTabs: FC<CcsTabsType> = ({ list }) => {
  return (
    <div className={styles.tabsbg}>
      <Tabs>
        {list.map((items: any) => {
          return (
            <Tabs.Tab title={items.title} key={items.key} {...items}>
              {items.children}
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default CcsTabs;
