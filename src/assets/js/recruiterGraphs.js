/**
 * Main object to be initialized
 * @type {{initialize: Window.recruiterGraphs.initialize, getSize: Window.recruiterGraphs.getSize, parseDataField: Window.recruiterGraphs.parseDataField, dataBuilder: Window.recruiterGraphs.dataBuilder, generateBar: Window.recruiterGraphs.generateBar, generatePie: Window.recruiterGraphs.generatePie, generateScatter: Window.recruiterGraphs.generateScatter, removeGraph: Window.recruiterGraphs.removeGraph, home: {}, data: null, built: Array}}
 */
window.recruiterGraphs = {
  /**
   * Initialize an object by attaching its copy to a "selector"
   * @param selector String, should coincide with an element ID or something usable by
   * @returns {recruiterGraphs}
   */
  initialize: function (selector) {
    var newGraph = Object.create(recruiterGraphs);
    var selected = document.querySelector(selector);

    if (selected) {
      newGraph.home.target = selected;
      newGraph.home.size = newGraph.getSize();
    } else {
      console.log('failed to init on: ' + selector);
    }
    return newGraph;
  },
  /**
   * Gets the size of the containing element for use by the graph
   */
  getSize: function(){
    this.home.height = this.home.target.offsetHeight;
    this.home.width = this.home.target.offsetWidth;
  },
  /**
   * Parses json for specific information to be used by the bar graph
   * @param json The Github data of a user
   * @param target The attribute that you want from the json to be mapped
   * @returns {*}
   */
  parseDataField: function (json, target) {
    var arr = [];
    if(Array.isArray(json)){
      json.forEach(function(item){
        arr.push(item[target]);
      });
    } else if(json[target]) {
      arr.push(json[target]);
    } else {
      return false;
    }
    this.data = arr;
    return arr;
  },
  /**
   * Aggregate all data to be utilized by D3
   * @param user Object
   * @param args Array of Objects in the form of (json, target for parseDataField)
   */
  dataBuilder: function (user, args){
    var name = this.parseDataField(user, "login");
    var original = this;
    var arr = [];
    if(Array.isArray(args)) {
      args.forEach(function(item){
        var parsed = original.parseDataField(user[item[0]], item[1]);
        arr.push(parsed);
      });
    }

    for(var i = 0; i < arr[0].length; i++){
      var val = arr[0][i];
      // console.log(val);
      var obj = {};
      obj[val]= arr[1][i];
      this.built.push(obj);
    }

  },
  /**
   * Generate a bar graph AFTER running dataBuilder
   * @param atts
   * @param built
   */
  generateBar: function (atts, built) {
    var original = this;
    var svg = d3.select(original.home.target).append('svg').attr('width', original.home.width).attr('height', original.home.height);

    svg.selectAll('rect').data(original.built).enter().append('rect')
      .attr('x', function(d,i){  return i * (original.home.width / original.built.length);})
      .attr('y', function(d) {return original.home.height -((d[Object.keys(d)[0]]*10)+1)})
      .attr('width', original.home.width / original.built.length - 3)
      .attr('height', function(d){var out = ((d[Object.keys(d)[0]]*10)+1); return out})
      .attr('fill', "#666");
  },
  /**
   * Pipe bulk data to be processed
   * @param json
   * @param label
   * @param value
   */
  pieData: function(json, label, value){
    var data = [];
    json.forEach(function(item){
      var obj = {};
      obj[label]= item[label];
      obj[value]= item[value];
      data.push(obj)
    });
    // return data;
    this.generatePie(data);
  },
  /**
   * Generate a pie chart
   * @param data Array of Objects
   */
  generatePie: function (data) {

    var w = this.home.width;
    var h = this.home.height;
    var r = Math.min(w, h)/2;

    var color = d3.scaleOrdinal(d3.schemeCategory20c);


    var svg = d3.select(this.home.target)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr('transform', 'translate(' + (w / 2) +  ',' + (h / 2) + ')');

    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(r);

    var pie = d3.pie().value(function(d){return d.size;}).sort(null);

    var path = svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d) {
        return color(d.data.name);
      });
  },
  scatterData: function(json, val1, val2){
    var arr = [];
    var size = 0;
    for(var i = 0; i < json.length; i++){
      console.log((i+1) % 10, size);

      if((i+1) % 10 == 0 ){
        arr.push(size);
        size = 0;
      } else {
        if (json[i].payload.size){
          size += json[i].payload.size;
        }
      }
    }
    var parsed = [];
    for(var k = 0; k < arr.length; k++){
      parsed.push({label: k, value: arr[k]});
    }
    // console.log(arr);
    this.generateScatter(parsed);
  },
  generateScatter: function (data) {

    // data = [{label: 12, value:10}];
    var w = this.home.width;
    var h = this.home.height;
    var svg = d3.select(this.home.target).append('svg').attr('width', w).attr('height', h);

    function setCX(d, i){
      console.log(d);
      if (i == 0){
        console.log('zero');
        return 10
      } else {
        console.log(i*(w/data.length));
        return i*(w/data.length);
      }
    }

    var dots = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr('cx', function(d,i){ return setCX(d,i)})
      .attr('cy', function(d){return h-d.value-5})
      .attr('r', function(d){return 5})
      .attr('fill', '#666');


  },
  removeGraph: function (atts, built) {
    d3.select(this.home.target + 'svg').remove();
  },
  home: {},
  data: null,
  built: []
};
