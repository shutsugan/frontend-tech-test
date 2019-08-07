import React from 'react';
import renderer from 'react-test-renderer';
import { createStore, StoreProvider } from 'easy-peasy';
import { expect as chaiExpect } from 'chai';

import model from '../../model';
import TodosList from './index';

const store = createStore(
    model, { injections: { axios: jest.fn() } }
);

describe('TodosList component', () => {
    it ('should render todos list component', () => {
        const tree = renderer.create(
            <StoreProvider store={store}>
                <TodosList />
            </StoreProvider>
        ).toJSON();
        
        expect(tree).toMatchSnapshot();
        chaiExpect(tree).to.be.an('object');
        chaiExpect(tree).to.have.own.property('props');
    });
})