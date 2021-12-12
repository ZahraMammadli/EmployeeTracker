const cTable = require("console.table");
const db = require("../config/connection");
const { main } = require("../server");

//  Function to run sql scripts returning data
const runSql = (script) => {
  db.query(script, (err, data) => {
    if (err) throw err;
    console.table(data);
    main();
  });
};

module.exports = { runSql };
