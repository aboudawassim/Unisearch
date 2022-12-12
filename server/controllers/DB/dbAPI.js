const { getDatabases, getTablesFromDB, seekQuery } = require("./functions");
var sql = require("msnodesqlv8");

async function searchdb(query) {
  const config = {
    host: "localhost",
    port: 3306,
    username: "houcem",
    password: "houcem",
    dialect: "mysql",
  };

  const dbs = await getDatabases(config);
  console.log("End getting databases. Found : ", dbs.length);
  let databasesTables = await Promise.all(
    dbs.map(async (database) => {
      const tables = await getTablesFromDB({
        ...config,
        database,
      });
      if (tables)
        return {
          name: database,
          tables: tables,
        };
    })
  );
  console.log("End getting tables. Found : ", databasesTables.length);
  databasesTables = databasesTables.filter((item) => item);
  const result = await Promise.all(
    await seekQuery({
      ...config,
      databasesTables,
      query,
    })
  );
  console.log("End getting rows. Found : ", result.length);
  const cleanResult = result.flat().filter((row) => row != undefined);

  return cleanResult;
}

async function getMssqlResult() {
  // tables : reclamation_fourn | action | anomalie | demande_chang

  return new Promise(async (resolve, reject) => {
    const reclamationsFournisseur = await fetchResult({
      query: "SELECT * from reclamation_fournisseur",
    });
    const actions = await await fetchResult({ query: "SELECT * from action" });
    const anomalies = await await fetchResult({
      query: "SELECT * from anomalie",
    });
    const demandesChangement = await await fetchResult({
      query: "SELECT * from demande_changement",
    });
    const causeAnomalies = await await fetchResult({
      query: "SELECT * from cause_anomalie",
    });
    const articles = await await fetchResult({
      query: "SELECT * from article",
    });
    const suiviesAnomalies = await await fetchResult({
      query: "SELECT * from suivie_anomalie",
    });
    resolve({
      actions,
      reclamationsFournisseur,
      anomalies,
      demandesChangement,
      causeAnomalies,
      articles,
      suiviesAnomalies,
    });
  }).catch((err) => reject(err));
}

async function fetchResult({ query }) {
  const cnx =
    "server=.;Database=unimed;Trusted_connection=Yes;Driver={SQL Server Native Client 11.0}";
  return new Promise((resolve, reject) => {
    sql.query(cnx, query, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

module.exports = { searchdb, getMssqlResult };
