import React , { Component} from 'react';
import * as d3 from 'd3';
import DonutChart from './Donut';
import * as utils from "./Utils";

const participantCountData = [
    {name: "2021", value: utils.data_2021.length},
    {name: "2020", value: utils.data_2020.length},
    {name: "2019", value: utils.data_2019.length},
    {name: "2018", value: utils.data_2018.length},
    {name: "2017", value: utils.data_2017.length}
   ]
class DonutContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <>
            <DonutChart data={participantCountData} />
        </>
    }

}
export default DonutContainer;