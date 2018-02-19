import React from "react";

const Widget = ({ match }) => (
  <div>
    <h3>{match.params.urlString}</h3>
  </div>
);

export default Widget;
