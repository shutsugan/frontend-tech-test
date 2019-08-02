import todos from './todos';
import { thunk } from 'easy-peasy';

export default {
    todos,
    initialiseTodos: thunk(async (actions, payload, { dispatch }) => {
        await dispatch.todos.fetchTodos();
    })
};