import React from 'react';
import renderer from 'react-test-renderer';
import { createStore, StoreProvider } from 'easy-peasy';
import { expect as chaiExpect } from 'chai';

import model from '../../model';
import App from './index';

const store = createStore(
    model, { injections: { axios: jest.fn() } }
);

describe('App component', () => {
    it ('should render the app component', () => {
        const tree = renderer.create(
            <StoreProvider store={store}>
                <App />
            </StoreProvider>
        ).toJSON();
        
        expect(tree).toMatchSnapshot();
        chaiExpect(tree).to.be.an('object');
        chaiExpect(tree).to.have.own.property('props');
        chaiExpect(tree.children.length).to.equal(2);
    });
})