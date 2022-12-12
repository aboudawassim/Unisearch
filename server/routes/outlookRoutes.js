const { getOutlookMails } = require("../Outlook/functions");
const express = require("express");
const router = express.Router();

router.get("/mails", async (req, res) => {
  const mails = await getOutlookMails();
  res.status(200).send(mails);
});

module.exports = router;
