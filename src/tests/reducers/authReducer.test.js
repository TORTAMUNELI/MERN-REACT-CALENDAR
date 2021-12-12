import { login } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


const initialState = {
    checking: true,
    // uid: null,
    // name: null
}

describe('Pruebas en authReducer', () => {

    test('Debe retornar el estado por defecto', () => {
        const action = {};
        const state = authReducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    test('Debe autenticar el ususario', () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test'
            }
        }

        const state = authReducer(initialState, action);

        expect(state).toEqual({
            checking: false,
            uid: '123',
            name: 'test'
        });
    });
});
