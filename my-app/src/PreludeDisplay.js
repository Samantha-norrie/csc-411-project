import React, {useState} from "react";
import InteractiveIntroDonuts from "./InteractiveIntroDonuts";
import { Slider } from 'antd';
import './App.css';
import { ClassNames } from "@emotion/react";
import 'antd/dist/antd.min.css';
import * as utils from "./Utils";
import $ from 'jquery';
import * as d3 from 'd3';
import {donutgraph} from 'd3';
import ApexDonut from "./ApexDonut";
import { BeeSwarmContainer } from "./BeeSwarmContainer";

//TODO fix c h a o ti c casing 
const YEAR_SERIES = [utils.data_2021.length, utils.data_2020.length ,utils.data_2019.length, utils.data_2018.length, utils.data_2017.length];
const YEAR_OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["2021", "2020", "2019", "2018", "2017"],
    colors: ['#fa8e8e', '#f84f4f', '#d30909', '#a60707', '#7f0505'],
    legend: {
        labels: {
            colors: ['#ffffff']
        }
    }
};


const GENDER_OPTIONS = {
    chart: {
        width: '100%',
        type: 'pie',
      },
    labels: ["Female", "Male", "Other", "Not Specified"],
    colors: ['#8238a5','#2323bb', '#232391', '#23235e'],
    legend: {
        labels: {
            colors: ['#ffffff']
        }
    }
};
const COMFORT_OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["No", "Maybe", "Yes", "Not Specified"],
    colors:['#5C6288', '#474C6A', '#2f057d', '#45485A'],
    legend: {
        labels: {
            colors: ['#ffffff']
        }
    }
};

const AGE_OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["1-20", "21-40", "41-60", "61-80", "81+", "Not Specified"],
    colors:['#FAFF00', '#D6FE00', '#CCD108', '#A3A611', '#898C0B', '#7E7F48'],
    legend: {
        labels: {
            colors: ['#ffffff']
        }
    }
};

const RACE_OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["White", "Asian", "Black or African American", "Hispanic","More than one of the above", 
    "Not Specified"],
    colors: ['#23d991', '#23a991', '#238b91', '#236c91', '#235691', '#163744'],
    legend: {
        labels: {
            colors: ['#ffffff']
        }
    }
};

const CONTINENT_OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["Africa", "Asia", "North America", "South America", "Europe", "Not Specified"],
    colors: ['#0fbffa', '#1791ba', '#1cb1e3', '#45bfe8', '#69ccec', '#127191'],
    legend: {
        labels: {
            colors: ['#ffffff']
        }
    }
};

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
// $("#graph").donutgraph({
//       data: participantCountData
//     });
function getGenderSeriesData() {
    let female_identifying = 0;
    let male_identifying = 0;
    let other = 0;
    let not_specified = 0
    let json_data_sets = [utils.data_2021, utils.data_2020, utils.data_2019, utils.data_2018, utils.data_2017];
    for(let j = 0; j < json_data_sets.length; j++) {
        for(let i = 0; i < json_data_sets[j].length; i++) {
            let gender = ((json_data_sets[j][i]["What is your gender?"]).toLowerCase()).trim();
            if(gender == "") {
                not_specified = not_specified+1;
            }
            else if(gender === "female" || gender === "f"  || gender === "female-identified" || 
            gender === "woman" || gender === "femmina" || gender === "cis woman" || gender === "cis-woman" || 
            gender ==="female (cisgender)" || gender === "cisgendered woman" || gender === "trans female" || 
            gender === "femail" || gender === "female (cis)") {
                female_identifying = female_identifying +1;
            }
            else if(gender === "male" || gender === "m"  || gender === "male-identified" || 
            gender === "man" || gender === "cis-het man" || gender === "trans man" || gender === "masculino"
            || gender === "cis male" || gender === "cis hetero male") {
                male_identifying = male_identifying +1;
            }
            else {
                other = other+1;
            }
            
        }
    }
    return [female_identifying, male_identifying, other,not_specified];
} 

