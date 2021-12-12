import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import moment from 'moment';
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus = now.clone().add(1, 'hours');


const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'Notitas',
            start: now.toDate(),
            end: nowPlus.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'test'
    },
    ui: {
        modalOpen: true
    }
};
let store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
);


describe('Pruebas en <CalendarModal />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('Debe de mostrar el modal', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });

    test('Debe de llamar la acción de actualizar y cerrar modal', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect(eventClearActiveEvent).toHaveBeenCalled();
    });

    test('Debe crear un nuevo evento', () => {
        const initState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: '123',
                name: 'test'
            },
            ui: {
                modalOpen: true
            }
        };
        let store = mockStore(initState);

        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola pruebas',
            notes: ''
        });

        expect(eventClearActiveEvent).toHaveBeenCalled();
    });
});
