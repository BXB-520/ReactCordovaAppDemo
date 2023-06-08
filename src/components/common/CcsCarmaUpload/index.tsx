import React, {
  CSSProperties,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
  memo,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  ChangeEvent,
} from 'react';

import { cordovaGetPicture } from '@/utils/cordova';
import { CameraOutline, CloseOutline } from 'antd-mobile-icons';
import { Dialog, ImageViewer, SpinLoading, Toast } from 'antd-mobile';
import Tips, { dealImage, getBase64Url, isCordova } from '@/utils/common';
import './index.less';

interface CameraProps {
  type?: 'CAMERA' | 'PHOTO';
  className?: string;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  onChange?(val: any, type?: 'del'): void;
  value?: any[];
  defaultValue?: any[];
  children?: ReactNode;
  /**上传异步函数 */
  upload?(vals: File | string): any;
  /**上传之前验证 */
  beforeUpload?(file: File): any;
  /**最大上传个数 */
  maxCount?: number;
  /**是否能删除 */
  deletable?: boolean;
  /**是否禁用上传 */
  disabled?: boolean;
  /**是否自定义图片节点位置 */
  isCustomImgsNode?: boolean;
  /**立即获取当前上传图片信息 */
  onGetImgList?(imgs: Record<string, any>[]): void;
}

/**
 * 上传图片组件
 * @param param0
 * @returns
 */
