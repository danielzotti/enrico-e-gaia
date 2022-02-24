import React from 'react';
import style from './index.module.scss';

export interface ToolbarProps {
  isCounterVisible?: boolean;
  onCounterVisibleChange: (isVisible: boolean) => void;
}

export const Toolbar = ({ isCounterVisible, onCounterVisibleChange }: ToolbarProps): JSX.Element => {

  const onCounterClick = () => onCounterVisibleChange(!isCounterVisible);

  return (
    <div className={ style.toolbar }>
      <button className={ style.toolbar__btn }
              onClick={ onCounterClick }
      >
        { isCounterVisible ? 'hide counter' : 'show counter' }
      </button>
    </div>
  );
};
