import {React, useState} from 'react';
import Modal from 'react-modal';
import DonutContainer from "./DonutContainer.js";
import * as utils from "./Utils";
import Slider from '@mui/material/Slider';
import './ModalContainer.css';

function InteractiveIntroDonuts() {

    function calculate_num_participants() {
        return utils.data_2021.length + utils.data_2020.length + utils.data_2019.length +
        utils.data_2018.length + utils.data_2017.length;
    }
    const slider_func = () => {
        <Slider defaultValue={30} step={10} marks min={10} max={110}/>
    }
    
    return (
        <div className='interactive-intro-donuts-container'>
            <div className='text-container'>
            <p>
                Total number of participants:
            </p>
            <p>
                {calculate_num_participants()}
            </p>
            </div>
            <DonutContainer/>
            <div className='slider-container text-container'>
                <button>Prev</button>
                <button>Next</button>
            </div>
        </div>
    );
}

export default InteractiveIntroDonuts;