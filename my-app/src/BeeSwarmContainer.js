import React from "react";
import BeeSwarmPlain from "./BeeSwarmPlain";

export function BeeSwarmContainer() {
    return (
        <div>
        <div id="svganchor" className="graph centered">
            <BeeSwarmPlain/>
        </div>
            <div id="checkboxes" className="centered">
                <div className="col-md-6">
                <span>Survey Years:&nbsp;&nbsp;</span>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">2017</label>
                <input type="checkbox" value="2017" className="mdl-checkbox__input years" defaultChecked={true}/>

                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">2018</label>
                <input type="checkbox" value="2018" className="mdl-checkbox__input years" defaultChecked={true}/>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">2019</label>
                <input type="checkbox" value="2019" className="mdl-checkbox__input years" defaultChecked={true}/>

                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">2020</label>
                <input type="checkbox" value="2020" className="mdl-checkbox__input years" defaultChecked={true}/>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">2021</label>
                <input type="checkbox" value="2021" className="mdl-checkbox__input years" defaultChecked={true}/>
                </div>
            </div>


            <div id="checkboxes" className="centered">
                <div className="col-md-6"></div>
                <span>Resources:&nbsp;&nbsp;</span>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">Mental Health Benefits</label>
                <input type="checkbox" value="mhb" className="mdl-checkbox__input questions" defaultChecked={true}/>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">Mental Health Benefits</label>
                <input type="checkbox" value="wcoc" className="mdl-checkbox__input questions" defaultChecked={true}/>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">Resources To Learn</label>
                <input type="checkbox" value="rtl" className="mdl-checkbox__input questions" defaultChecked={true}/>
            </div>
        </div>
    );
}