const UploadCarma: ForwardRefRenderFunction<any, CameraProps> = (
  {
    value,
    defaultValue,
    onChange,
    className,
    style,
    imgStyle,
    beforeUpload,
    upload,
    children,
    onGetImgList,
    type = 'CAMERA',
    maxCount = 1,
    deletable = true,
    disabled = false,
    isCustomImgsNode = false,
  },
  ref,
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const filesList = useRef<any[]>([]);
  const [imgListCache, setImgListCache] = useState<Record<string, any>[]>([]);
  // defaultValue只在初始化执行
  useEffect(() => {
    if (!defaultValue) return;
    setImgListCache(
      defaultValue?.map((item) => ({
        ...item,
        uid: Math.random().toString(16).slice(2),
      })) ?? [],
    );
  }, []);
  // 监听value变化
  useEffect(() => {
    filesList.current = value ?? defaultValue ?? [];
    if (!value) return;
    setImgListCache(
      value?.map((item) => ({
        ...item,
        uid: Math.random().toString(16).slice(2),
      })) ?? [],
    );
  }, [value?.length]);

  // input图片上传
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = e.target;
      const file = files![0];
      const beforeResult = beforeUpload?.(file);
      if (beforeUpload && !beforeResult) return;
      const uid = Math.random().toString(16).slice(2);
      const base64Url = await getBase64Url(file);
      onGetImgList?.([...imgListCache, { uid, url: base64Url }]);
      setImgListCache((imgs) => [...imgs, { uid, url: base64Url }]);
      setIsLoading(true);
      Tips.Loading('图片上传中...');
      const uploadResult = await upload?.(file);
      filesList.current.push({ ...uploadResult, uid });
      onChange?.([...filesList.current]);
      const appInputDomList = document.querySelectorAll(
        '.upload-app-carmas',
      ) as unknown as InputHTMLAttributes<HTMLInputElement>[];
      appInputDomList.forEach((InputDom) => {
        InputDom.value = '';
      });
    } catch {
      setImgListCache((imgs) => {
        imgs.pop();
        return [...imgs];
      });
      Toast.show({
        icon: 'fail',
        content: '图片上传失败',
      });
    } finally {
      setIsLoading(false);
      Tips.Loaded();
    }
  };

  // 摄像头拍照返回base64
  const getImageBase = async (base64: string) => {
    // 压缩图片后再上传
    dealImage(base64, 2000).then(async (dealBase64: string) => {
      try {
        const uid = Math.random().toString(16).slice(2);
        onGetImgList?.([...imgListCache, { uid, url: dealBase64 }]);
        setImgListCache((imgs) => [...imgs, { uid, url: dealBase64 }]);
        setIsLoading(true);
        Tips.Loading('图片上传中...');
        const uploadResult = await upload?.(dealBase64);
        filesList.current.push({ ...uploadResult, uid });
        onChange?.([...filesList.current]);
        const appInputDomList = document.querySelectorAll(
          '.upload-app-carmas',
        ) as unknown as InputHTMLAttributes<HTMLInputElement>[];
        appInputDomList.forEach((InputDom) => {
          InputDom.value = '';
        });
      } catch {
        setImgListCache((imgs) => {
          imgs.pop();
          return [...imgs];
        });
        Toast.show({
          icon: 'fail',
          content: '图片上传失败',
        });
      } finally {
        setIsLoading(false);
        Tips.Loaded();
      }
    });
  };

  // 删除图片
  const handleDelete = async (curVal: Record<string, any>) => {
    const result = await Dialog.confirm({
      content: '是否确认删除',
    });
    if (!result) return;
    const index = filesList.current?.findIndex(
      (item) => item.uid === curVal.uid,
    );
    filesList.current.splice(index, 1);
    onChange?.([...filesList.current], 'del');
    const newImgListCache = imgListCache.filter(
      (item) => item.uid !== curVal.uid,
    );
    setImgListCache(newImgListCache);
  };

  // 图片节点
  const customImgsNode = imgListCache.map((item) => (
    <span className="llq_img_wrapper" key={item.uid} style={imgStyle}>
      <img
        src={item?.url}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          border: '1px solid #9E9E9E',
          borderRadius: '6px',
        }}
        onClick={() => {
          ImageViewer.Multi.show({ images: [item?.url] });
        }}
      />
      {deletable && (
        <span className="llq_img_delete" onClick={() => handleDelete(item)}>
          <CloseOutline style={{ fontSize: 16 }} />
        </span>
      )}
      {isLoading && item.uid === imgListCache[imgListCache.length - 1].uid && (
        <span className="llq_img_loading">
          <SpinLoading />
        </span>
      )}
    </span>
  ));
  useImperativeHandle(ref, () => ({
    customImgsNode: [...customImgsNode],
    inputRef: inputRef.current,
    imgWrapperClassName: 'llq_carma_container',
    imgListCache,
    setImgListCache,
  }));

  return (
    <div className="llq_carma_container">
      {!isCustomImgsNode && customImgsNode}
      {isCordova() ? (
        <>
          {imgListCache?.length < maxCount && !disabled && (
            <div
              className={`llq_button ${className}`}
              style={style}
              onClick={() => {
                cordovaGetPicture(type, 'BACK').then((e: string) => {
                  getImageBase(e);
                });
              }}
            >
              {children ?? <CameraOutline />}
            </div>
          )}
        </>
      ) : (
        <>
          {type === 'CAMERA' ? (
            <>
              {imgListCache?.length < maxCount && (
                <div className={`llq_button ${className}`} style={style}>
                  {children ?? <CameraOutline />}
                  <input
                    type="file"
                    className="upload-app-carmas"
                    accept="image/*"
                    capture="camera"
                    onChange={(e) => handleInputChange(e)}
                    disabled={disabled}
                    ref={inputRef}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {imgListCache?.length < maxCount && (
                <div className={`llq_button ${className}`} style={style}>
                  {children ?? <CameraOutline />}
                  <input
                    type="file"
                    className="upload-app-carmas"
                    accept="image/*"
                    onChange={(e) => handleInputChange(e)}
                    disabled={disabled}
                    ref={inputRef}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default memo(forwardRef(UploadCarma));

interface PropsType {
  deletable: boolean;
  isLoading: boolean;
  imgStyle: CSSProperties;
  imgsNode: Record<string, any>[];
  handleDelImgs(img: Record<string, any>, index: number): void;
}
/**
 * 自定义图片
 * @param param0
 * @returns
 */
export const CustomImgsNode: FC<Partial<PropsType>> = ({
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
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            border: '1px solid #9E9E9E',
            borderRadius: '6px',
          }}
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
