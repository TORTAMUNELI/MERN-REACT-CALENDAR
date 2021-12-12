import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from '../../routers/AppRouter';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);



describe('Pruebas en <AppRouter />', () => {

    test('Debe mostrar Espere...', () => {

        const initState = {
            auth: {
                checking: true
            }
        };
        let store = mockStore(initState);


        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        // expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h5').exists()).toBe(true);
    });

    test('Debe mostar la ruta publica', () => {

        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        let store = mockStore(initState);


        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        // expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);
    });

    test('Debe mostar la ruta privada', () => {

        const initState = {
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            },
            auth: {
                checking: false,
                uid: '123',
                name: 'test'
            }
        };
        let store = mockStore(initState);


        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        // expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);
    });
});
