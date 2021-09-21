import React from "react";
import { Link, withRouter } from "react-router-dom";
function Error() {
  return (
    <div>
      <center>
        <h1> Error: This Is Not A Valid Page </h1>
        <Link to="/">
          Click Here To Return To the Home Page
          <span class="sr-only">(current)</span>
        </Link>
        </center>
    </div>
  );
}

export default Error;
