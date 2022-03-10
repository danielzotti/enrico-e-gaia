import React, { useEffect, useState } from 'react';
import './App.scss';
import { Counter } from './components/Counter';
import { Toolbar } from './components/Toolbar';
import { BackgroundImage } from './components/BackgroundImage';
import horizontalImage from './assets/gaia-enrico-horizontal.jpg';
import verticalImage from './assets/gaia-enrico-vertical.jpg';
import { useWindowSize } from './hooks/useWindowSize';
import { useQueryParams } from './hooks/useQueryParams';

function App() {
  const [isCounterVisible, setIsCounterVisible] = useState<boolean>(true);
  const [isMobileMode, setIsMobileMode] = useState<boolean | undefined>(undefined);
  const { isHorizontal, isMobile } = useWindowSize();
  const { date } = useQueryParams();
  const [targetDate, setTargetDate] = useState<Date | undefined>();

  console.warn({ isMobileMode });

  useEffect(() => {
    try {
      const newDate = new Date(date);
      if(!isNaN(newDate.getMilliseconds())) {
        setTargetDate(newDate);
      }
    } catch(e) {
      console.log(e);
    }
  }, [date]);

  useEffect(() => {
    if(isMobileMode === undefined) {
      setIsMobileMode(isMobile);
    }
  }, [isMobile]);

  const onCounterVisibleChange = (isVisible: boolean) => {
    setIsCounterVisible(isVisible);
  };

  const onToggleMobileMode = (isMobileModeActive: boolean) => {
    setIsMobileMode(isMobileModeActive);
  };

  return (
    <div className={ `App ${ isMobileMode ? 'is-mobile' : '' }` }>
      { !isMobileMode && <BackgroundImage src={ isHorizontal ? horizontalImage : verticalImage } blur="0px"/> }
      <Toolbar
        isCounterVisible={ isCounterVisible }
        isMobileMode={ isMobileMode }
        onCounterVisibleChange={ onCounterVisibleChange }
        onToggleMobileMode={ onToggleMobileMode }
      />
      {/*<img src={ isHorizontal ? horizontalImage : verticalImage }/>*/ }
      { isCounterVisible &&
        <Counter variant={ isMobileMode ? 'small' : 'big' }
                 targetDate={ targetDate } // ?date=2022-09-17T10:00
        /> }
    </div>
  );
}

export default App;
