import { createStore } from 'easy-peasy';
import mockAxios from 'jest-mock-axios';

import model from './todos';

const setup = _ => createStore(model);
const message = 'test message';
const todo = { id: 0, title: 'test todo title', description: 'test todo description' };

//actions
test('Should return the fetched data', () => {
    const store = setup();
    store.getActions().fetched([todo]);

    expect(store.getState().todos).toEqual({ [todo.id]: todo });
});

test('Should add a todo', () => {
    const store = setup();
    store.getActions().added(todo);

    expect(store.getState().todos).toEqual([todo]);
});

test('Should select a todo', () => {
    const store = setup();
    store.getActions().selectTodo(todo);

    expect(store.getState().selectedTodo).toEqual(todo);
});

test('Should set the right message', () => {
    const store = setup();
    store.getActions().setMessage(message);

    expect(store.getState().message).toEqual(message);
});

//thunks
test('Should fetch the right data', done => {
    const store = createStore(model, { injections : { axios: mockAxios } });
    store.getActions().fetchTodos();

    expect(mockAxios.get).toHaveBeenCalled();
    done();
});
