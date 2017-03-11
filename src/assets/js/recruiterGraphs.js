/**
 * Object that will control the creation & destruction of graphs in the recruiter dashboard
 */
window.recruiterGraphs = {
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
            .attr('y', function(d) {return original.home.height -(d[Object.keys(d)[0]]*10)})
            .attr('width', original.home.width / original.built.length - 3)
            .attr('height', function(d){return d[Object.keys(d)[0]]*10})
            .attr('fill', "#666");
    },
    generatePie: function (atts, built) {
    },
    generateScatter: function (atts, built) {
    },
    removeGraph: function (atts, built) {
    },
    home: {},
    data: null,
    built: []
};
