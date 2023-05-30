import { history, Redirect, useDispatch } from 'umi';
import AppGesture from '@/components/system/AppGesture';
import { useEffect, useState } from 'react';
import VConsole from 'vconsole';
import { FloatingBubble } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import StartPage from '@/assets/imgs/login/bg.png';
import { getLocalStorage, isCordova, setSessionStorage } from '@/utils/common';
import { cordovaCheckPermission } from '@/utils/cordova';

const App = (props: any) => {
  const { location } = props;

  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState<boolean>(false);

  const TICKET: any = getLocalStorage('APP_TICKET');

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') new VConsole();
    if (!isCordova()) handelAppLoad();

    // 待设备初始化完成，才能使用cordova插件
    document.addEventListener(
      'deviceready',
      () => {
        cordovaCheckPermission();
        handelAppLoad();
      },
      false,
    );
  }, []);

  const handelAppLoad = async () => {
    /** 设置系统默认值 0开发 1调试 */
    setSessionStorage('sysMode', '0');

    if (TICKET) {
      setRefresh(false);
      //调用刷新接口
      await dispatch({
        type: 'login/refresh',
        payload: {},
      });
      setRefresh(true);
    } else {
      setRefresh(true);
    }
  };

  // if (true && location.pathname === '/tabs') {
  //   return <Redirect to="/webView" />;
  // }

  if (!TICKET && location.pathname === '/tabs') {
    return <Redirect to="/login" />;
  }

  if (TICKET && location.pathname === '/login') {
    return <Redirect to="/tabs" />;
  }

  return (
    <>
      {refresh ? (
        <>
          <AppGesture gestureprops={{ ...props }} />

          {/* <FloatingBubble
            axis="xy"
            magnetic="x"
            style={{
              '--initial-position-bottom': '120px',
              '--initial-position-left': '8px',
              '--edge-distance': '8px 8px 62px 8px',
              '--background': 'skyblue',
              '--size': '52px',
              position: 'fixed',
              zIndex: 9999,
            }}
            onClick={() => {
              history.goBack();
            }}
          >
            <LeftOutline fontSize={18} />
            返回
          </FloatingBubble> */}
        </>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url(${StartPage})`,
              width: '100%',
              height: '100%',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </>
      )}
    </>
  );
};

export default App;
