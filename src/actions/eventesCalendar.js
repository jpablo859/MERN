import { types } from "../types/types";
import { fetchToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from "sweetalert2";

export const eventStartNew = event => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {

            const resp = await fetchToken('events', event, 'POST');
            const body = await resp.json();
    
            if(body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name
                }
                dispatch(eventAddNew(event));
            }
        } catch(err) {
            console.log(err)
        }
    }
}

const eventAddNew = event => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = event => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
})

export const eventStartUpdated = event => {
    return async dispatch => {
        try {
            const resp = await fetchToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if(body.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch(err) {
            console.log(err)
        }
    }
}

const eventUpdated = event => ({
    type: types.eventUpdated,
    payload: event
})

export const eventStartDeleted = () => {
    return async (dispatch, getState) => {
        const {id} = getState().calendar.activeEvent;
        try {
            const resp = await fetchToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
                        
            if(body.ok) {
                dispatch(eventDeleted(id));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const eventDeleted = event => ({
    type: types.eventDeleted,
    payload: {
        id: event
    }
})

export const eventStartLoading = () => {
    return async dispatch => {
        try {
            const resp = await fetchToken('events');
            const body = await resp.json();

            const events = prepareEvents(body.events);

            console.log(events)

            if(body.ok) {
                dispatch(eventLoaded(events))
            }

        } catch(err) {
            console.log(err)
        }
    }
}

const eventLoaded = events => ({
    type: types.eventLoaded,
    payload: events
})
