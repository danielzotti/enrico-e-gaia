import React from 'react';
import './App.scss';
import { Counter } from './Counter/Counter';

function App() {
  return (
    <div className="App">
      <Counter targetDate={ new Date(2045,8,17,10,0,0) }/>
    </div>
  );
}

export default App;
