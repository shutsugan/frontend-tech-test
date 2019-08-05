import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

import TodosList from '../TodosList';
import AddTodo from '../AddTodo';

import './index.scss';

const App = _ => {
  const initialiseTodos = useStoreActions(actions => actions.initialiseTodos);

  useEffect(_ => {
    initialiseTodos();
  }, [initialiseTodos]);

  return (
    <div className="app half mr-auto flex-column center pd-16">
      <TodosList />
      <AddTodo />
    </div>
  );
};

export default App;
