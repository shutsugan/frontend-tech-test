import React from 'react';

import './index.css';

const Todo = ({ id, title, description }) => {

    return (
        <div className="todo flex space-between pdt-8 br-bottom">
            <div>
            <h3 className="mr-none mrs-8">{ title }</h3>
            <p className="todo__info mr-none mrs-8">{ description }</p>
            </div>
            <div className="flex center pd-8">
                <a className="link mrr-16">Edit</a>
                <div className="todo__remove-button flex center">x</div>
            </div>
        </div>
    );
};

export default Todo;