import { CloseOutline } from 'antd-mobile-icons';
import { Dialog, ImageViewer, SpinLoading } from 'antd-mobile';
import React, { CSSProperties, FC } from 'react';

interface PropsType {
  deletable: boolean;
  isLoading: boolean;
  imgStyle: CSSProperties;
  imgsNode: Record<string, any>[];
  handleDelImgs(img: Record<string, any>, index: number): void;
}

const CustomImgsNode: FC<Partial<PropsType>> = ({
  deletable = true,
  imgStyle,
  imgsNode,
  isLoading,
  handleDelImgs,
}) => {
  const customImgsNode = imgsNode?.map(
    (item: Record<string, any>, index: number) => (
      <span className="llq_img_wrapper" key={index} style={imgStyle}>
        <img
          src={item?.url}
          alt=""
          style={{ width: '100%', height: '100%' }}
          onClick={() => {
            ImageViewer.Multi.show({ images: [item?.url] });
          }}
        />
        {deletable && (
          <span
            className="llq_img_delete"
            onClick={() => handleDelete(item, index)}
          >
            <CloseOutline style={{ fontSize: 13 }} />
          </span>
        )}
        {isLoading && item.uid === imgsNode[imgsNode.length - 1].uid && (
          <span className="llq_img_loading">
            <SpinLoading />
          </span>
        )}
      </span>
    ),
  );

  // 删除图片
  const handleDelete = async (curVal: Record<string, any>, index: number) => {
    const result = await Dialog.confirm({
      content: '是否确认删除',
    });
    if (!result) return;
    handleDelImgs?.(curVal, index);
  };

  return <div className="llq_carma_container">{customImgsNode}</div>;
};

export default CustomImgsNode;
