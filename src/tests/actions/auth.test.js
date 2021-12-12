import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
import { startLogin, startRegister, startChecking } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({ fire: jest.fn() }));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones auth', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('startLogin correcto', async () => {
        await store.dispatch(startLogin('ema2il@email.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('startLogin incorrecto', async () => {
        await store.dispatch(startLogin('ema2il@email.com', '1234567'));

        let actions = store.getActions();

        expect(actions).toEqual([]);

        expect(Swal.fire).toHaveBeenCalled();
    });

    test('startRegister correcto', async () => {
        fetchModule.fetchSinToken = jest.fn(() => ({
            json: () => ({
                uid: '123',
                name: 'test'
            })
        }));

        await store.dispatch(startRegister('test@test.com', '123456', 'test'));

        expect(store.getActions()).toEqual([]);
    });

    test('startChecking correcto', async () => {
        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'test',
                    token: 'ABC'
                }
            }
        }));

        await store.dispatch(startChecking());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC');
    });
});
