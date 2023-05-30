import { ANIMATION_TIME } from '@/constants/system';
import { useEffect } from 'react';

/** 延时加载 */
export const DelayUseEffect = (Effect: Function, unEffect?: Function) => {
  useEffect(() => {
    setTimeout(() => {
      Effect();
    }, ANIMATION_TIME);
    return () => {
      if (unEffect) unEffect();
    };
  }, []);
};
