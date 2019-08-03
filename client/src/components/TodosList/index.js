import React from 'react';
import { useStoreState } from 'easy-peasy';

import Todo from '../Todo';

const TodoList = _ => {
    const todos = useStoreState(state => state.todos.list);
    const list = todos.map(todo => <Todo key={todo.id} {...todo} />);
    
    return <div className="todo-list card full flex-column mrb-16">{ list }</div>;
};

export default TodoList;