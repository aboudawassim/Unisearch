const { Sequelize } = require("sequelize");

async function getDatabases(params) {
  //Sequelize conenction
  const sequelize = new Sequelize(
    `${params.dialect}://${params.host}:${params.port}`,
    {
      username: params.username,
      password: params.password,
      pool: {
        max: 5000,
      },
      dialectOptions: { connectTimeout: 150000 },
    }
  );

  // Get databases' list
  const resultDB = await sequelize.query("SHOW DATABASES");
  const databases = resultDB[0].map((item) => item.Database);
  await sequelize.close();
  return databases;
}

async function getTablesFromDB(params) {
  //Sequelize conenction
  const sequelize = new Sequelize(
    params.database,
    params.username,
    params.password,
    {
      host: params.host,
      dialect: params.dialect,
    }
  );

  if (
    !params.database.toString().includes("schema") &&
    params.database.toString() !== "mysql" &&
    params.database.toString() !== "phpmyadmin"
  ) {
    const resultTab = await sequelize.query("SHOW TABLES");
    const tables = resultTab[0].map(
      (table) => table[`Tables_in_${params.database}`]
    );
    await sequelize.close();
    return tables.length > 0 ? tables : undefined;
  }
  return undefined;
}

async function getTableData(params) {
  //Sequelize conenction
  const sequelize = new Sequelize(
    params.database,
    params.username,
    params.password,
    {
      host: params.host,
      dialect: params.dialect,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    }
  );
  const count = await sequelize.query(
    "select count(*) as c FROM " + params.table
  );
  let selectResult = undefined;
  if (count[0][0]["c"] > 0 && !params.table.toString().includes("columns_")) {
    selectResult = await sequelize.query("select * from " + params.table);
    await sequelize.close();
  }
  return selectResult ? Object.values(selectResult) : [];
}

function rowContains(query, row) {
  var pattern = RegExp("^.*" + query + ".*$");
  return pattern.test(row);
}

async function seekQuery(params) {
  const queryResult = params.databasesTables.map((database) => {
    var inTableResult = database.tables.map(async (table) => {
      let rows = await getTableData({
        ...params,
        database: database.name,
        table,
      });
      var inRowsResult =
        rows && rows[0]
          ? rows[0].map((row) => {
              if (rowContains(params.query, JSON.stringify(row))) {
                return {
                  database: database.name,
                  table,
                  row,
                };
              }
            })
          : null;
      return inRowsResult;
    });
    return inTableResult;
  });
  return queryResult.flat();
}

module.exports = {
  getDatabases,
  getTablesFromDB,
  getTableData,
  seekQuery,
};
