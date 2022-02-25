import React from 'react';

import style from './index.module.scss';

export interface BackgroundImageProps {
  blur?: string;
  src?: string;
  color?: string;
  customStyle?: { [key: string]: React.CSSProperties };
}

export const BackgroundImage = ({
                                  color = 'transparent',
                                  src,
                                  blur = '0px',
                                  customStyle
                                }: BackgroundImageProps): JSX.Element => {
  return (
    <div className={ style.image } style={
      {
        backgroundColor: color,
        filter: `blur(${ blur })`,
        backgroundImage: src ? `url("${ src }")` : undefined,
        ...customStyle && { ...customStyle }
      }
    }/>
  );
};
