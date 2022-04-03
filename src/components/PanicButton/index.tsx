import React, { ReactNode, useEffect, useState } from 'react';
import style from './index.module.scss';
import { BiShow, BiHide, BiHappyHeartEyes } from 'react-icons/bi';

export interface PanicButtonProps {
  isPanicMode?: boolean;
  onPanicModeChange: (isVisible: boolean) => void;
}

export const PanicButton = ({
                              isPanicMode,
                              onPanicModeChange,
                            }: PanicButtonProps): JSX.Element => {

  const [showPanic, setShowPanic] = useState(false);

  const onCounterClick = () => onPanicModeChange(!isPanicMode);

  useEffect(() => {
    setTimeout(() => {
      setShowPanic(true);
    }, 100);
  }, [setShowPanic]);

  return (
    <button className={ `${ style.btn } panic` }
            style={ { opacity: showPanic ? 1 : 0 } }
            onClick={ onCounterClick }>
      { isPanicMode ? <BiHappyHeartEyes/> : 'panic mode' }
    </button>
  );
};
