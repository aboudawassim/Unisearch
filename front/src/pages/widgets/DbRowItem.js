import React from "react";
import { objectToArray } from "../../helpers/functions";

function DbRowItem({ item }) {
  const formattedArray = objectToArray(item.row);
  return (
    <div>
      <span style={{ fontWeight: "bold", marginRight: "10px", color: "red" }}>
        {item.database}
      </span>
      <span> - </span>
      <span style={{ fontWeight: "bold", marginRight: "10px", color: "grey" }}>
        {item.table}
      </span>
      <span> : </span>
      <span>
        {formattedArray.map((element) => {
          return (
            <>
              <span style={{ fontWeight: "bold" }}>{element.name} : </span>
              <span>{element.value ? element.value : "--"} , </span>
            </>
          );
        })}
      </span>
      <hr style={{ margin: "10px 0" }} />
    </div>
  );
}

export default DbRowItem;
