import React , { Component} from 'react';
import * as d3 from 'd3';
import './App.css';
import DonutChart from './Donut';
import * as utils from "./Utils";

const participantCountData = [
    {name: "2021", value: utils.data_2021.length},
    {name: "2020", value: utils.data_2020.length},
    {name: "2019", value: utils.data_2019.length},
    {name: "2018", value: utils.data_2018.length},
    {name: "2017", value: utils.data_2017.length}
   ]
function calculate_num_participants() {
    return utils.data_2021.length + utils.data_2020.length + utils.data_2019.length +
    utils.data_2018.length + utils.data_2017.length;
}
class ParticipantDonutContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className='donut-container'>
            <div className='text-container'>
                <p>
                    Total number of participants: {calculate_num_participants()}
                </p>
            </div>
            <DonutChart data={participantCountData} />
        </div>
    }

}
export default ParticipantDonutContainer;