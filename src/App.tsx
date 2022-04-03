import React, { useEffect, useState } from 'react';
import './App.scss';
import { Counter } from './components/Counter';
import { Toolbar } from './components/Toolbar';
import { BackgroundImage } from './components/BackgroundImage';
import ringsImageSrc from './assets/rings.jpg';
import { useQueryParams } from './hooks/useQueryParams';
import { Enrico } from './components/Enrico';
import { Gaia } from './components/Gaia';

function App() {
  const [isCounterVisible, setIsCounterVisible] = useState<boolean>(false);
  const { date } = useQueryParams();
  const [targetDate, setTargetDate] = useState<Date | undefined>();

  useEffect(() => {
    try {
      const newDate = new Date(date || '2022-09-17T10:00');
      if(!isNaN(newDate.getMilliseconds())) {
        setTargetDate(newDate);
      }
    } catch(e) {
      setTargetDate(new Date('2022-09-17T10:00'));
    }
  }, [date]);

  useEffect(() => {
    setTimeout(() => {
      setIsCounterVisible(true);
    }, 3500);
  }, [setIsCounterVisible]);


  const onCounterVisibleChange = (isVisible: boolean) => {
    setIsCounterVisible(isVisible);
  };


  return (
    <>
      <div className="App">
        <BackgroundImage src={ ringsImageSrc } blur="0px"/>
        <Toolbar
          isCounterVisible={ isCounterVisible }
          onCounterVisibleChange={ onCounterVisibleChange }
        />
        <Counter
          isVisible={ isCounterVisible }
          targetDate={ targetDate } // ?date=2022-09-17T10:00
        />
      </div>
      <Enrico/>
      <Gaia/>
    </>
  );
}

export default App;
