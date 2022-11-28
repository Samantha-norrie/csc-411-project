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

export function ApexDonut(props) {

        return (
        <div>
            {
                props.topDisplay && 
                <p className="text-container donut-title-padding">{props.caption}</p>
            }
            <Chart className="donut-title-padding" options={props.options} series={props.series} type="pie" width={380}/>
            {
                !props.topDisplay && 
                <p className="text-container donut-title-padding">{props.caption}</p>
            }
        </div>
        );

}

export default ApexDonut;

