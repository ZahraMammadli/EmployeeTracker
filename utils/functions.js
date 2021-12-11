const cTable = require("console.table");

// This method runs queries and generate table based on the resul

class sqlQueries {
  constructor(query, values) {
    this.query = query;
    this.values = values;
  }

  //  Function to run sql scripts returning data
  generateTable(main) {
    connection.query(this.query, this.values, (err, data) => {
      if (err) throw err;
      console.table(data);
      main();
    });
  }
  getQueryNoRepeats(nextStep, parameterToPassToNextStep) {
    connection.query(this.query, this.values, function (err, res) {
      if (err) throw err;
      let titleArr = [];
      for (let i = 0; i < res.length; i++) {
        if (!titleArr.includes(res[i].title)) {
          titleArr.push(res[i].title);
        }
      }
      nextStep(titleArr, parameterToPassToNextStep);
    });
  }
}
