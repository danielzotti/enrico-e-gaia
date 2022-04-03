import React, { useCallback, useEffect, useRef, useState } from 'react';
import imgSrc from '../../assets/gaia-audrey.png';
import style from './index.module.scss';
import { useWindowSize } from '../../hooks/useWindowSize';

export interface GaiaProps {
  show?: boolean;
}

export const Gaia = ({ show = false }: GaiaProps): JSX.Element => {

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const [isVisible, setIsVisible] = useState<boolean>(show);

  const imgRef = useRef<HTMLImageElement>(null);

  const getBottomPosition = useCallback(() => {
    if(!imgRef.current || !imgRef.current.height) {
      return '-100vh';
    }
    return isVisible ? '0' : (-imgRef.current.height * 0.8) + 'px';
  }, [isVisible, windowHeight]);

  useEffect(() => {
    if(!imgRef.current) {
      return;
    }
    setIsVisible(show);
  }, [show]);


  useEffect(() => {
    if(!imgRef.current) {
      return;
    }
    imgRef.current.style.bottom = getBottomPosition();
  }, [isVisible, getBottomPosition, windowWidth, windowHeight]);

  const onclick = () => {
    if(!imgRef.current) {
      return;
    }
    setIsVisible(!isVisible);
  };

  return <img ref={ imgRef }
              alt="Gaia"
              onClick={ onclick }
              className={ `${ style.image }` }
              src={ imgSrc }/>;
};
