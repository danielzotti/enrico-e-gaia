import React, { ReactChildren, ReactNode } from 'react';
import style from './index.module.scss';

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
                          isMobileMode,
                          onCounterVisibleChange,
                          onToggleMobileMode
                        }: ToolbarProps): JSX.Element => {

  const onCounterClick = () => onCounterVisibleChange(!isCounterVisible);
  const onMobileModeClick = () => onToggleMobileMode(!isMobileMode);

  return (
    <div className={ style.toolbar }>
      <ToolbarButton onClick={ onCounterClick }>
        { isCounterVisible ? 'hide counter' : 'show counter' }
      </ToolbarButton>
      <ToolbarButton onClick={ onMobileModeClick }>
        { isMobileMode ? 'show desktop mode' : 'show mobile mode' }
      </ToolbarButton>
    </div>
  );
};
