import { fetchSinToken, fetchConToken } from "../../helpers/fetch";

describe('Pruebas en el helper Fetch', () => {
    let token = '';

    test('fetchSinToken debe funcionar', async () => {
        const resp = await fetchSinToken('auth', { email: 'ema2il@email.com', password: '123456' }, 'POST');

        expect(resp instanceof Response).toBe(true);
        const body = await resp.json();
        expect(body.name).toBe('Jhon');

        token = body.token;
    });

    test('fetchConToken debe funcionar', async () => {
        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/61b145081d97671b7fd5a7aa', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('El evento con ese id no existe');
    });
});
