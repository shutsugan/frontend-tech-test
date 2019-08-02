import { action, computed, thunk } from "easy-peasy";
import axios from 'axios';

export default {
    todos: [
        { id: 1, title: 'Work', description: 'some work to do' },
        { id: 2, title: 'Train', description: 'some training to do' }
    ],

    list: computed(state => Object.values(state.todos)),

    fetchTodos: thunk(async actions => {
        const res = await axios.get(`http://localhost:9001/tasks`);
        const { tasks } = await res.data;

        actions.fetched(tasks);
    }),

    fetched: action((state, payload = []) => {
        state.todos = payload.reduce((acc, todo) => {
            acc[todo.id] = todo;

            return acc;
        }, {});
    })
};