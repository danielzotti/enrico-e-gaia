import React, { useState } from 'react';
import './App.scss';
import { Counter } from './Counter';
import { Toolbar } from './Toolbar';
import { BackgroundImage } from './BackgroundImage';
import horizontalImage from './assets/gaia-enrico-horizontal.jpg';
import verticalImage from './assets/gaia-enrico-vertical.jpg';
import { useWindowSize } from './hooks/useWindowSize';

function App() {
  const [isCounterVisible, setIsCounterVisible] = useState<boolean>(true);
  const { isHorizontal } = useWindowSize();

  const onCounterVisibleChange = async (isVisible: boolean) => {
    setIsCounterVisible(isVisible);
  };

  return (
    <div className="App">
      <BackgroundImage src={ isHorizontal ? horizontalImage : verticalImage } blur="3px"/>
      <Toolbar
        isCounterVisible={ isCounterVisible }
        onCounterVisibleChange={ onCounterVisibleChange }
      />
      {/*<img src={ isHorizontal ? horizontalImage : verticalImage }/>*/ }
      { isCounterVisible && <Counter targetDate={ new Date(2022, 8, 17, 10, 0, 0) }/> }
    </div>
  );
}

export default App;
