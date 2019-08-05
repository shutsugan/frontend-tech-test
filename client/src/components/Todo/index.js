import React from 'react';
import { useStoreActions } from 'easy-peasy';

import './index.scss';

const Todo = ({ id, title, description }) => {
    const selectTodo = useStoreActions(actions => actions.todos.selectTodo);
    const removeTodo = useStoreActions(actions => actions.todos.removeTodo);

    return (
        <div className="todo flex space-between pdt-8 br-bottom">
            <div>
            <h3 className="mr-none mrs-8">{ title }</h3>
            <p className="todo__info mr-none mrs-8">{ description }</p>
            </div>
            <div className="flex center pd-8">
                <span
                    className="link mrr-16"
                    onClick={_ => selectTodo({ id, title, description})}>
                    Edit
                </span>
                <div
                    className="todo__remove-button flex center"
                    onClick={_ => removeTodo(id)}>
                    x
                </div>
            </div>
        </div>
    );
};

export default Todo;