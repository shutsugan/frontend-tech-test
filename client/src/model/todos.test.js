import { createStore } from 'easy-peasy';
import mockAxios from 'jest-mock-axios';

import model, { save, checkProps } from './todos';

const setup = _ => createStore(model);
const message = 'test message';
const todo = { id: 0, title: 'test todo title', description: 'test todo description' };

afterEach(() => mockAxios.reset());

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

//helpers
test('Should call save with the right data', done => {
    const actions = { setMessage: message => message };
    const axios = mockAxios;

    save(
        axios,
        actions,
        'get',
        'http://localhost:9001/tasks'
    );

    expect(mockAxios.get).toHaveBeenCalled();
    done();
});

test('Should call checkProps', done => {
    const setMessage = jest.fn();
    const dontSetMessage = jest.fn();
    const { title, description } = todo;

    checkProps({ dontSetMessage }, title, description);
    checkProps({ setMessage });

    expect(dontSetMessage).not.toHaveBeenCalled();
    expect(setMessage).toHaveBeenCalled();
    done();
});

//thunks
test('Should be called to fetch data', done => {
    const store = createStore(model, { injections : { axios: mockAxios } });
    store.getActions().fetchTodos();

    expect(mockAxios.get).toHaveBeenCalled();
    done();
});

test('Should be called to add the todo', done => {
    const store = createStore(model, { injections: { axios: mockAxios } });
    const { title, description } = todo;

    store.getActions().addTodo({ title, description });

    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledWith(
        `http://localhost:9001/task/create/${title}/${description}`
    );

    done();
});

test('Should be called to update the todo', done => {
    const store = createStore(model, { injections: { axios: mockAxios } });
    const { id, title, description } = todo;

    store.getActions().updateTodo(todo);

    expect(mockAxios.put).toHaveBeenCalled();
    expect(mockAxios.put).toHaveBeenCalledWith(
        `http://localhost:9001/task/update/${id}/${title}/${description}`
    );

    done();
});

test('Should be called to delete the todo', done => {
    const store = createStore(model, { injections: { axios: mockAxios } });
    const { id } = todo;

    store.getActions().removeTodo(id);

    expect(mockAxios.delete).toHaveBeenCalled();
    expect(mockAxios.delete).toHaveBeenCalledWith(
        `http://localhost:9001/task/delete/${id}`
    );

    done();
});