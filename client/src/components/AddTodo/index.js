import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

import './index.css';

const AddTodo = _ => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addTodo = useStoreActions(actions => actions.todos.addTodo);
    const handleChange = ({ target }, setter) => setter(target.value);

    const handleAddTodo = async _ => {
        await addTodo({ title, description });

        setTitle('');
        setDescription('');
    };

    return (
        <div className="add-todo full">
            <div className="fleid flex-column start mrb-16 relative">
                <label className="required">Title</label>
                <input
                    className="field__input full pd-16"
                    value={title}
                    onChange={event => handleChange(event, setTitle)}
                />
            </div>
            <div className="fleid flex-column start mrb-16 relative">
                <label className="required">Description</label>
                <textarea
                    className="field__input full pd-16 ht-80"
                    value={description}
                    onChange={event => handleChange(event, setDescription)}>                
                </textarea>
            </div>
            <button
                className="button full pd-16"
                onClick={handleAddTodo}>
                Add Todo
            </button>
        </div>
    );
}

export default AddTodo;