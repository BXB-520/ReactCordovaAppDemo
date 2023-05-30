import React, { useEffect, useRef, useState } from 'react';
import { DotLoading, Popover } from 'antd-mobile';
import publicStyle from './index.less';
import { RedoOutline, UnorderedListOutline } from 'antd-mobile-icons';
import StaticSelect from './components';

export interface ItemPicker {
  /** 标题 */
  title: string;
  /** 对应key值 */
  label: string;

  /** 类型 1单选框 2时间选择(需要开始时间和结束时间请用startTime和endTime 会控制选择) 3多选框 4输入框*/
  type: 1 | 2 | 3 | 4;
  /** 时间精度 默认day */
  precision?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
  /** 静态值key */
  propCode?: string;
  list?: { label: string; value: string }[] | any;
  /** 是否默认添加全部选项 默认true,静态值才生效 */
  isoptionlist?: boolean;
  /** 默认参数 静态值不能用 */
  defvalue?: string;
  /** 是否返回label而不是value */
  backLabel?: boolean;
}

export interface ItemPickeritem {
  label?: string;
  value?: string;
}

/** app条件选择器 用于顶部选择 */
const CcsAppStaticSelect = (props: {
  /** list参数 */
  pickerList: ItemPicker[];
  /** 回调携带参数 */
  onHandelCallBack: Function;
  /** 外部展示多少条数据 */
  size?: 1 | 2 | 3;
}) => {
  const { pickerList, onHandelCallBack, size = 2 } = props;

  const [paramsValue, setParamsValue] = useState<any>({});

  const [firlist, setFirList] = useState<ItemPicker[]>([]);
  const [endlist, setEndList] = useState<ItemPicker[]>([]);
  const [alllist, setAllList] = useState<ItemPicker[]>([]);

  const params = useRef<any>({});
  const defparams = useRef<any>({});
  const endparams = useRef<any>({});

  const rest = () => {
    if (alllist.length > 0) {
      params.current = alllist.map((item: ItemPicker) => {
        return item.label;
      });

      setParamsValue(
        alllist.map((item: ItemPicker, index: number) => {
          if (item.defvalue) {
            const newJson: any = {};
            newJson[`${params.current[index]}`] = item.defvalue;
            defparams.current = { ...newJson };

            return item.list.find((finds: { label: string; value: string }) => {
              return finds.value == item.defvalue;
            }).label;
          }

          return item.title;
        }),
      );
    }
  };

  useEffect(() => {
    rest();
  }, [alllist]);

  useEffect(() => {
    /** 获取前面3个数据 */
    setFirList(pickerList.slice(0, size));
    /** 获取后面N个数据 */
    setEndList(pickerList.slice(size, pickerList.length));
    /** 全部数据 */
    setAllList(pickerList);
  }, []);

  /** 最终参数处理 */
  const onHandelChange = (number: number, data?: string) => {
    const newJson: any = {};

    newJson[`${params.current[number]}`] = data;

    endparams.current = {
      ...defparams.current,
      ...endparams.current,
      ...newJson,
    };
    onHandelCallBack(endparams.current);
  };

  return (
    <div className={publicStyle.pickbg}>
      {firlist.map((item: ItemPicker, index: number) => {
        return (
          <StaticSelect
            key={item.title}
            item={item}
            indexs={index}
            pickerList={pickerList}
            paramsValue={paramsValue}
            setParamsValue={setParamsValue}
            onHandelChange={onHandelChange}
            propCode={item?.propCode}
            isoptionlist={item?.isoptionlist}
            endparams={endparams.current}
            precision={item?.precision}
          />
        );
      })}

      {alllist.length == 0 ? <DotLoading color="primary" /> : null}

      {alllist.length > 0 ? (
        <Popover
          content={
            <div className={publicStyle.popover}>
              {endlist.map((item: ItemPicker, index: number) => {
                return (
                  <StaticSelect
                    key={item.title}
                    item={item}
                    indexs={index + size}
                    pickerList={pickerList}
                    paramsValue={paramsValue}
                    setParamsValue={setParamsValue}
                    onHandelChange={onHandelChange}
                    propCode={item?.propCode}
                    isoptionlist={item?.isoptionlist}
                    endparams={endparams.current}
                    precision={item?.precision}
                  />
                );
              })}

              <div
                className={publicStyle.picklist}
                onClick={async () => {
                  rest();
                  endparams.current = defparams.current;
                  onHandelCallBack(endparams.current);
                }}
              >
                <div className={publicStyle.title}>重 置 </div>
                <div className={publicStyle.downfill}>
                  <RedoOutline />
                </div>
              </div>
            </div>
          }
          trigger="click"
          placement="bottom"
        >
          <div className={publicStyle.outline}>
            <UnorderedListOutline color="#5481f8" />
          </div>
        </Popover>
      ) : null}
    </div>
  );
};

export default CcsAppStaticSelect;
