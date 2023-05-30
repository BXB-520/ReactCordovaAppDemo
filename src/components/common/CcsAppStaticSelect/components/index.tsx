import React, { FC, useEffect, useRef, useState } from 'react';
import useRequest from '@ahooksjs/use-request';
import publicStyle from '../index.less';
import { CheckOutline, DownFill, SearchOutline } from 'antd-mobile-icons';
import { DatePicker, Input, Picker, Popup, SpinLoading } from 'antd-mobile';
import { ItemPicker } from '..';
import moment from 'moment';

interface StaticSelectProps {
  item: ItemPicker;
  propCode: string | undefined;
  pickerList: ItemPicker[];
  indexs: number;
  paramsValue: any;
  setParamsValue: any;
  onHandelChange: Function;
  precision:
    | 'year'
    | 'month'
    | 'day'
    | 'hour'
    | 'minute'
    | 'second'
    | undefined;
  /** 是否默认添加全部选项 */
  isoptionlist: boolean | undefined;
  /** 选择后的参数 */
  endparams: any;
}

interface ParamType {
  pageNo: number;
  pageSize: number;
  query: { propCode: string; state: number };
}

const getStaticValue = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([
        { label: '周一', value: 'Mon' },
        { label: '周二', value: 'Tues' },
        { label: '周三', value: 'Wed' },
        { label: '周四', value: 'Thur' },
        { label: '周五', value: 'Fri' },
      ]);
    }, 1500);
  });
};

/**
 * app静态值选择组件，适用单个查询条件，可赋初始值。 传入propCode
 * 数据缓存：5分钟内每个类型的值只请求一次
 * @param StaticSelectProps
 * @returns
 */
