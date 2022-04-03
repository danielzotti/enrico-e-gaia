import React, { useEffect, useState } from 'react';
import './App.scss';
import { Counter } from './components/Counter';
import { Toolbar } from './components/Toolbar';
import { BackgroundImage } from './components/BackgroundImage';
import ringsImageSrc from './assets/rings.jpg';
import { useWindowSize } from './hooks/useWindowSize';
import { useQueryParams } from './hooks/useQueryParams';
import { Enrico } from './components/Enrico';
import { Gaia } from './components/Gaia';

function App() {
  const [isCounterVisible, setIsCounterVisible] = useState<boolean>(false);
  const [isMobileMode, setIsMobileMode] = useState<boolean | undefined>(undefined);
  const { isMobile } = useWindowSize();
  const { date } = useQueryParams();
  const [targetDate, setTargetDate] = useState<Date | undefined>();

  useEffect(() => {
    try {
      const newDate = new Date(date);
      if(!isNaN(newDate.getMilliseconds())) {
        setTargetDate(newDate);
      }
    } catch(e) {
      setTargetDate(new Date());
    }
  }, [date]);

  useEffect(() => {
    if(isMobileMode === undefined) {
      setIsMobileMode(isMobile);
    }
  }, [isMobile]);

  useEffect(() => {
    setTimeout(() => {
      setIsCounterVisible(true);
    }, 2000);
  }, [setIsCounterVisible]);


  const onCounterVisibleChange = (isVisible: boolean) => {
    setIsCounterVisible(isVisible);
  };

  const onToggleMobileMode = (isMobileModeActive: boolean) => {
    setIsMobileMode(isMobileModeActive);
  };

  return (
    <>
      <div className={ `App ${ isMobileMode ? 'is-mobile' : '' }` }>
        <BackgroundImage src={ ringsImageSrc } blur="0px"/>
        <Toolbar
          isCounterVisible={ isCounterVisible }
          isMobileMode={ isMobileMode }
          onCounterVisibleChange={ onCounterVisibleChange }
          onToggleMobileMode={ onToggleMobileMode }
        />
        <Counter
          isVisible={ isCounterVisible }
          variant={ isMobileMode ? 'small' : 'big' }
          targetDate={ targetDate } // ?date=2022-09-17T10:00
        />
      </div>
      <Enrico/>
      <Gaia/>
    </>
  );
}

export default App;
