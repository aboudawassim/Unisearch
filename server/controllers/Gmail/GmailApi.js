var axios = require("axios");
var qs = require("qs");

accessTokenold =
  "ya29.a0AVA9y1uiLX1_H2Q5wfJINst0Bz9OT2EhePyR8s3Ea25E4A8bHWQW-W_OhH0ldd_K4eBQ-aYSVGuiTfjNTNfYRbD3cdcLRwNDJ2taJ_uDcDgZzaW8_w_b273bLef1Aadp_xN5g2fb1FUgyGGxEjubvqo3yC5nXwaCgYKATASARISFQE65dr83fO5p3lideui-sRIBPoM1g0165";

let result = [];
const searchGmail = async ({ key, accessToken }) => {
  var config1 = {
    method: "get",
    url: "https://www.googleapis.com/gmail/v1/users/me/messages?q=" + key,
    headers: {
      Authorization: `Bearer ${accessToken} `,
    },
  };

  const response = await axios(config1);
  if (response.data["messages"]) {
    const resObject = response.data["messages"].map(
      async (item) => await readGmailContent(item.id, accessToken)
    );
    return Promise.all(await resObject);
  } else {
    console.log("No messages");
    return [];
  }
};

const readGmailContent = async (messageId, accessToken) => {
  var config = {
    method: "get",
    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axios(config);
  if (res) {
    const data = res.data;
    const message = formatMessageContent(data);
    return message;
  } else return null;
};

const formatMessageContent = (messageContent) => {
  console.log(messageContent.snippet);
  if (!messageContent) return null;
  const from = messageContent.payload.headers.find(
    (item) => item.name == "From"
  ).value;
  const to = messageContent.payload.headers.find(
    (item) => item.name == "To"
  ).value;
  let content = "";
  const snippet = messageContent.snippet ?? "";
  if (messageContent.payload["parts"][0].body?.data) {
    const encodedMessage = messageContent.payload["parts"][0].body.data;
    content = Buffer.from(Object.values(encodedMessage), "base64").toString(
      "ascii"
    );
  }

  const res = {
    from,
    to,
    content,
    snippet: snippet,
  };
  return res;
};

/*readInboxContent = async (searchText) => {
    const threadId = await this.searchGmail(searchText);
    const message = await this.readGmailContent(threadId);

    const encodedMessage = await message.payload["parts"][0].body.data;
    const decodedStr = Buffer.from(encodedMessage, "base64").toString("ascii");

    console.log(decodedStr);

    return decodedStr;
  };*/

module.exports = {
  searchGmail,
};
