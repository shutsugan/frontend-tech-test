import { action, computed, thunk } from "easy-peasy";
import axios from 'axios';

const base_url = 'http://localhost:9001';

const noop = _ => {};
const save = async (actions, method, url, callback = noop) => {
    const res = await axios[method](`${base_url}/task/${url}`);
    const { task, message } = await res.data;

    callback(task);
    actions.setMessage(message);
};

const checkProps = (actions, title, description) => {
    if (!title && !description) return actions.setMessage('Fields are reuqired');
};

export default {
    todos: [],
    selectedTodo: null,
    message: null,

    list: computed(state => Object.values(state.todos)),

    //actions
    setMessage: action((state, message) => state.message = message),
    selectTodo: action((state, todo) => state.selectedTodo = todo),
    added: action((state, todo) => state.todos[todo.id] = todo),

    fetched: action((state, payload = []) => {
        state.todos = payload.reduce((acc, todo) => {
            acc[todo.id] = todo;

            return acc;
        }, {});
    }),

    //thunks
    fetchTodos: thunk(async (actions, _, { injections }) => {
        const { axios } = injections
        const res = await axios.get(`${base_url}/tasks`);
        const { tasks } = await res.data;

        actions.fetched(tasks);
    }),

    addTodo: thunk(async (actions, { title, description }) => {
        checkProps(actions, title, description);
        save(
            actions,
            'post',
            `create/${title}/${description}`,
            todo => actions.added(todo)
        );
    }),

    updateTodo: thunk(async (actions, { id, title, description }) => {
        checkProps(actions, title, description);
        save(
            actions,
            'put',
            `update/${id}/${title}/${description}`,
            _ => {
                actions.fetchTodos();
                actions.selectTodo(null);
            }
        );
    }),

    removeTodo: thunk(async (actions, id) => {
        save(
            actions,
            'delete',
            `delete/${id}`,
            _ => actions.fetchTodos()
        );
    })
};