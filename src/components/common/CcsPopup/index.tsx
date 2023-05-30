import { useEffect, useState, FC } from 'react';
import publicStyle from './index.less';

interface CcsPopupType {
  /** 开关状态控制 */
  visable: boolean;
  /** 展开宽度 */
  contentWidth: string;
  /** 遮罩事件 */
  onMaskClick: Function;
  /** 展开方向 */
  position: 'top' | 'bottom' | 'right' | 'left';
  /** 内容 */
  children: React.ReactNode;
}

const CcsPopup: FC<CcsPopupType> = ({
  visable,
  contentWidth,
  onMaskClick,
  position,
  children,
}) => {
  const [popupVisable, setPopupVisable] = useState<boolean>(false);

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(
      () => {
        setPopupVisable(visable);
      },
      visable ? 20 : 0,
    );
    setTimeout(
      () => {
        setShow(visable);
      },
      visable ? 0 : 300,
    );
  }, [visable]);

  const openIsLeftOrRight = () => {
    if (position == 'right') {
      return `calc(100vw - ${contentWidth})`;
    } else {
      return '0vw';
    }
  };

  const cloceIsLeftOrRight = () => {
    if (position == 'right') {
      return '100vw';
    } else {
      return '-100vw';
    }
  };

  const openIsTopOrBottom = () => {
    if (position == 'bottom') {
      return `calc(100vh - ${contentWidth})`;
    } else {
      return '42px';
    }
  };

  const cloceIsTopOrBottom = () => {
    if (position == 'bottom') {
      return '100vh';
    } else {
      return `calc( -${contentWidth} + 42px ) `;
    }
  };

  return (
    <>
      {position == 'right' || position == 'left' ? (
        <div
          className={publicStyle.popupleftbg}
          style={{
            width: contentWidth,
            left: popupVisable ? openIsLeftOrRight() : cloceIsLeftOrRight(),
          }}
        >
          <div
            onClick={() => onMaskClick()}
            className={publicStyle.popupmock}
            style={{
              opacity: popupVisable ? 1 : 0,
              display: show ? '' : 'none',
            }}
          />

          <div className={publicStyle.content} style={{ width: contentWidth }}>
            {children}
          </div>
        </div>
      ) : (
        <div
          className={publicStyle.popupbottombg}
          style={{
            height: contentWidth,
            top: popupVisable ? openIsTopOrBottom() : cloceIsTopOrBottom(),
          }}
        >
          <div
            onClick={() => onMaskClick()}
            className={publicStyle.popupmock}
            style={{
              opacity: popupVisable ? 1 : 0,
              display: show ? '' : 'none',
            }}
          />

          <div
            className={
              position == 'top'
                ? publicStyle.content
                : publicStyle.contentbottom
            }
            style={{ height: contentWidth }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default CcsPopup;
