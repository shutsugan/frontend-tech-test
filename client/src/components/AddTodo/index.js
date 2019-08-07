import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import './index.scss';

const AddTodo = _ => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const selectedTodo = useStoreState(state => state.todos.selectedTodo);

    useEffect(_ => {
        let id, title, description = '';

        if (selectedTodo) {
            id = selectedTodo.id;
            title = selectedTodo.title;
            description = selectedTodo.description;
        }

        setId(id);
        setTitle(title);
        setDescription(description);
    }, [selectedTodo]);

    const addTodo = useStoreActions(actions => actions.todos.addTodo);
    const updateTodo = useStoreActions(actions => actions.todos.updateTodo);
    
    const handleChange = ({ target }, setter) => setter(target.value);

    const handleAddTodo = async _ => {
        !selectedTodo
            ? await addTodo({ title, description })
            : await updateTodo({ id, title, description });

        setId('');
        setTitle('');
        setDescription('');
    };

    return (
        <div className="add-todo full">
            <div className="fleid flex-column start mrb-16 relative">
                <label className="required">Title</label>
                <input
                    aria-label="title"
                    className="field__input full pd-16"
                    value={title}
                    onChange={event => handleChange(event, setTitle)}
                />
            </div>
            <div className="fleid flex-column start mrb-16 relative">
                <label className="required">Description</label>
                <textarea
                    aria-label="description"
                    className="field__input full pd-16 ht-80"
                    value={description}
                    onChange={event => handleChange(event, setDescription)}>                
                </textarea>
            </div>
            <button
                aria-label="button"
                className="button full pd-16"
                onClick={handleAddTodo}>
                Add Todo
            </button>
        </div>
    );
}

export default AddTodo;