import React, { useState } from 'react';
import './App.scss';
import { Counter } from './Counter';
import { Toolbar } from './Toolbar';

function App() {
  const [isCounterVisible, setIsCounterVisible] = useState<boolean>(true);

  const onCounterVisibleChange = async (isVisible: boolean) => {
    setIsCounterVisible(isVisible);
  };

  return (
    <div className="App">
      <Toolbar
        isCounterVisible={ isCounterVisible }
        onCounterVisibleChange={ onCounterVisibleChange }
      />
      { isCounterVisible && <Counter targetDate={ new Date(2022, 8, 17, 10, 0, 0) }/> }
    </div>
  );
}

export default App;