function getRaceSeriesData() {
    let white = 0;
    let asian = 0;
    let blackOrAfricanAmerican = 0;
    let hispanic = 0;
    let moreThanOneOfTheAbove = 0;
    let not_specified = 0;
    let json_data_sets = [utils.data_2021, utils.data_2020, utils.data_2019, utils.data_2018, utils.data_2017];
    for(let j = 0; j < json_data_sets.length; j++) {
        for(let i = 0; i < json_data_sets[j].length; i++) {
            let race_response = (json_data_sets[j][i]["What is your race?"]);
            if(race_response === "White" || race_response === "Caucasian") {
                white = white+1;
            }
            else if(race_response === "Asian") {
                asian = asian+1;
            }
            else if(race_response === "Black or African American") {
                blackOrAfricanAmerican = blackOrAfricanAmerican+1;
            }
            else if(race_response === "Hispanic") {
                hispanic = hispanic +1;
            }
            else if(race_response === "More than one of the above") {
                moreThanOneOfTheAbove = moreThanOneOfTheAbove +1;
            }
            else {
                not_specified = not_specified+1;
            }
            
        }
    }
    return [white, asian, blackOrAfricanAmerican, hispanic, moreThanOneOfTheAbove, not_specified];
}

function getComfortSeriesData() {
    let no = 0;
    let maybe = 0;
    let yes = 0;
    let not_specified = 0
    let json_data_sets = [utils.data_2021, utils.data_2020, utils.data_2019, utils.data_2018, utils.data_2017];
    for(let j = 0; j < json_data_sets.length; j++) {
        for(let i = 0; i < json_data_sets[j].length; i++) {
            let comfort_response = (json_data_sets[j][i]["Would you feel comfortable discussing a mental health issue with your coworkers?"]);
            if(comfort_response ==="No") {
                no = no+1;
            }
            else if(comfort_response === "Maybe") {
                maybe = maybe+1;
            }
            else if(comfort_response === "Yes") {
                yes = yes +1;
            }
            else {
                not_specified = not_specified+1;
            }
            
        }
    }
    return [no, maybe, yes,not_specified];
}

function getAgeSeriesData() {
    let to_twenty = 0;
    let to_fourty = 0;
    let to_sixty = 0;
    let not_specified = 0;
    let to_eighty = 0;
    let beyond = 0
    let json_data_sets = [utils.data_2021, utils.data_2020, utils.data_2019, utils.data_2018, utils.data_2017];
    for(let j = 0; j < json_data_sets.length; j++) {
        for(let i = 0; i < json_data_sets[j].length; i++) {
            let age_response = (json_data_sets[j][i]["What is your age?"]);
            if(age_response <= 20) {
                to_twenty = to_twenty+1;
            }
            else if(age_response <= 40) {
                to_fourty = to_fourty+1;
            }
            else if(age_response <= 60) {
                to_sixty = to_sixty +1;
            }
            else if(age_response <= 80) {
                to_eighty = to_eighty +1;
            }
            else if(age_response > 80) {
                beyond= beyond +1;
            }
            else {
                not_specified = not_specified+1;
            }
            
        }
    }
    return [to_twenty, to_fourty, to_sixty, to_eighty, beyond,not_specified];
}

