import React from 'react'

export const CalendarEvent = ({event:{title, client}}) => {
    return (
        <div>
            <span>{title} </span>
            <strong>{client} </strong>
            <span>con Carmen</span>
        </div>
    )
}
