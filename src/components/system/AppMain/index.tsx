/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {
  ReactNode,
  Reducer,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Switch, history } from 'umi';
import styles from './index.less';
import Gesture from 'rc-gesture';
import { Toast } from 'antd-mobile';
import { ANIMATION_TIME } from '@/constants/system';
import { requestMobileContext } from '@/utils/common';

interface HistoryReducerType {
  type: 'update' | 'reduce' | '';
  historyAction: 'POP' | 'PUSH' | 'REPLACE';
  historyList: any[];
}

declare const window: any;

const zIndex = 99;
/** T大写代表ios 返回/前进 被设置了延迟 */
let backType: number = 0;
let panyType: number = 0;
let panxStart: number = 0;
let timeouter: string | number | NodeJS.Timeout | undefined;
let timeEndtype: number = 0;

const AppMain = ({ mainprops }: any) => {
  const { location, ref } = mainprops;
  const { pathname } = location;

  /** 路由历史 */
  const [historyList, dispatch] = useReducer<Reducer<any[], any>>(
    historyReducer,
    [],
  );

  function historyReducer(state: any[], action: HistoryReducerType) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { type, historyAction, historyList } = action;

    /** 登录页清除全部 */
    if (type == '') {
      return [historyList[historyList.length - 1]];
    }

    // const { id } = historyList.at(-1);
    const { id } = historyList[historyList.length - 1];

    switch (type) {
      case 'update':
        return historyList || [];
      case 'reduce':
        if (historyAction === 'PUSH') {
          return historyList || [];
        }
        if (historyAction === 'POP') {
          return [...historyList.filter((s) => s.id <= id)];
        }
        if (historyAction === 'REPLACE') {
          return [...state.filter((s) => s.id !== id - 10)];
        }
        return state;
      default:
        return [];
    }
  }

  /** 动画类型，打开/后退 */
  const [type, settype] = useState<any>('');
  /** 页面回调函数 */
  const pageCallBackRef = useRef<[{ pageurl: string; fn: Function }]>([
    {
      pageurl: '',
      fn: () => {},
    },
  ]);
  /** 子页面转给父页面参数 */
  const callBackDataRef = useRef<any>(null);

  /** 动画类型，打开/后退 */
  const [backtype, setBackType] = useState<any>('');

  const [movex, setmovex] = useState<any>('0px');

  useImperativeHandle(ref, () => ({
    getHistorys: () => {
      return historyList;
    },
  }));

  /** 禁止屏幕全部点击事件 */
  const disableScreenTapping = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  /** 路由切换时，保留原有页面数据 */
  const historyChange = async (action: any) => {
    document.addEventListener('click', disableScreenTapping, true);

    backType = 0;
    // console.log(action.history?.action);

    switch (action.history?.action) {
      case 'REPLACE':
      case 'PUSH':
        {
          if (historyList.length) {
            settype('open');
            setBackType('');
          }
          const newhistoryList = [
            ...historyList,
            {
              // id: (historyList.at(-1)?.id ?? zIndex + historyList.length) + 1,
              id:
                (historyList[historyList.length - 1]?.id ??
                  zIndex + historyList.length) + 10,
              location: action.location,
              children: action.children,
            },
          ];

          dispatch({
            type: 'update',
            historyAction: 'PUSH',
            historyList: newhistoryList,
          });

          if (action.history?.action == 'REPLACE') {
            /** 动画执行完后销毁中间页 */
            setTimeout(() => {
              dispatch({
                type: 'reduce',
                historyAction: 'REPLACE',
                historyList: newhistoryList,
              });
            }, ANIMATION_TIME);
          }

          timeOutRemove();
        }

        break;
      case 'POP':
        {
          if (historyList.length > 1) {
            settype('end');

            setTimeout(() => {
              settype('');
              setBackType('');
              setmovex('0px');

              dispatch({
                type: 'reduce',
                historyAction: 'POP',
                historyList: historyList.slice(0, -1),
              });

              isPageBack(action.location.pathname);

              timeOutRemove(80);
            }, 280);
          } else {
            /** 正常加载初始化 */

            settype('');
            setBackType('');
            setmovex('0px');

            const newhistoryList = [
              {
                id: historyList.length > 0 ? historyList[0].id - 2 : zIndex + 1,
                location: action.location,
                children: action.children,
              },
            ];

            dispatch({
              type: 'update',
              historyList: newhistoryList,
            });
            timeOutRemove();
          }
        }
        break;

      default:
        timeOutRemove();
        break;
    }
  };

  /** 定时移除页面禁止点击和滑动，防止用户操作过快 */
  const timeOutRemove = (time?: number) => {
    setTimeout(() => {
      document.removeEventListener('click', disableScreenTapping, true);

      backType = 1;
    }, time ?? 280);
  };

  /** 监听路由变化 */
  useEffect(() => {
    historyChange(mainprops);
  }, [pathname]);

  /** 页面回调的处理 */
  const isPageBack = (pathname: string) => {
    /** 页面需要回调参数 执行，并清除最后一个注册事件 */
    if (callBackDataRef.current) {
      // pageCallBackRef.current.at(-1)!.fn(callBackDataRef.current);
      pageCallBackRef.current[pageCallBackRef.current.length - 1].fn(
        callBackDataRef.current,
      );
      pageCallBackRef.current.pop();
      callBackDataRef.current = null;
    } else if (
      pathname ===
      pageCallBackRef.current[pageCallBackRef.current.length - 1].pageurl
    ) {
      /** 页面正常返回需要销毁注册的返回事件 */
      //  if (pathname === pageCallBackRef.current.at(-1)!.pageurl) {
      pageCallBackRef.current.pop();
      callBackDataRef.current = null;
    }
  };

  /** 指定历史回退 history back by url */
  const onHistoryBack = (url: string) => {
    const urlIndex = historyList.findIndex((h: any) => h.path === url);

    if (urlIndex === -1) {
      Toast.show({
        content: '当前路由栈不存在此路由、请从头再来。',
        position: 'bottom',
      });
      return;
    }
    history.go(urlIndex - historyList.length + 1);
  };

  /** 回到上一页并携带参数 */
  const onHandleCallBack = (backData: any) => {
    callBackDataRef.current = backData;
    history.goBack();
  };

  /** 清除路由 */
  const handelDelHistory = () => {
    setTimeout(() => {
      dispatch({
        type: '',
        historyAction: 'REPLACE',
        historyList: [historyList[historyList.length - 1]],
      });
    }, ANIMATION_TIME);
  };

  /** 拖拽移动 */
  const handlePan = useCallback((type: string, x: number, y: number) => {
    if (window.DisabledSwipeBack) return;

    if (type === 'START') {
      panxStart = x;
      document.addEventListener('click', disableScreenTapping, true);
      backType = 0;
    } else if (type === 'MOVE') {
      if (x > 0 && x < window.innerWidth) {
        if (x < 12) {
          setmovex('0px');
        } else {
          setmovex(x - panxStart + 'px');
        }
      }
    } else if (type == 'END') {
      timeOutRemove(0);
      setBackType('');
      if (x - panxStart > 55) {
        setBackType('Back');
        history.goBack();
      } else {
        setBackType('Next');
        setTimeout(() => {
          settype('');
          setBackType('');
          setmovex('0px');
        }, 280);
      }
    }
  }, []);

  /** 方式决定动画 */
  const transformType = () => {
    if (backtype == '') {
      if (type == 'open') {
        return styles.open;
      }
      if (type == 'end') {
        return styles.end;
      }
      return null;
    }
    if (backtype == 'Back') {
      return styles.back;
    }
    if (backtype == 'Next') {
      return styles.next;
    }
    return null;
  };

  /** 页面层级决定显示效果，超过3页隐藏 防止页面卡顿 */
  const childtransform = (id: number) => {
    if (id == historyList[historyList.length - 1].id) {
      return styles.now;
    }
    if (id == historyList[historyList.length - 2].id) {
      return styles.old;
    }
    return styles.hidden;
  };

  return (
    <>
      {historyList.map((item: any, index: number) => {
        return requestMobileContext() == 'ios' ? (
          <Gesture
            key={item.id}
            onPanEnd={(e: any) => {
              if (panyType && timeEndtype) {
                timeEndtype = 0;
                clearTimeout(timeouter);
                handlePan('END', e.moveStatus.x, e.moveStatus.y);
              }
            }}
            onPanMove={(e: any) => {
              if (panyType && timeEndtype) {
                clearTimeout(timeouter);
                handlePan('MOVE', e.moveStatus.x, e.moveStatus.y);
                timeouter = setTimeout(() => {
                  timeEndtype = 0;
                  clearTimeout(timeouter);
                  handlePan('END', e.moveStatus.x, e.moveStatus.y);
                }, 400);
              }
            }}
            onPanStart={(e: any) => {
              if (
                e.srcEvent.changedTouches[0].pageX < 30 &&
                backType &&
                historyList.length > 1
              ) {
                panyType = 1;
                timeEndtype = 1;
                handlePan('START', e.moveStatus.x, e.moveStatus.y);
              } else {
                panyType = 0;
              }
            }}
            direction="all"
          >
            <div
              key={item.id}
              style={{
                position: 'absolute',
                inset: '0px',
                top: '0px',
                right: '0px',
                left: '0px',
                bottom: '0px',
                overflow: 'hidden',
                zIndex: item.id,
              }}
              className={transformType()}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '0px',
                  top: '0px',
                  right: '0px',
                  left: '0px',
                  bottom: '0px',
                  overflow: 'hidden',
                  transform:
                    item.id == historyList[historyList.length - 1].id
                      ? `translateX(${movex})`
                      : item.id == historyList[historyList.length - 2].id
                      ? `translateX(calc(-30% + ( 30% / ( ${
                          window.innerWidth
                        } / ${parseInt(movex, 10)} ))))`
                      : `translateX(0px)`,
                }}
                className={`${childtransform(item.id)} ${styles.borderleft}`}
              >
                <RouteInfoContext.Provider
                  key={item.id}
                  value={{
                    routeInfo: { ...item },
                    onHistoryBack,
                    onHandleCallBack,
                    pageCallBackRef,
                    dispatch,
                    handelDelHistory,
                  }}
                >
                  <Switch location={item.location}>{item.children}</Switch>
                </RouteInfoContext.Provider>
              </div>
            </div>
          </Gesture>
        ) : (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              inset: '0px',
              top: '0px',
              right: '0px',
              left: '0px',
              bottom: '0px',
              overflow: 'hidden',
              zIndex: item.id,
            }}
            className={transformType()}
          >
            <div
              style={{
                position: 'absolute',
                inset: '0px',
                top: '0px',
                right: '0px',
                left: '0px',
                bottom: '0px',
                overflow: 'hidden',
                transform:
                  item.id == historyList[historyList.length - 1].id
                    ? `translate3d(${movex},0px,0px)`
                    : item.id == historyList[historyList.length - 2].id
                    ? `translate3d(calc(-30% + ( 30% / ( ${
                        window.innerWidth
                      } / ${parseInt(movex, 10)} ))),0px,0px)`
                    : `translate3d(0px,0px,0px)`,
              }}
              className={`${childtransform(item.id)} ${styles.borderleft}`}
            >
              <RouteInfoContext.Provider
                key={item.id}
                value={{
                  routeInfo: { ...item },
                  onHistoryBack,
                  onHandleCallBack,
                  pageCallBackRef,
                  dispatch,
                  handelDelHistory,
                }}
              >
                <Switch location={item.location}>{item.children}</Switch>
              </RouteInfoContext.Provider>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AppMain;

export const RouteInfoContext = React.createContext<RouteInfoContextType>({
  routeInfo: undefined,
  onHistoryBack: () => undefined,
  onHandleCallBack: () => undefined,
  pageCallBackRef: { current: [{}] },
  dispatch: () => undefined,
  handelDelHistory: () => undefined,
});

export interface RouteInfo {
  id: number;
  location: any;
  children: ReactNode;
}

export interface RouteInfoContextType {
  routeInfo?: RouteInfo;
  /** 指定页面回退 不能携带参数 */
  onHistoryBack: (url: string) => void;
  /** 页面回调并携带参数 */
  onHandleCallBack: (backData: any) => void;
  /** 接受下一页回调上来的参数 */
  pageCallBackRef: {
    current: [{}];
  };
  dispatch: React.Dispatch<HistoryReducerType>;
  /** 清除路由 */
  handelDelHistory: () => void;
}