//TODO I'm down to reorganize this if we have time to do some code clean up
function getContinentSeriesData() {
    let afghanistan = 0;
    let albania = 0;
    let algeria = 0;
    let austrailia = 0;
    let austria = 0;
    let bangladesh = 0;
    let belarus = 0;
    let belgium = 0;
    let brazil = 0;
    let bulgaria = 0;
    let cameroon = 0;
    let canada = 0;
    let chile = 0;
    let china = 0;
    let colombia = 0;
    let croatia = 0;
    let egypt = 0;
    let estonia = 0;
    let finland = 0;
    let france = 0;
    let ghana = 0;
    let germany = 0;
    let greece = 0;
    let hongKong = 0;
    let iceland = 0;
    let india = 0;
    let indonesia = 0;
    let ireland = 0;
    let israel = 0;
    let italy = 0;
    let japan = 0;
    let kenya = 0;
    let macedonia = 0;
    let malaysia = 0;
    let mexico = 0;
    let mongolia = 0;
    let netherlands = 0;
    let newZealand = 0;
    let nigeria = 0;
    let norway = 0;
    let pakistan = 0;
    let philippines = 0;
    let poland = 0;
    let portugal= 0;
    let russia = 0;
    let saoTomeAndPrincipe = 0;
    let serbia = 0;
    let slovenia = 0;
    let southAfrica = 0;
    let spain = 0;
    let sriLanka = 0;
    let sweden = 0;
    let switzerland = 0;
    let taiwan = 0;
    let turkey = 0;
    let ukraine = 0;
    let unitedKingdom = 0;
    let vietnam = 0;

    let oceania = 0;
    let na = 0;
    let sa = 0;
    let asia = 0;
    let eur = 0;
    let africa = 0;

    let usa = 0;
    let not_specified = 0
    let json_data_sets = [utils.data_2021, utils.data_2020, utils.data_2019, utils.data_2018, utils.data_2017];
    for(let j = 0; j < json_data_sets.length; j++) {
        for(let i = 0; i < json_data_sets[j].length; i++) {
            let country = (json_data_sets[j][i]["What country do you *live* in?"]);
            if(country === "United States of America") {
                na = na +1;
            }
            else if(country === "Afghanistan") {
                asia = asia + 1;
            }
            else if(country === "Albania") {
                eur = eur+1;
            }
            else if(country === "Algeria") {
                africa = africa+1;
            }
            else if(country === "Austrailia") {
                oceania = oceania + 1;
            }     
            else if(country === "Austria") {
                eur = eur+1;
            }
            else if(country === "Bangladesh") {
                asia = asia + 1;
            }
            else if(country === "Belgium") {
                eur = eur+1;
            }
            else if(country === "Belarus") {
                eur = eur+1;
            }
            else if(country === "Brazil") {
                sa = sa + 1;
            }
            else if(country === "Bulgaria") {
                eur = eur+1;
            }
            else if(country === "Cameroon") {
                africa = africa+1;
            }
            else if(country === "Chile") {
                sa = sa + 1;
            }
            else if(country === "China") {
                asia = asia + 1;
            }
            else if(country === "Colombia") {
                sa = sa + 1;
            }
            else if(country === "Croatia") {
                eur = eur+1;
            }
            else if(country === "Egypt") {
                africa = africa+1;
            }
            else if(country === "Estonia") {
                eur = eur+1;
            }
            else if(country === "Finland") {
                eur = eur+1;
            }
            else if(country === "France") {
                eur = eur+1;
            }
            else if(country === "Ghana") {
                africa = africa+1;
            }
            else if(country === "Greece") {
                eur = eur+1;
            }
            else if(country === "Hong Kong") {
                asia = asia + 1;
            }
            else if(country === "Iceland") {
                eur = eur+1;
            }
            else if(country === "India") {
                asia = asia + 1;
            }
            else if(country === "Indonesia") {
                asia = asia + 1;
            }
            else if(country === "Ireland") {
                eur = eur+1;
            }
            else if(country === "Israel") {
                asia = asia + 1;
            }
            else if(country === "Italy") {
                eur = eur+1;
            }
            else if(country === "Japan") {
                asia = asia + 1;
            }
            else if(country === "Kenya") {
                africa = africa+1;
            }
            else if(country === "Macedonia") {
                eur = eur+1;
            }
            else if(country === "Malaysia") {
                asia = asia + 1;
            }
            else if(country === "Mexico") {
                na = na+1;
            }
            else if(country === "Mongolia") {
                asia = asia + 1;
            }
            else if(country === "Netherlands") {
                eur = eur+1;
            }
            else if(country === "New Zealand") {
                oceania = oceania+1;
            }
            else if(country === "Nigeria") {
                africa = africa+1;
            }
            else if(country === "Norway") {
                eur = eur+1;
            }
            else if(country === "Pakistan") {
                asia = asia + 1;
            }
            else if(country === "Philippines") {
                asia = asia + 1;
            }
            else if(country === "Poland") {
                eur = eur+1;
            }
            else if(country === "Portugal") {
                eur = eur+1;
            }
            else if(country === "Russia") {
                asia = asia + 1;
            }
            else if(country === "Sao Tome and Principe") {
                africa = africa+1;
            }
            else if(country === "Serbia") {
                eur = eur+1;
            }
            else if(country === "Slovenia") {
                eur = eur+1;
            }
            else if(country === "South Africa") {
                sa = sa+1;
            }
            else if(country === "Spain") {
                eur = eur+1;
            }
            else if(country === "Sri Lanka") {
                asia = asia + 1;
            }
            else if(country === "Sweden") {
                eur = eur+1;
            }
            else if(country === "Switzerland") {
                eur = eur+1;
            }
            else if(country === "Taiwan") {
                asia = asia + 1;
            }
            else if(country === "Turkey") {
                eur = eur+1;
            }
            else if(country === "Canada") {
                na = na+1;
            }
            else if(country === "Germany") {
                eur = eur+1;
            }
            else if(country === "Ukraine") {
                eur = eur+1;
            }
            else if(country === "United Kingdom") {
                eur = eur+1;
            }
            else if(country === "Vietnam") {
                asia = asia + 1;
            }
            else {
                not_specified = not_specified+1;
            }
            
        }
    }

    return [africa, asia, na, sa, eur, not_specified]
}
export function PreludeDisplay(props){
    const [displayInitialPage, setDisplayInitialPage] = useState(true);
    const [displayBeeSwarm, setDisplayBeeSwarm] = useState(false);
    const [prelude, setPrelude] = useState(true)

    const setDisplay = () => {
        setDisplayInitialPage(false);
    }

    const setBeeSwarm = () => {
        setDisplayBeeSwarm(true);
    }
    const changePage = () => {
        window.location.replace("index11.html");
    } 
    return (
        <>
            {
                (prelude && displayInitialPage && !displayBeeSwarm) && 
                <div id="prelude-grid-container">

                <h1 className="text-container donut-title-padding">
                    {calculate_num_participants()} tech workers came together
                </h1>
                <div id="donut-one">
                <ApexDonut
                    series={YEAR_SERIES}
                    options={YEAR_OPTIONS}
                    topDisplay
                    caption={"Participants Surveyed Per Year"}
                ></ApexDonut>
                </div>
                <div id="osmi-logo">
                <img src="https://osmihelp.org/assets/img/osmi-logo-big.png" width="200" height="200"/>
                </div>
                <div id="donut-two">
                <ApexDonut
                    series={getGenderSeriesData()}
                    options={GENDER_OPTIONS}
                    topDisplay
                    caption={"Participant Gender"}
                ></ApexDonut>
                </div>
                <div id="donut-three">
                <ApexDonut
                    series={getRaceSeriesData()}
                    options={RACE_OPTIONS}
                    caption={"Participant Race"}
                ></ApexDonut>
                </div>
                <div id="donut-four">
                    <ApexDonut
                        series={getContinentSeriesData()}
                        options={CONTINENT_OPTIONS}
                        caption={"Participant Continents"}
                    ></ApexDonut>
                </div>
                <div id="donut-five">
                    <ApexDonut
                        series={getAgeSeriesData()}
                        options={AGE_OPTIONS}
                        caption={"Participant Age Ranges"}
                    ></ApexDonut>
                </div>
                <div id="button-container">
                    <button onClick={setDisplay}>See what happened</button>
                </div>
                <h2 className="text-container" id="bottom-text">to answer questions about their mental health... </h2>
            </div>
            }
            {
                (prelude && !displayInitialPage && !displayBeeSwarm) &&
                <div className="prelude-comfort-state-page">
                    <h1 className="text-container">...only to find that they do not discuss it nearly enough.</h1>
                    <ApexDonut
                    series={getComfortSeriesData()}
                    options={COMFORT_OPTIONS}

                    caption={"\'Would you feel comfortable discussing a mental health issue with your coworkers?\'"}
                    ></ApexDonut>
                    <button onClick={setBeeSwarm}><h2><strong>Let's talk about our mental health.</strong></h2></button>
                </div>
            }
            {
                (prelude && displayBeeSwarm && !displayInitialPage) &&
                <BeeSwarmContainer/>
            }
            {/* <input type="button" value="create page" onclick="location.href='index.html'"/> */}
            
        </>
    );
}
export default PreludeDisplay;