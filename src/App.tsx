import React, { useEffect, useState } from 'react';
import './App.scss';
import { Counter } from './components/Counter';
import { PanicButton } from './components/PanicButton';
import { BackgroundImage } from './components/BackgroundImage';
import ringsImageSrc from './assets/rings.jpg';
import { useQueryParams } from './hooks/useQueryParams';
import { Enrico } from './components/Enrico';
import { Gaia } from './components/Gaia';

function App() {
  const [isPanicMode, setIsPanicMode] = useState<boolean>(false);
  const [showCounter, setShowCounter] = useState<boolean>(false);
  const [showPanicBUtton, setShowPanicBUtton] = useState<boolean>(false);
  const { date } = useQueryParams();
  const [targetDate, setTargetDate] = useState<Date | undefined>();

  useEffect(() => {
    try {
      const newDate = new Date(date || '2022-09-17T10:00');
      if(!isNaN(newDate.getMilliseconds())) {
        setTargetDate(newDate);
      }
    } catch(e) {
      setTargetDate(new Date('2022-09-17T10:30'));
    }
  }, [date]);

  useEffect(() => {
    setTimeout(() => {
      setShowCounter(true);
    }, 2000);

    setTimeout(() => {
      setShowPanicBUtton(true);
    }, 3500);
  }, [setShowPanicBUtton]);


  const onPanicModeChange = (isPanicMode: boolean) => {
    setIsPanicMode(isPanicMode);
  };


  return (
    <>
      <div className="App">
        <BackgroundImage src={ ringsImageSrc } blur="0px"/>
        { showPanicBUtton && <PanicButton
          isPanicMode={ isPanicMode }
          onPanicModeChange={ onPanicModeChange }
        /> }
        <Counter
          isVisible={ !isPanicMode && showCounter }
          targetDate={ targetDate } // ?date=2022-09-17T10:00
        />
      </div>
      <Enrico show={ isPanicMode }/>
      <Gaia show={ isPanicMode }/>
    </>
  );
}

export default App;
