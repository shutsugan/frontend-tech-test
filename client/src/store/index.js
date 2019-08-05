import { createStore } from 'easy-peasy';
import axios from 'axios';

import storeModel from '../model';

const store = createStore(
    storeModel,
    { injections: { axios } }
);

export default store;