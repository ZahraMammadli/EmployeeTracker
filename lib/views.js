const cTable = require("console.table");

//  Function to run sql scripts returning data
const runSql = (script) => {
  const results = query(script)
    .then((data) => {
      console.table(data);
      return db.end;
    })
    .then(() => main())
    .catch((err) => console.log(err));
  return results;
};

module.exports = { runSql };
