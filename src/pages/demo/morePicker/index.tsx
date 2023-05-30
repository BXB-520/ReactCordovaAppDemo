import { useEffect, useState } from 'react';
import { history } from 'umi';
import { AppContent, AppPage } from '@/components/system/AppPages';
import AppHeader from '@/components/system/AppHeader';
import CcsAppStaticSelect, {
  itemPicker,
} from '@/components/common/CcsAppStaticSelect';
import styles from './index.less';
import { Card } from 'antd-mobile';
import { DelayUseEffect } from '@/hooks';

const pickerDataList: itemPicker[] = [
  {
    title: '基础单选',
    label: 'baseValue',
    type: 1,
    defvalue: 'Mon',
    list: [
      { label: '全部', value: '' },
      { label: '周一', value: 'Mon' },
      { label: '周二', value: 'Tues' },
      { label: '周三', value: 'Wed' },
      { label: '周四', value: 'Thur' },
      { label: '周五', value: 'Fri' },
    ],
  },
  {
    title: '静态单选',
    label: 'propCode',
    type: 1,
    propCode: 'aaa',
  },
  {
    title: '输入数据',
    label: 'inputCode',
    type: 4,
  },
  {
    title: '输入信号',
    label: 'inputCode1',
    type: 4,
  },
  {
    title: '时间选择',
    label: 'baseTime',
    type: 2,
    precision: 'second',
  },
  {
    title: '开始时间',
    label: 'startTime',
    type: 2,
    precision: 'minute',
  },
  {
    title: '结束时间',
    label: 'endTime',
    type: 2,
    precision: 'minute',
  },
  {
    title: '基础多选',
    label: 'baseMore',
    type: 3,
    list: [
      { label: '6', value: '6' },
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '10', value: '10' },
    ],
  },
  {
    title: '静态多选',
    label: 'propCodeMore',
    type: 3,
    propCode: 'ghuhjkhj',
  },
];

const MultiConditionSelector = (props: any) => {
  const [value, setValue] = useState<{}>({});

  useEffect(() => {}, []);

  DelayUseEffect(() => {});

  const onHandelCallBack = (backData: any) => {
    console.log(backData);
    setValue(backData);
  };

  return (
    <AppPage>
      <AppHeader>多条件选择器</AppHeader>
      <AppContent style={{ backgroundColor: '#f4f5fb' }}>
        <CcsAppStaticSelect
          pickerList={pickerDataList}
          onHandelCallBack={onHandelCallBack}
        />

        <div className={styles.bg}>
          <div className={styles.content}>
            <Card title="结果展示">
              <div style={{ overflow: 'scroll' }}>{`${JSON.stringify(
                value,
              )}`}</div>
            </Card>
          </div>
          <div className={styles.content}>
            <Card title="使用说明(CcsAppStaticSelect)">
              title:标题
              <br />
              label:关键字
              <br />
              type:选择框类型 1单选框
              2时间选择(需要开始时间和结束时间请用startTime和endTime 会控制选择)
              3多选框
              <br />
              propCode:静态值编码
              <br />
              list:默认选择内容{' '}
              {JSON.stringify([{ label: '周一', value: 'Mon' }])}
              <br />
            </Card>
          </div>
          <div className={styles.not}>
            配置json请参考 pickerDataList : itemPicker[]
          </div>
        </div>
      </AppContent>
    </AppPage>
  );
};

export default MultiConditionSelector;
