var hack = function () {
  function print() {
    var t = $('#jquery-applicantList');
    console.log(t.val());
  }

  return {
    print: print
  }
}();
