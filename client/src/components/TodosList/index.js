import React from 'react';

import { useStoreState } from 'easy-peasy';

const TodoList = _ => {
    const todos = useStoreState(state => state.todos.list);
    
    return (
        <div className="todo-list">
            todo list
        </div>
    );
};

export default TodoList;