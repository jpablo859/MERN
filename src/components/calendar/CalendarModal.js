import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker'
import { useState } from 'react';
import Swal from 'sweetalert2';

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

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(after.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: after.toDate()
    })

    const { title, notes, start, end } = formValues;

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        
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

        setTitleValid(true);
        closeModal();
    }

    return (
        <div>
            <Modal
                isOpen={true}
                onRequestClose={closeModal}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-fondo"
                style={customStyles}
            >
    
                <h1> Nuevo evento </h1>
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

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
            </Modal>
        </div>
    )
}