const StaticSelect: FC<StaticSelectProps> = ({
  item,
  propCode,
  pickerList,
  indexs,
  paramsValue,
  setParamsValue,
  onHandelChange,
  isoptionlist = true,
  endparams,
  precision = 'day',
  ...restProps
}) => {
  const [visible, setVisible] = useState(false);
  const [columns, setColumns] = useState<any>([]);
  const [value, setValue] = useState<any>([]);

  useEffect(() => {
    if (visible && item.type == 3) {
      setValue([]);
    }
  }, [visible]);

  // 请求数据，并缓存静态值
  const { loading, data }: any = useRequest<ParamType>(getStaticValue, {
    defaultParams: [{ pageNo: 1, pageSize: 20, query: { propCode, state: 1 } }],
    manual: !propCode,
    cacheKey: `STATIC_${propCode}`, //缓存静态值key
    staleTime: 300000, // 在这个时间内，不会重新发起请求
    cacheTime: 300000,
    formatResult: (redata: any) => {
      console.log(`静态值请求-STATIC_${propCode}`);
      let optionlist: any[];

      if (isoptionlist && redata && item.type == 1) {
        optionlist = [{ label: '全部', value: '' }, ...redata];
        setColumns(optionlist);
      } else {
        optionlist = redata;
        setColumns(optionlist);
      }

      return optionlist;
    },
  });

  /** 参数key决定 使用默认list还是请求静态值 */
  const showData = () => {
    if (!propCode) return item.list;
    if (columns.length) return columns;
    if (data) return data;
    return [];
  };

  return (
    <div
      key={item.title}
      className={publicStyle.picklist}
      onClick={async () => {
        setVisible(true);
      }}
    >
      {item.type == 1 ? (
        <Picker
          title={item.title}
          loading={loading}
          columns={[showData()]}
          visible={visible}
          onConfirm={(values: any) => {
            setParamsValue((setitem: any) => {
              setitem[indexs] = showData().find((items: any) => {
                return items.value == values;
              })?.label;
              return { ...setitem };
            });

            onHandelChange(indexs, values[0]);
          }}
          onClose={() => setVisible(false)}
        />
      ) : item.type == 2 ? (
        <DatePicker
          title={item.title}
          visible={visible}
          onClose={() => setVisible(false)}
          precision={precision}
          min={
            item.label == 'endTime'
              ? endparams?.startTime
                ? new Date(endparams?.startTime)
                : undefined
              : undefined
          }
          max={
            item.label == 'startTime'
              ? endparams?.endTime
                ? new Date(endparams?.endTime)
                : undefined
              : undefined
          }
          onConfirm={(val) => {
            let formatType = '';
            let formatShowType = '';
            let ss = '';
            switch (precision) {
              case 'year':
                formatType = 'YYYY';
                formatShowType = 'YYYY';
                break;
              case 'month':
                formatType = 'YYYY-MM';
                formatShowType = 'YYYY-MM';
                break;
              case 'day':
                formatType = 'YYYY-MM-DD';
                formatShowType = 'YYYY-MM-DD';
                break;
              case 'hour':
                formatType = 'YYYY-MM-DD HH';
                formatShowType = 'YYYY-MM-DD HH';
                ss = ':00:00';
                break;
              case 'minute':
                formatType = 'YYYY-MM-DD HH:mm';
                formatShowType = 'YYYY-MM-DD HH:mm';
                ss = ':00';
                break;
              case 'second':
                formatType = 'YYYY-MM-DD HH:mm:ss';
                formatShowType = 'YYYY-MM-DD HH:mm:ss';
                break;
              default:
                break;
            }

            setParamsValue((setitem: any) => {
              setitem[indexs] = moment(val).format(formatShowType);
              return { ...setitem };
            });

            onHandelChange(indexs, moment(val).format(formatType) + ss);
          }}
        />
      ) : item.type == 3 ? (
        <>
          <Popup
            visible={visible}
            onMaskClick={() => setVisible(false)}
            bodyStyle={{
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              minHeight: '30vh',
            }}
          >
            <div className={publicStyle.popuphead}>
              <span onClick={() => setVisible(false)}>取消</span>
              <div>{item.title}</div>
              <span
                onClick={() => {
                  const CheckListlabel = value.map((CheckListitem: string) => {
                    return showData().find((items: any) => {
                      return items.value == CheckListitem;
                    })?.label;
                  });

                  setParamsValue((setitem: any) => {
                    setitem[indexs] = CheckListlabel.toString();
                    return { ...setitem };
                  });

                  onHandelChange(indexs, value);

                  setVisible(false);
                }}
              >
                确定
              </span>
            </div>
            <div className={publicStyle.content}>
              {showData().length == 0 ? (
                <SpinLoading style={{ margin: '20% 46%' }} />
              ) : (
                <div className={publicStyle.checklistbg}>
                  {showData().map(
                    (CheckListline: { label: string; value: string }) => {
                      return (
                        <div
                          key={CheckListline.value}
                          className={publicStyle.line}
                          onClick={() => {
                            setValue((setitem: any) => {
                              if (value.indexOf(CheckListline.value) == -1) {
                                setitem.push(CheckListline.value);
                              } else {
                                setitem = setitem.filter((items: any) => {
                                  return items !== CheckListline.value;
                                });
                              }

                              return JSON.parse(JSON.stringify(setitem));
                            });
                          }}
                        >
                          <div>{CheckListline.label}</div>
                          <div>
                            {value.indexOf(CheckListline.value) == -1 ? null : (
                              <CheckOutline />
                            )}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </div>
          </Popup>
        </>
      ) : item.type == 4 ? (
        <>
          <Popup
            visible={visible}
            onMaskClick={() => setVisible(false)}
            bodyStyle={{
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              minHeight: '20vh',
            }}
          >
            <div className={publicStyle.popuphead}>
              <span onClick={() => setVisible(false)}>取消</span>
              <div>{item.title}</div>
              <span
                onClick={() => {
                  onHandelChange(
                    indexs,
                    paramsValue[indexs] !== item.title
                      ? paramsValue[indexs]
                      : '',
                  );
                  setVisible(false);
                }}
              >
                确定
              </span>
            </div>
            <div className={publicStyle.content}>
              <div className={publicStyle.inputbg}>
                <span> {item.title}:</span>
                <div className={publicStyle.inputstyle}>
                  <Input
                    clearable
                    placeholder={`请输入${item.title}`}
                    value={
                      paramsValue[indexs] !== item.title
                        ? paramsValue[indexs]
                        : ''
                    }
                    onChange={(e) => {
                      setParamsValue((setitem: any) => {
                        setitem[indexs] = e || item.title;
                        return { ...setitem };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </Popup>
        </>
      ) : null}
      <>
        <div className={publicStyle.title}>{paramsValue[indexs]}</div>
        <div
          className={publicStyle.downfill}
          style={{
            rotate: visible ? `180deg` : `0deg`,
          }}
        >
          {item.type !== 4 ? <DownFill /> : <SearchOutline />}
        </div>
      </>
    </div>
  );
};

export default StaticSelect;
