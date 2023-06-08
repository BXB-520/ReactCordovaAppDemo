import React, { FC } from 'react';
import { cordovaGetPicture } from '@/utils/cordova';
import { isCordova } from '@/utils/common';

interface CcsUseCameraType {
  /** 返回图片base64 */
  backBase64: (Base64: string) => void;
  /** 类型 */
  type: 'CAMERA' | 'PHOTO';
  /** 使用的摄像头 */
  direction?: 'FRONT' | 'BACK';
  /** 内容 */
  children: React.ReactNode;
}

/** 使用app相机 */
const CcsUseCamera: FC<CcsUseCameraType> = ({
  backBase64,
  type,
  children,
  direction = 'BACK',
}) => {
  const handlerUploadImg = (e: any) => {
    const { files } = e.target;
    const file = files[0];
    // 接受 jpeg, jpg, png 类型的图片
    if (!/\/(?:jpeg|jpg|png)/i.test(file?.type)) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (result: any) => {
      backBase64(result?.target?.result);
    };
  };

  return (
    <>
      {isCordova() ? (
        <>
          <label>
            <div
              onClick={() => {
                cordovaGetPicture(type, direction).then((e: string) => {
                  backBase64(e);
                });
              }}
            >
              {children}
            </div>
          </label>
        </>
      ) : (
        <>
          {type == 'CAMERA' ? (
            <label>
              <div>
                {children}
                <input
                  type="file"
                  accept="image/*"
                  capture="camera"
                  onChange={handlerUploadImg}
                  hidden
                />
              </div>
            </label>
          ) : (
            <label>
              <div>
                {children}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlerUploadImg}
                  hidden
                />
              </div>
            </label>
          )}
        </>
      )}
    </>
  );
};

export default CcsUseCamera;
