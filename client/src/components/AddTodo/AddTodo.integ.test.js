import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  cleanup,
  fireEvent,
  act
} from '@testing-library/react';

import model from '../../model';
import AddTodo from './index';

const todo = { title: 'title', description: 'description'};
const axios = { post: jest.fn() };
const store = createStore(model, { injections: { axios } });

const setup = _ => {
    const utils = render(
        <StoreProvider store={store}>
            <AddTodo />
        </StoreProvider>
    );
    
    const titleInput = utils.getByLabelText('title');
    const descriptionInput = utils.getByLabelText('description');
    const button = utils.getByLabelText('button');

    return {
        ...utils,
        titleInput,
        descriptionInput,
        button
    };
};

afterEach(cleanup);

test('Should fill the feilds and call send method after button is clicked', () => {
    const { titleInput, descriptionInput, button } = setup();
    const { title, description } = todo;

    fireEvent.change(titleInput, { target: { value: title } });
    fireEvent.change(descriptionInput, { target: { value: description } });

    act(() => fireEvent.click(button));

    expect(titleInput.value).toBe(title);
    expect(descriptionInput.value).toBe(description);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
        `http://localhost:9001/task/create/${title}/${description}`
    );
});