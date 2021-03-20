import React, { useEffect, useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import {messages} from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventStartLoading } from '../../actions/eventesCalendar';
import { AddNewFab } from '../ui/AddNewFab';
moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const {events} = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch])

    const onSelectEvent = e => {
        console.log(e)
        dispatch(eventSetActive(e));
        dispatch(uiOpenModal());
    }
    
    const onViewChange = e => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    const eventsStyleGetter = ({state}) => {

        if (state) {
            let backgroundColor;
            let color;
    
            if (state === 'Asignada') {
                backgroundColor = '#0D6EFD';
                color = 'white';
            } else if (state === 'Atendida') {
                backgroundColor = '#198754';
                color = 'white';
            } else if (state === 'Confirmada') {
                backgroundColor = '#FFC107';
                color = 'black';
            } else if (state === 'Cancelada') {
                backgroundColor = '#DC3545';
                color = 'white';
            }
    
            const style = {
                backgroundColor,
                color,
                borderRadius: '0px',
            }
    
            return {
                style
            }
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccesor="start"
                endAccesor="end"
                messages={messages}
                eventPropGetter={eventsStyleGetter}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
                <AddNewFab/>
            <CalendarModal/>
        </div>
    )
}
