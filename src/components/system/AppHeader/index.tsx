import { NavBar, NavBarProps } from 'antd-mobile';
import { FC, ReactChild } from 'react';
import { history } from 'umi';
import styles from './index.less';

interface AppHeaderPropsType extends NavBarProps {
  canBack?: boolean; // 返回按钮，默认true
  children: any;
  leftContent?: ReactChild;
  rightContent?: ReactChild;
  navBarStyle?: any;
}

/** 头部导航组件,可以在这里固定rightContent或是leftContent */
const AppHeader: FC<AppHeaderPropsType> = ({
  children,
  leftContent,
  rightContent,
  onBack,
  canBack = true,
  navBarStyle,
}) => {
  const handleOnLeftClick = () => {
    onBack ? onBack() : history.goBack();
  };

  /** 需要做样式调整可统一添加 */
  const NavBarClass = {
    ...navBarStyle,
    // backgroundColor: 'skyBlue',
    // paddingTop: requestMobileContext() === 'ios'&&process.env.NODE_ENV !== 'development' ? IOSTOP : '0px',
  };

  return (
    <div className={styles.topsafearea} style={NavBarClass}>
      <NavBar
        left={leftContent}
        right={rightContent}
        onBack={handleOnLeftClick}
        backArrow={canBack}
      >
        {children}
      </NavBar>
    </div>
  );
};

export default AppHeader;
