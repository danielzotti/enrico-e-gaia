import React, { useCallback, useEffect, useRef, useState } from 'react';
import imgSrc from '../../assets/enrico-rovinafoto.png';
import style from './index.module.scss';
import { useWindowSize } from '../../hooks/useWindowSize';

export interface EnricoProps {
  top?: string;
  left?: string;
}

export const Enrico = (props: EnricoProps): JSX.Element => {

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const getRightPosition = useCallback(() => {
    if(!imgRef.current || !imgRef.current.width) {
      return '-100vw';
    }
    return isVisible ? '0' : (-imgRef.current.width * 0.8) + 'px';
  }, [isVisible, windowWidth]);

  useEffect(() => {
    if(!imgRef.current) {
      return;
    }
    setIsVisible(true);
  }, []);


  useEffect(() => {
    if(!imgRef.current) {
      return;
    }
    imgRef.current.style.right = getRightPosition();
  }, [isVisible, getRightPosition, windowWidth, windowHeight]);


  const onclick = () => {
    if(!imgRef.current) {
      return;
    }
    setIsVisible(!isVisible);
  };

  return <img ref={ imgRef }
              alt="Enrico"
              onClick={ onclick }
              className={ `${ style.image }` }
              src={ imgSrc }/>;
};
