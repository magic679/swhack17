(function () {
  var applicantData;

  export function set(newData) {
    applicantData = newData;
  }

  function print() {
    console.log(applicantData);
  }

  return {
    print: print
  }
})();
