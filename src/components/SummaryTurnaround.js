import React from "react";
import Timegraph from "./Timegraph";
import Histogram from "./Histogram";

const SummaryTurnaround = _ => (
  <React.Fragment>
    <section>
      <h2 style={{ width: "1040px", margin: "auto" }}>Lesson Turnaround</h2>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          maxWidth: "1040px",
          width: "100%",
          justifyContent: "center",
          margin: "auto"
        }}
      >
        <Timegraph />
        <Histogram />
      </div>
    </section>
  </React.Fragment>
);

export default SummaryTurnaround;
