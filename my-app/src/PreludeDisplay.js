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

//TODO fix c h a o ti c casing 
const YEAR_SERIES = [utils.data_2021.length, utils.data_2020.length ,utils.data_2019.length, utils.data_2018.length, utils.data_2017.length];
const YEAR_OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["2021", "2020", "2019", "2018", "2017"]
};


const GENDER_OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["Female", "Male", "Other", "Not Specified"]
};
const COMFORT_OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["No", "Maybe", "Yes", "Not Specified"],
    colors:['#8a1b15', '#913530', '#2f057d', '#4d3534']
};

const RACE_OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["White", "Asian", "Black or African American", "Hispanic","More than one of the above", 
    "Not Specified"]
};

const COUNTRY_OPTIONS = {
    chart: {
        width: 380,
        type: 'pie',
      },
    labels: ["Afghanistan", "Albania", "Algeria", "Austrailia", "Austria", "Bangladesh", 
    "Belgium", "Belarus", "Brazil", "Bulgaria", "Cameroon", "Canada", "Chile", "China", "Colombia",
    "Croatia", "Egypt", "Estonia", "Finland", "France", "Ghana", "Germany", "Greece", "Hong Kong", "Iceland",
    "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Macedonia", "Malaysia",
    "Mexico", "Mongolia", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Philippines",
    "Poland", "Portugal", "Russia", "Sao Tome and Principe", "Serbia", "Slovenia", "South Africa", "Spain",
    "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Turkey", "Ukraine", "United Kingdom", "United States",
    "Vietnam", "Not Specified"]
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

//TODO I'm down to reorganize this if we have time to do some code clean up
function getCountrySeriesData() {
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

    let usa = 0;
    let not_specified = 0
    let json_data_sets = [utils.data_2021, utils.data_2020, utils.data_2019, utils.data_2018, utils.data_2017];
    for(let j = 0; j < json_data_sets.length; j++) {
        for(let i = 0; i < json_data_sets[j].length; i++) {
            let country = (json_data_sets[j][i]["What country do you *live* in?"]);
            if(country === "United States of America") {
                usa = usa+1;
            }
            else if(country === "Afghanistan") {
                afghanistan = afghanistan+1;
            }
            else if(country === "Albania") {
                albania = albania+1;
            }
            else if(country === "Algeria") {
                algeria = algeria+1;
            }
            else if(country === "Austrailia") {
                austrailia = austrailia+1;
            }     
            else if(country === "Austria") {
                austria = austria+1;
            }
            else if(country === "Bangladesh") {
                bangladesh = bangladesh+1;
            }
            else if(country === "Belgium") {
                belgium = belgium+1;
            }
            else if(country === "Belarus") {
                belarus = belarus+1;
            }
            else if(country === "Brazil") {
                brazil = brazil+1;
            }
            else if(country === "Bulgaria") {
                bulgaria = bulgaria+1;
            }
            else if(country === "Cameroon") {
                cameroon = cameroon+1;
            }
            else if(country === "Chile") {
                chile = chile+1;
            }
            else if(country === "China") {
                china = china+1;
            }
            else if(country === "Colombia") {
                colombia = colombia+1;
            }
            else if(country === "Croatia") {
                croatia = croatia+1;
            }
            else if(country === "Egypt") {
                egypt = egypt+1;
            }
            else if(country === "Estonia") {
                estonia = estonia+1;
            }
            else if(country === "Finland") {
                finland = finland+1;
            }
            else if(country === "France") {
                france = france+1;
            }
            else if(country === "Ghana") {
                ghana = ghana+1;
            }
            else if(country === "Greece") {
                greece = greece+1;
            }
            else if(country === "Hong Kong") {
                hongKong = hongKong+1;
            }
            else if(country === "Iceland") {
                iceland = iceland+1;
            }
            else if(country === "India") {
                india = india+1;
            }
            else if(country === "Indonesia") {
                indonesia = indonesia+1;
            }
            else if(country === "Ireland") {
                ireland = ireland+1;
            }
            else if(country === "Israel") {
                israel = israel+1;
            }
            else if(country === "Italy") {
                italy = italy+1;
            }
            else if(country === "Japan") {
                japan = japan+1;
            }
            else if(country === "Kenya") {
                kenya = kenya+1;
            }
            else if(country === "Macedonia") {
                macedonia = macedonia+1;
            }
            else if(country === "Malaysia") {
                malaysia = malaysia+1;
            }
            else if(country === "Mexico") {
                mexico = mexico+1;
            }
            else if(country === "Mongolia") {
                mongolia = mongolia+1;
            }
            else if(country === "Netherlands") {
                netherlands = netherlands+1;
            }
            else if(country === "New Zealand") {
                southAfrica = southAfrica+1;
            }
            else if(country === "Nigeria") {
                nigeria = nigeria+1;
            }
            else if(country === "Norway") {
                norway = norway+1;
            }
            else if(country === "Pakistan") {
                pakistan = pakistan+1;
            }
            else if(country === "Philippines") {
                philippines = philippines+1;
            }
            else if(country === "Poland") {
                poland = poland+1;
            }
            else if(country === "Portugal") {
                portugal = portugal+1;
            }
            else if(country === "Russia") {
                russia = russia+1;
            }
            else if(country === "Sao Tome and Principe") {
                saoTomeAndPrincipe = saoTomeAndPrincipe+1;
            }
            else if(country === "Serbia") {
                serbia = serbia+1;
            }
            else if(country === "Slovenia") {
                slovenia = slovenia+1;
            }
            else if(country === "South Africa") {
                southAfrica = southAfrica+1;
            }
            else if(country === "Spain") {
                spain = spain+1;
            }
            else if(country === "Sri Lanka") {
                sriLanka = sriLanka+1;
            }
            else if(country === "Sweden") {
                sweden = sweden+1;
            }
            else if(country === "Switzerland") {
                switzerland = switzerland+1;
            }
            else if(country === "Taiwan") {
                taiwan = taiwan+1;
            }
            else if(country === "Turkey") {
                turkey = turkey+1;
            }
            else if(country === "Canada") {
                canada = canada+1;
            }
            else if(country === "Germany") {
                germany = germany+1;
            }
            else if(country === "Ukraine") {
                ukraine = ukraine+1;
            }
            else if(country === "United Kingdom") {
                unitedKingdom = unitedKingdom+1;
            }
            else if(country === "Vietnam") {
                vietnam = vietnam+1;
            }
            else {
                not_specified = not_specified+1;
            }
            
        }
    }
    return [afghanistan, albania, algeria, austrailia, austria, bangladesh, belarus, belgium,brazil,
    bulgaria, cameroon, canada, chile, china, colombia, croatia, egypt, estonia, finland, france, ghana,
germany, greece, hongKong, iceland, india, indonesia, israel, italy, japan, kenya, macedonia, malaysia, mongolia,
netherlands, newZealand, nigeria, norway, pakistan, philippines, poland, portugal, russia, saoTomeAndPrincipe, serbia, slovenia,
southAfrica, spain, sriLanka, sweden, switzerland, taiwan, turkey, ukraine, unitedKingdom, usa, vietnam, not_specified];
}
export function PreludeDisplay(props){
    const [displayInitialPage, setDisplayInitialPage] = useState(true);

    const setDisplay = () => {
        setDisplayInitialPage(false);
    }
    return (
        <>
            {
                displayInitialPage && 
                <div id="prelude-grid-container">
                <h1 className="text-container">
                    {calculate_num_participants()} tech workers came together
                </h1>
                <div id="donut-one">
                <ApexDonut
                    series={YEAR_SERIES}
                    options={YEAR_OPTIONS}
                    caption={"Participants Surveyed Per Year"}
                ></ApexDonut>
                </div>
                <div id="donut-two">
                <ApexDonut
                    series={getGenderSeriesData()}
                    options={GENDER_OPTIONS}
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
                        series={getCountrySeriesData()}
                        options={COUNTRY_OPTIONS}
                        caption={"Participant Countries"}
                    ></ApexDonut>
                </div>
                <div id="button-container">
                    <button onClick={setDisplay}>See what happened</button>
                </div>
                <h2 className="text-container" id="bottom-text">to answer questions about their mental health... </h2>
            </div>
            }
            {
                !displayInitialPage &&
                <div className="prelude-comfort-state-page">
                    <ApexDonut
                    series={getComfortSeriesData()}
                    options={COMFORT_OPTIONS}
                    caption={"Would you feel comfortable discussing a mental health issue with your coworkers?"}
                    ></ApexDonut>
                    <h1 className="text-container">Let's talk about our mental health.</h1>
                </div>
            }
        </>
    );
}
export default PreludeDisplay;