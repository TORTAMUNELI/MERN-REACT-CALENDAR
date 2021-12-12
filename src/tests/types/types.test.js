import { types } from "../../types/types";

describe('Pruebas en Types', () => {
    test('Los types deben ser iguales', () => {
        expect(types).toEqual({
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',

            eventStartAddNew: '[event] Start add new',
            eventSetActive: '[event] Set active',
            eventLogout: '[event] Logout event',
            eventAddNew: '[event] Add new',
            eventUpdate: '[event] Update',
            eventDelete: '[event] Delete',
            eventLoaded: '[event] Loaded',
            eventClearActiveEvent: '[event] Clear active event',

            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start Login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',
        });
    });
});