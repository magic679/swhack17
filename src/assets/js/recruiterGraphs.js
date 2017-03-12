var recruiterGraphs = {
    /**
     * Set object so that it works in an are of  the screen
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
    getSize: function(){
        this.home.height = this.home.target.offsetHeight;
        this.home.width = this.home.target.offsetWidth;
    },
    /**
     * Select the desired data field from a json object to display
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
     *
     * @param json
     * @param label
     * @param relation
     * @param value
     */
    generatePie: function (data) {

        // var data = this.pieData(json, label, value);
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
    generateScatter: function (atts, built) {
    },
    removeGraph: function (atts, built) {
    },
    home: {},
    data: null,
    built: []
};
