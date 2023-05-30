import { Button, Form, Input } from 'antd-mobile';
import {
  EyeInvisibleOutline,
  EyeOutline,
  LockOutline,
  TeamOutline,
} from 'antd-mobile-icons';
import { history, useDispatch } from 'umi';
import styles from './index.less';
import BGIMG from '@/assets/imgs/login/bg.png';
import { useContext, useEffect, useState } from 'react';
import { AppPage } from '@/components/system/AppPages';
import {
  RouteInfoContext,
  RouteInfoContextType,
} from '@/components/system/AppMain';

const Login = () => {
  const usedispatch = useDispatch();
  const { handelDelHistory }: RouteInfoContextType =
    useContext(RouteInfoContext);

  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    /** 这个东西非常重要，必须执行 */
    handelDelHistory();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    const { success }: any = await usedispatch({
      type: 'login/login',
      payload: {
        password: '3453453',
        scope: 'PHONE',
      },
    });
    setLoading(false);
    if (success) {
      history.replace('/tabs');
    }
  };
  return (
    <AppPage>
      <div className={styles.bg}>
        <img className={styles.logo} src={BGIMG} alt="" />
        <div className={styles.title}>Login</div>
        <div className={styles.content}>
          <Form layout="horizontal">
            <Form.Item label={<TeamOutline />} name="usernames">
              <Input placeholder="UserName" clearable />
            </Form.Item>
            <Form.Item
              label={<LockOutline />}
              name="passwords"
              extra={
                <div className={styles.eye}>
                  {!visible ? (
                    <EyeInvisibleOutline onClick={() => setVisible(true)} />
                  ) : (
                    <EyeOutline onClick={() => setVisible(false)} />
                  )}
                </div>
              }
            >
              <Input
                placeholder="Password"
                clearable
                type={visible ? 'text' : 'password'}
              />
            </Form.Item>
          </Form>
        </div>
        <div className={styles.forget}>Forget PassWord?</div>
        <div className={styles.loginin}>
          <Button
            loading={loading}
            style={{
              backgroundColor: '#0065ff',
              color: '#ffffff',
              width: '100%',
              height: '50px',
              borderRadius: '12px',
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
        <div className={styles.or}>—————————— OR ——————————</div>
        <div className={styles.change}>
          <Button
            style={{
              backgroundColor: '#f1f5f6',
              color: '#69778c',
              width: '100%',
              height: '50px',
              borderRadius: '12px',
            }}
          >
            Login With Google
          </Button>
        </div>
      </div>
    </AppPage>
  );
};

export default Login;
