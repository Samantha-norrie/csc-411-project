import React from "react";
import InteractiveIntroDonuts from "./InteractiveIntroDonuts";
import { Slider } from 'antd';
import './App.css';
import { ClassNames } from "@emotion/react";
import 'antd/dist/antd.min.css';
import * as utils from "./Utils";
import $ from 'jquery';
import * as d3 from 'd3';
import {donutgraph} from 'd3';
import Chart from 'react-apexcharts'
const SERIES = [utils.data_2021.length, utils.data_2020.length ,utils.data_2019.length, utils.data_2018.length, utils.data_2017.length];
const OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["2021", "2020", "2019", "2018", "2017"]
};

class ApexDonut extends React.Component {
    render () {
        return (
            <div>
                <Chart options={this.props.options} series={this.props.series} type="pie" width={380}/>
                <p className="text-container">{this.props.caption}</p>
            </div>
        );
    }

}

export default ApexDonut;

