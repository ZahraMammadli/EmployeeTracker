


//  Function to run sql scripts returning data
const runSql = async (script) => {
    connection.query(script, (err, data) => {
      if (err) throw err;
      console.table(data);
      main();
    });
  };
  //  Function to run sql scripts to add/modify data
  modifySql = (script, responce) => {
    connection.query(script, responce, (err, data) => {
      if (err) throw err;
      console.table(data);
      main();
    });
  };
  