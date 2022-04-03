import React, { ReactNode, useEffect, useState } from 'react';
import style from './index.module.scss';
import { BiShow, BiHide } from 'react-icons/bi';

export interface ToolbarProps {
  isCounterVisible?: boolean;
  isMobileMode?: boolean;
  onCounterVisibleChange: (isVisible: boolean) => void;
  onToggleMobileMode: (isMobile: boolean) => void;
}

export interface ButtonToolbarProps {
  children: ReactNode;
  onClick: () => void;
}

export const ToolbarButton = ({ children, onClick }: ButtonToolbarProps) =>
  <button className={ style.toolbar__btn }
          onClick={ onClick }>
    { children }
  </button>;

export const Toolbar = ({
                          isCounterVisible,
                          onCounterVisibleChange,
                        }: ToolbarProps): JSX.Element => {

  const [isVisible, setIsVisible] = useState(false);

  const onCounterClick = () => onCounterVisibleChange(!isCounterVisible);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 4000);
  }, [setIsVisible]);

  return (
    <div className={ style.toolbar } style={ { opacity: isVisible ? 1 : 0 } }>
      <ToolbarButton onClick={ onCounterClick }>
        { isCounterVisible ? <BiHide/> : <BiShow/> }
      </ToolbarButton>
    </div>
  );
};
