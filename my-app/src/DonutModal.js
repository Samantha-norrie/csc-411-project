import {React, useState} from 'react';
import Modal from 'react-modal';
import DonutContainer from "./DonutContainer.js";
import * as utils from "./Utils";
import './ModalContainer.css';

function DonutModal() {
    const [isOpen, setOpen] = useState(true);

    function open() {
        setOpen(true);
    }

    function close() {
        setOpen(false);
    }

    function calculate_num_participants() {
        return utils.data_2021.length + utils.data_2020.length + utils.data_2019.length +
        utils.data_2018.length + utils.data_2017.length;
    }
    
    return (
        <div>
            <div className='text-container'>
            <p>
                Total number of participants:
            </p>
            <p>
                {calculate_num_participants()}
            </p>
            </div>
            <h3>
                Total number of participants: {calculate_num_participants()}
            </h3>
            <DonutContainer/>
        </div>
    );
}

export default DonutModal;