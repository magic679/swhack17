(function(){
  setTimeout(function(){
    document.getElementById('someid').addEventListener('click', function(){
      var newgraph = recruiterGraphs.initialize('.graph-content');
      newgraph.scatterData(window.doingit, 'created_at', 'payload.size');
    });
  }, 5000);
})();

var hack = function(){
    console.log('in jquery');
    console.log(applicantList);
}();
