import React from "react";

function EmailRowItem({ item }) {
  return (
    <div>
      <span style={{ fontWeight: "bold", color: "grey" }}>Snippet : </span>
      <span>{item.snippet} :: </span>
      <span style={{ fontWeight: "bold", color: "grey" }}>Content : </span>
      <span>{item.content ? item.content : "No content for this email"}</span>
    </div>
  );
}

export default EmailRowItem;
