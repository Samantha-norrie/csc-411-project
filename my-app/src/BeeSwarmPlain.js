import React , { Component} from 'react';
import * as d3 from 'd3';
import { data_2021, data_2020, data_2019, data_2018, data_2017 } from './Utils.js'
import "./BeeSwarm.css";
const mhData = [
        {"2021": data_2021},
        {"2020": data_2020},
        {"2019": data_2019},
        {"2018": data_2018},
        {"2017": data_2017} //WE HAVE A LOT OF DATA
]    

const question1 = "Does your employer provide mental health benefits as part of healthcare coverage?";
const question1alt = "Does your employer provide mental health benefits\u00a0as part of healthcare coverage?";
const question2 = "Has your employer ever formally discussed mental health (for example, as part of a wellness campaign or other official communication)?";
const question3 = "Does your employer offer resources to learn more about mental health disorders and options for seeking help?";

const BeeSwarmPlain = () => {
  var d = mhData;
  const svgRef = React.useRef(null);
  let height = 400;
  let width = 1200;
  let margin = ({top: 0, right: 40, bottom: 34, left: 40});
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom
  React.useEffect(() => {
    try {

      let dataSet = d;
      let en3s = []; // HOLDS DATA AS AN ARRAY OF OBJECTS "entries"
  
          for (const [index, yearData] of Object.entries(dataSet)) {
              for (const [year, entries] of Object.entries(yearData)) {
                  // console.log(year)
                  for (const entry of entries) {
  
                      var temp_obj = {"year": year};
                      temp_obj["id"] = entry["#"];
  
                      //GATHER ANSWERS FOR MHB
                      var q1 = question1;
                      if (entry[question1] == undefined){
                          q1 = question1alt;
                      } //2017 has a different question string wise
  
                      if (entry[q1] == "Yes" || entry[q1] == 1) {
                          temp_obj["question"] = "mhb" 
                          temp_obj["answer"] = "yes";
                      } else if (entry[q1] == "No" || entry[q1] == 0) {
                          temp_obj["question"] = "mhb" 
                          temp_obj["answer"] = "no";
                      } else {
                          temp_obj["question"] = "mhb" 
                          temp_obj["answer"] = "maybe";
                      } en3s.push(temp_obj);
  
                      var temp_obj2 = {"year": year};
                      temp_obj2["id"] = entry["#"];
                      
                      //GATHER ANSWERS FOR wcoc
                      if (entry[question2] == "Yes" || entry[question2] == 1) {
                          temp_obj2["question"] = "wcoc" 
                          temp_obj2["answer"] = "yes";
                      } else if (entry[question2] == "No" || entry[question2] == 0) {
                          temp_obj2["question"] = "wcoc" 
                          temp_obj2["answer"] = "no";
                      } else {
                          temp_obj2["question"] = "wcoc" 
                          temp_obj2["answer"] = "maybe";
                      } en3s.push(temp_obj2);
  
                      var temp_obj3 = {"year": year};
                      temp_obj3["id"] = entry["#"];
                      
                      //GATHER ANSWERS FOR RTL
                      if (entry[question3] == "Yes" || entry[question3] == 1) {
                          temp_obj3["question"] = "rtl"
                          temp_obj3["answer"] = "yes";
                      } else if (entry[question3] == "No" || entry[question3] == 0) {
                          temp_obj3["question"] = "rtl"
                          temp_obj3["answer"] = "no";
                      } else {
                          temp_obj3["question"] = "rtl"
                          temp_obj3["answer"] = "maybe";
                      } en3s.push(temp_obj3);
                      
                  }                
              }   
            }
          //   console.log(en3s)
            
            // Colors used for circles depending on question type
            let colors = d3.scaleOrdinal()
              .domain(["rtl", "mhb", "wcoc"])
              .range(["#e41a1c", "#377eb8", "#4daf4a"]); 
                      
            let svg = d3.select("#svganchor")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
  
          let qs = Array.from(new Set(dataSet.map((d) => d.question)));
          let yrs = Array.from(new Set(dataSet.map((d) => Object.keys(d)[0])));    
          console.log(parseFloat(yrs[yrs.length-1]))
          let xScale = d3.scaleLinear()
                .domain([parseFloat(yrs[yrs.length-1])-1, parseFloat(yrs[0])+1])
                .range([margin.left, width - margin.right]);
            
          let yScale = d3.scaleLinear()
                .domain([0,3])
                .range([height, margin.bottom]);
  
          svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height - margin.bottom) + ")");
  
          //Y AXIS LABELS
          svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", 25)
                .attr("x", -15)
                .attr("dy", ".75em")
                .attr("font-weight", "bold")
                .attr("font-size", "24px")
                .attr("word-spacing", "60")
                .attr("transform", "rotate(-90)")
                .text("NO MAYBE YES");
          
          //initializa tooltip
          let tooltip = d3.select("#svganchor").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);      
      
      let backup_data = JSON.parse(JSON.stringify(en3s));          
      d3.selectAll("input").on("change", filter); //IF CHECKBOX IS CHECKED, FILTER DATA
      draw();
  
      function draw() {
          let xAxis;
          let xmin = 3000; let xmax = 0;
  
          for(let a = 0; a<en3s.length; a++){
              if(parseFloat(en3s[a].year) > xmax){
                  xmax = parseFloat(en3s[a].year);
              }
              if(parseFloat(en3s[a].year) < xmin){
                  xmin = parseFloat(en3s[a].year);
              }
              a++;
          }
          let ticknum = getCheckedBoxes('.years').length;
          if(ticknum != 0){
              ticknum = ticknum + 3;
          } else {
              ticknum = 8;
          }    
  
          xAxis = d3.axisBottom(xScale)
              .ticks(ticknum)
              .tickSizeOuter(0)
              .tickFormat(d3.format("d"));
              
          xScale = d3.scaleLinear()
              .domain([xmin-1, xmax+1])
              .range([margin.left, width - margin.right]);    
  
          d3.transition(svg).select(".x.axis")
              .transition()
              .duration(1000)
              .call(xAxis);
          // Create country circles
          let entryBee = svg.selectAll(".entries")
              .data(en3s, function(d) { return d.question });
  
              let simulation = d3.forceSimulation(en3s)
              // Apply positioning force to push nodes towards desired position along X axis
              .force("x", d3.forceX(function(d) {
                  return xScale(d.year);
              }).strength(2))//Increase velocity
              .force("y", d3.forceY(function(d) {
                  var y = d.answer;
                  var yscl = 0;
                  if (y == "yes") {
                      yscl = 1;
                  } else if (y == "no") {
                      yscl = 2;
                  }    
                  else {
                      yscl = 3;
                  }        
                  return yScale(yscl);
              }))  // // Apply positioning force to push nodes along Y axis
              .force("collide", d3.forceCollide(9))
              .stop();  // Stop simulation from starting automatically
  
          // Manually run simulation
          for (let i = 0; i < dataSet.length/10; ++i) {
              simulation.tick(10);
          }
              
          entryBee.exit()
              .transition()
              .duration(1000)
              .attr("cx", 0)
              .attr("cy", (height / 2) - margin.bottom / 2)
              .remove();
          entryBee.enter()
              .append("circle")
              .attr("class", "entries")
              .attr("cx", 0)
              .attr("cy", (height / 2) - margin.bottom / 2)
              .attr("r", 4)
              .attr("fill", function(d){
                  return colors(d.question)})
              .merge(entryBee)
              .transition()
              .duration(2000)
              .attr("cx", (d) => xScale(parseFloat(d.year)+(Math.random()-0.5)/2))  
              .attr("cy", (d) => {
                  var y = d.answer;
                  var yscl = 0;
                  if (y == "yes") {
                      yscl = 3;
                  } else if (y == "no") {
                      yscl = 1;
                  }    
                  else {
                      yscl = 2;
                  }        
                  return yScale(yscl+(Math.random()-0.5)/2);
              })
  
  
              d3.selectAll(".entries").on("mousemove", function(d) {
                  console.log(d)
                  var q;
                  switch(d.srcElement.__data__.question){
                      case "rtl":
                          q = "Resource To Learn";
                      case "mhb":
                          q = "Mental Health Benefits";
                      case "wcoc":
                          q = "Wellness Campaign / Official Communication";        
                  }
                  tooltip.html(`YEAR: <strong>${d.srcElement.__data__.year}</strong><br>
                                 <strong>${q}</strong><br>
                                 <strong>${d.srcElement.__data__.answer}</strong><br>`)
                      .style('top', String(d.screenY - 12) + 'px')
                      .style('left', String(d.screenX + 25) + 'px')
                      .style("opacity", 0.9);
              }).on("mouseout", function(_) {
                  tooltip.style("opacity", 0);
              });
              
  
      }
      
      //Get current checked boxes
      function getCheckedBoxes(checkboxName) {
          let checkboxes = d3.selectAll(checkboxName).nodes(); //array returning checkbox html elements
          let checkboxesChecked = [];
          for (let i = 0; i < checkboxes.length; i++) {
              if (checkboxes[i].checked) {
                  checkboxesChecked.push(checkboxes[i].value);
              }
          }
          return checkboxesChecked.length >= 0 ? checkboxesChecked : null
      }
  
      // Filter data based on which checkboxes are ticked
      function filter() {
  
          let checkedQs = getCheckedBoxes('.questions');
          let checkedYrs = getCheckedBoxes('.years');
          
          if (checkedQs == null && checkedYrs == null) {
              return;
          }
          let newData = JSON.parse(JSON.stringify(backup_data));
          for (let j = 0; j < newData.length; j++){
              if (newData[j] !== undefined && !checkedQs.includes(newData[j].question)){
                  newData.splice(j,1);
                  j--;
              }
              if (newData[j] !== undefined && !checkedYrs.includes(newData[j].year)){
                  newData.splice(j,1);
                  j--;
              }
          }
          en3s = newData;
          draw();
      }
  
  } catch( error) {
      if (error) throw error;
  };
  })
  return <svg id="chart3" ref={svgRef} width={svgWidth} height={svgHeight}/>;
}

export default BeeSwarmPlain;