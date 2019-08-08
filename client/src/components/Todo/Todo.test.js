import React from 'react';
import renderer from 'react-test-renderer';
import { createStore, StoreProvider } from 'easy-peasy';
import { expect as chaiExpect } from 'chai';

import model from '../../model';
import Todo from './index';

const store = createStore(model);

describe('Todo component', () => {
    it ('should render todo componenet', () => {
        const tree = renderer.create(
            <StoreProvider store={store}>
                <Todo />
            </StoreProvider>
        ).toJSON();
        
        expect(tree).toMatchSnapshot();
        chaiExpect(tree).to.be.an('object');
        chaiExpect(tree).to.have.own.property('props');
        chaiExpect(tree.children.length).to.equal(2);
    });
});