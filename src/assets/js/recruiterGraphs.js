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
        json.forEach(function(item){
            Object.byString = function(o, s) {
                s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
                s = s.replace(/^\./, '');           // strip a leading dot
                var a = s.split('.');
                for (var i = 0, n = a.length; i < n; ++i) {
                    var k = a[i];
                    if (k in o) {
                        o = o[k];
                    } else {
                        return;
                    }
                }
                return o;
            };

            var nudate = new Date(item[val1]);


            arr.push({date: nudate, value1: nudate, value2: Object.byString(item, val2)});

            console.log(arr);
        });
        // console.log(json[val1], val1);
    },
    generateScatter: function (data) {

        data = [{label: 12, value:10}];
        var w = this.home.width;
        var h = this.home.height;
        var svg = d3.select('body').append('svg').attr('width', w).attr('height', h);

        var dots = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr('cx', function(d){return d.label*3})
            .attr('cy', function(d){return h-d.value})
            .attr('r', function(d){return 5})
            .attr('fill', '#666')


    },
    removeGraph: function (atts, built) {
    },
    home: {},
    data: null,
    built: []
};
