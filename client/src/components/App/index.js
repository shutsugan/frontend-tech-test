import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

import TodosList from '../TodosList';

import './index.css';

const App = _ => {
  const initialiseTodos = useStoreActions(actions => actions.initialiseTodos);

  useEffect(_ => {
    initialiseTodos();
  }, [initialiseTodos]);

  return (
    <div className="app">
      <TodosList />
    </div>
  );
};

export default App;
