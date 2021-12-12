import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;
        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if (!!body.id) {
                event.id = body.id;
                event.user = {
                    _id: uid,
                    name
                }

                dispatch(eventAddNew(event));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const eventAddNew = (event) => (
    {
        type: types.eventAddNew,
        payload: event
    }
);

export const eventSetActive = (event) => (
    {
        type: types.eventSetActive,
        payload: event
    }
);

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if (!!body.evento) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (e) {
            console.log(e);
        }
    }
}

const eventUpdated = (event) => (
    {
        type: types.eventUpdate,
        payload: event
    }
);

export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        const { id } = getState().calendar.activeEvent;
        try {
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.msg === 'El evento ha sido eliminado') {
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (e) {
            console.log(e);
        }
    }
}

const eventDeleted = () => ({ type: types.eventDelete });

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('events', {}, 'GET');
            const body = await resp.json();

            const eventos = prepareEvents(body.eventos);

            dispatch(eventLoaded(eventos));
        } catch (e) {
            console.log(e);
        }
    }
}

const eventLoaded = (events) => (
    {
        type: types.eventLoaded,
        payload: events
    }
);

export const eventLogout = () => ({ type: types.eventLogout })