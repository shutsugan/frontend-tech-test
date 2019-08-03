import { action, computed, thunk } from "easy-peasy";
import axios from 'axios';

const base_url = 'http://localhost:9001';

const save = async (actions, method, url, callback) => {
    const res = await axios[method](`${base_url}/task/${url}`);
    const { task, message } = await res.data;

    callback(task);
    actions.setMessage(message);
};

export default {
    todos: [],
    message: '',

    list: computed(state => Object.values(state.todos)),

    setMessage: action((state, message) => state.message = message),
    added: action((state, todo) => state.todos[todo.id] = todo),

    fetched: action((state, payload = []) => {
        state.todos = payload.reduce((acc, todo) => {
            acc[todo.id] = todo;

            return acc;
        }, {});
    }),

    fetchTodos: thunk(async actions => {
        const res = await axios.get(`${base_url}/tasks`);
        const { tasks } = await res.data;

        actions.fetched(tasks);
    }),

    addTodo: thunk(async (actions, { id, title, description }) => {
        if (!title && !description) {
            return actions.setMessage('Fields are reuqired');
        }

        if (id) {
            save(
                actions,
                'put',
                `update/${id}/${title}/${description}`,
                todo => actions.updated(todo)
            );
        } else {
            save(
                actions,
                'post',
                `create/${title}/${description}`,
                todo => actions.added(todo)
            );
        }
    })
};