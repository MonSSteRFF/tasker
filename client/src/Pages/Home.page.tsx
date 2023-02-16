import React, { useState } from 'react';

import Header from '../components/Header';

const HomePage: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);

  const changeCounterHandler = (n: number) => {
    setCounter(counter + n);
  };

  return (
    <main className="container">
      <p>counter: {counter}</p>
      <button onClick={() => changeCounterHandler(1)}>increase</button>
      <button onClick={() => changeCounterHandler(-1)}>decrease</button>
    </main>
  );
};

export default HomePage;
