import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartDeleted, eventStartNew, eventStartUpdated } from '../../actions/eventesCalendar';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');
const after = now.clone().add(1,'hours');

const initEvent = {
    id: new Date().getTime(),
    title: '',
    notes: '',
    start: now.toDate(),
    end: after.toDate(),
    state: 'Atendida',
    client: 'Juan Pablo Saldarriaga'
}

export const CalendarModal = () => {

    const dispatch = useDispatch();

    const {modalOpen} = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(after.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent)

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        activeEvent ? setFormValues(activeEvent) : setFormValues(initEvent)
    }, [activeEvent])

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    }

    const handleStartDateChange = e => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }
    
    const handleEndDateChange = e => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = e => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire(
                'Info',
                'La fecha y hora final debe ser mayor a la de inicio',
                'info'
            )
        }

        if(title.trim().length < 2) {
            return setTitleValid(false);
        }

        if(activeEvent) {
            dispatch(eventStartUpdated(formValues));
        } else {
            dispatch(eventStartNew(formValues))
        }


        setTitleValid(true);
        closeModal();
    }

    const deleteEvent = () => {
        dispatch(eventStartDeleted());
        closeModal();
    }

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-fondo"
                style={customStyles}
            >
    
                <h1> 
                    {
                        activeEvent ? 'Editar Evento' : 'Nuevo evento'
                    } </h1>
                <hr />
                <form 
                    className="container"
                    onSubmit={handleSubmitForm}
                >

                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={handleStartDateChange}
                            value={dateStart}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={handleEndDateChange}
                            value={dateEnd}
                            minDate={dateStart}
                            className="form-control"
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input 
                            type="text" 
                            className={`form-control ${titleValid ? 'is-valid' : 'is-invalid'}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={title}
                            onChange={handleInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea 
                            type="text" 
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={notes}
                            onChange={handleInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <div className="row">
                        {activeEvent ? 
                        <>
                            <div className="col-6">
                                <button
                                    type="submit"
                                    className="btn btn-outline-success w-100"
                                >
                                    <i className="fa fa-sync"></i>
                                    <span> Actualizar</span>
                                </button>
                            </div>
                            <div className="col-6">
                                    <button
                                        className="btn btn-outline-danger w-100"
                                        onClick={deleteEvent}
                                    >
                                        <i className="fa fa-trash"></i>
                                        <span> Eliminar</span>
                                    </button>
                            </div>
                        </>
                        :
                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary w-100"
                                >
                                    <i className="fa fa-save"></i>
                                    <span> Guardar</span>
                                </button>
                            </div>
                        }
                    </div>



                </form>
            </Modal>
        </div>
    )
}
