const express = require("express");
const router = express.Router();
const { searchdb, getMssqlResult } = require("../controllers/DB/dbAPI");
const { searchfile } = require("../controllers/Explorer/expAPI");
const { searchGmail } = require("../controllers/Gmail/GmailApi");

router.get("/db", async (req, res) => {
  const responseDB = await searchdb(req.query.key);
  res.status(200).send(responseDB);
});

router.get("/mssql", (req, res) => {
  //const responseMssqlDB = await getMssqlResult();
  getMssqlResult()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("No data");
    });
  //console.log("responseMssqlDB : ", responseMssqlDB);
});

router.get("/expo", async (req, res) => {
  const responseExpo = await searchfile(req.query);
  res.status(200).send(responseExpo);
});

router.get("/gmail", async (req, res) => {
  const responseGmail = await searchGmail(req.query);
  res.status(200).send(responseGmail);
});

module.exports = router;
