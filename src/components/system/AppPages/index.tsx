import React, { CSSProperties, ReactNode } from 'react';
import styles from './index.less';

export const AppPage = (props: { children: ReactNode }) => {
  return <div className={styles.apppage}>{props.children}</div>;
};

export const AppContent = (props: {
  children: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <div
      id="appcontent"
      style={props.style}
      className={`${styles.appcontent} speaclappcontent`}
    >
      {props.children}
    </div>
  );
};
