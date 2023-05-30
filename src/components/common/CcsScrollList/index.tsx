import React, {
  ComponentType,
  CSSProperties,
  FC,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  DotLoading,
  Empty,
  ErrorBlock,
  InfiniteScroll,
  PullToRefresh,
  SpinLoading,
} from 'antd-mobile';
import styles from './index.less';

let first = true;
interface PaginationType {
  /**
   * 每个个数
   */
  pageSize: number;
  /**
   * 第几页
   */
  pageNo: number;
  /**
   * 高度自己写单位%
   */
  height?: string;
  /**
   * 所有的数据个数
   */
  totalNum: number;
  /**
   * 数据为空时文字
   */
  emptyTitle?: ReactNode;
  /**
   * 数据为空时图片
   */
  emptyImg?: string;
}
interface PropsType {
  /**
   * 是否显示加载组件
   */
  moreLoading?: boolean;
  loading?: Boolean;
  emptySytle?: CSSProperties;
  children: React.ReactNode;
  style?: CSSProperties;
  pagination: PaginationType;
  setting?: ComponentType;
  refresh: () => void;
  loadMore: () => void;
}

/** 滚动条回到顶部 */
export const scrollBackTop = () => {
  const pageView = document.getElementById('AppScrollPageView');
  if (pageView) {
    pageView.scrollTop = 0;
  }
};

const CcsScrollList: FC<PropsType> = (props) => {
  const {
    pagination,
    style,
    emptySytle,
    moreLoading = true,
    loading = false,
    setting,
  } = props;
  const [totalPages, setTotalPages] = useState<number>(0); // 总页数
  useEffect(() => {
    setTotalPages(Math.ceil(pagination.totalNum / pagination.pageSize));
  }, [pagination.totalNum]);

  // 加强版  首次立即执行
  const debounce = (fn: () => void, delay: number) => {
    if (first) {
      first = false;
      fn();
      setTimeout(() => {
        first = true;
      }, delay);
    }
  };

  const loadMore = async () => {
    const { pageSize, pageNo, totalNum } = pagination;
    if (pageSize >= totalNum) return; // console.log('不支持上拉');
    if (pageNo >= totalPages) return; // console.log('到底了');
    debounce(props.loadMore, 3000);
  };

  // 下拉刷新
  const onRefresh = async () => {
    props.refresh();
  };

  return (
    <div
      className={styles.forscrolllist}
      style={{ height: `${pagination?.height}` ?? '100%' }}
    >
      <PullToRefresh onRefresh={onRefresh} {...setting}>
        {loading ? (
          <div
            style={{
              fontSize: 24,
              display: 'flex',
              justifyContent: 'center',
              marginTop: 100,
            }}
          >
            <SpinLoading className={styles.spinloading} />
          </div>
        ) : (
          <div
            id="AppScrollPageView"
            style={{
              height: '100%',
              overflow: 'auto',
              ...style,
            }}
          >
            {pagination.totalNum === 0 ? (
              <div>
                <ErrorBlock
                  status="empty"
                  title={pagination.emptyTitle || '暂无数据'}
                  description=""
                  style={{
                    background: 'rgb(255 255 255 / 80%)',
                    borderRadius: '6px',
                    padding: '20px 0',
                    margin: '10px',
                    ...emptySytle,
                  }}
                />
                {/* <Empty
                  image={pagination.emptyImg}
                  description={pagination.emptyTitle || '暂无数据'}
                  style={{
                    background: 'rgb(255 255 255 / 80%)',
                    borderRadius: '6px',
                    padding: '40px 0',
                    margin: '10px',
                    ...emptySytle,
                  }}
                /> */}
              </div>
            ) : (
              props.children
            )}
            {moreLoading && pagination.totalNum !== 0 ? (
              <InfiniteScroll
                loadMore={loadMore}
                hasMore={
                  !(
                    pagination.pageNo >= totalPages ||
                    pagination.pageSize >= pagination.totalNum
                  )
                }
                threshold={10}
              />
            ) : null}
          </div>
        )}
      </PullToRefresh>
    </div>
  );
};

export default CcsScrollList;
