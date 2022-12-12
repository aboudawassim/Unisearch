const msal = require("@azure/msal-node");
var Imap = require("node-imap"),
  inspect = require("util").inspect;

function openInbox(imap, cb) {
  imap.openBox("INBOX", true, cb);
}

async function getOutlookMails() {
  try {
    const authResponse = await getToken(tokenRequest);
    console.log(authResponse.accessToken);
    const mailId = "sanai.houssem@hotmail.com";
    const token = authResponse.accessToken;
    const auth2 = btoa("user=" + mailId + "^Aauth=Bearer " + token + "^A^A");
    var imap = new Imap({
      xoauth2: auth2,
      host: "outlook.office365.com",
      port: 993,
      tls: true,
      debug: console.log,
      authTimeout: 25000,
      connTimeout: 30000,
      tlsOptions: {
        rejectUnauthorized: false,
        servername: "outlook.office365.com",
      },
    });
    imap.once("ready", function () {
      openInbox(imap, function (err, box) {
        if (err) throw err;
        var f = imap.seq.fetch("1:3", {
          bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
          struct: true,
        });
        f.on("message", function (msg, seqno) {
          console.log("Message #%d", seqno);
          var prefix = "(#" + seqno + ") ";
          msg.on("body", function (stream, info) {
            var buffer = "";
            stream.on("data", function (chunk) {
              buffer += chunk.toString("utf8");
            });
            stream.once("end", function () {
              console.log(
                prefix + "Parsed header: %s",
                inspect(Imap.parseHeader(buffer))
              );
            });
          });
          msg.once("attributes", function (attrs) {
            console.log(prefix + "Attributes: %s", inspect(attrs, false, 8));
          });
          msg.once("end", function () {
            console.log(prefix + "Finished");
          });
        });
        f.once("error", function (err) {
          console.log("Fetch error: " + err);
        });
        f.once("end", function () {
          console.log("Done fetching all messages!");
          imap.end();
        });
      });
    });

    imap.once("error", function (err) {
      console.log(err);
    });

    imap.once("end", function () {
      console.log("Connection ended");
    });
    imap.connect();
  } catch (error) {
    console.log(error);
  }
}

const msalConfig = {
  auth: {
    clientId: "5b3d2e08-bbe7-4809-bb58-142f7b731d6b",
    authority: "https://login.microsoftonline.com/common",
    clientSecret: "VXM8Q~H8QB01ukooemCg5l6~W6W_qDM8rrFBKdry",
  },
};

const tokenRequest = {
  scopes: ["https://graph.microsoft.com/.default"],
  // scopes: ["https://outlook.office.com/IMAP.AccessAsUser.All"],
};

/**
 * Acquires token with client credentials.
 * @param {object} tokenRequest
 */
async function getToken(tokenRequest) {
  const cca = new msal.ConfidentialClientApplication(msalConfig);
  const msalTokenCache = cca.getTokenCache();
  return await cca.acquireTokenByClientCredential(tokenRequest);
}

module.exports = {
  getOutlookMails,
};
