import React, { useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import {messages} from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
moment.locale('es');

const localizer = momentLocalizer(moment);

const events = {
    title: 'Cumpleaños',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#FAAAAA',
    notes:'Cita comestologa',
    user: {
        _id: 123,
        name: 'Viviana'
    },
    client: 'Juan Pablo'
}

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = e => {
        console.log(e)
    }

    const onSelectEvent = e => {
        console.log(e)
    }
    
    const onViewChange = e => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    const eventsStyleGetter = (event, start, end, isSelected) => {

        console.log(event, start, end, isSelected)

        const style = {
            backgroundColor: '#367FC7',
            color: 'white',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block'
        }

        return {
            style
        }

    }

    return (
        <div className="calendar-screen">
            <Navbar/>
            <Calendar
                localizer={localizer}
                events={[events]}
                startAccesor="start"
                endAccesor="end"
                messages={messages}
                eventPropGetter={eventsStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal/>
        </div>
    )
}
