import React from 'react';
import renderer from 'react-test-renderer';
import { createStore, StoreProvider } from 'easy-peasy';
import { expect as chaiExpect } from 'chai';

import model from '../../model';
import AddTodo from './index';

const store = createStore(model);

describe('AddTodo component', () => {
    it ('should render add todo componenet', () => {
        const tree = renderer.create(
            <StoreProvider store={store}>
                <AddTodo />
            </StoreProvider>
        ).toJSON();
        
        expect(tree).toMatchSnapshot();
        chaiExpect(tree).to.be.an('object');
        chaiExpect(tree).to.have.own.property('props');
        chaiExpect(tree.children.length).to.equal(3);
    });
});