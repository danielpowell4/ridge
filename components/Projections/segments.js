import React, { useState } from "react";
import moment from "moment";
import Filters from "./Filters";
import { BarTime } from "./charts";

// for stats
import { mean, median, mode, min, max, sum } from "simple-statistics";

const uniqIdReducer = (accumulatedSet, currentValue) => {
  for (let uniqId of currentValue.__uniq_ids) {
    accumulatedSet.add(uniqId)
  }

  return accumulatedSet
}

export const Segments = ({
  title,
  activeData,
  defaultSegmentStart,
  defaultSegmentEnd,
}) => {
  const [segmentStart, setSegmentStart] = useState(defaultSegmentStart);
  const [segmentEnd, setSegmentEnd] = useState(defaultSegmentEnd);

  const filters = [
    {
      label: `First Segment Starts`,
      selected: segmentStart,
      onChange: (value) => setSegmentStart(value),
      type: `date`,
    },
    {
      label: `First Segment Ends`,
      selected: segmentEnd,
      onChange: (value) => setSegmentEnd(value),
      type: `date`,
    },
  ];

  const segmentOneStart = moment(segmentStart);
  const segmentOneEnd = moment(segmentEnd);

  if (
    !segmentOneStart.isValid() ||
    !segmentOneEnd.isValid() ||
    segmentOneEnd <= segmentOneStart
  ) {
    return (
      <section>
        <h2>{title}</h2>
        <Filters filters={filters} />
        <hr style={{ maxWidth: 660, margin: `1rem auto` }} />
        <div style={{ maxWidth: 660, margin: `1rem auto`, minHeight: 540 }}>
          <ul>
            <li>
              <strong>First segment starts: </strong>
              {segmentOneStart.isValid() ? (
                segmentOneStart.format("L")
              ) : (
                <span style={{ color: "red" }}>{`Not Valid (MM/DD/YYYY)`}</span>
              )}
            </li>
            <li>
              <strong>First segment ends: </strong>
              {segmentOneEnd.isValid() ? (
                segmentOneEnd.format("L")
              ) : (
                <span style={{ color: "red" }}>{`Not Valid (MM/DD/YYYY)`}</span>
              )}
              {segmentOneEnd <= segmentOneStart && (
                <span
                  style={{ color: "red" }}
                >{` Must be after 'First segment starts'`}</span>
              )}
            </li>
          </ul>
        </div>
      </section>
    );
  }

  const fullRange = activeData.map(d => d.y); //ensures charts share y axis

  const segmentTwoStart = moment(segmentStart).add(1, "year");
  const segmentTwoEnd = moment(segmentEnd).add(1, "year");

  const segmentThreeStart = moment(segmentStart).add(2, "year");
  const segmentThreeEnd = moment(segmentEnd).add(2, "year");

  const dataSegmentOne = activeData.filter(({ x }) => {
    return x > segmentOneStart && x < segmentOneEnd;
  });
  const dataSegmentTwo = activeData.filter(({ x }) => {
    return x > segmentTwoStart && x < segmentTwoEnd;
  });
  const dataSegmentThree = activeData.filter(({ x }) => {
    return x > segmentThreeStart && x < segmentThreeEnd;
  });

  const dataSegmentOneValues = !!dataSegmentOne.length
    ? dataSegmentOne.map((d) => d.y)
    : [0];
  const dataSegmentTwoValues = !!dataSegmentTwo.length
    ? dataSegmentTwo.map((d) => d.y)
    : [0];
  const dataSegmentThreeValues = !!dataSegmentThree.length
    ? dataSegmentThree.map((d) => d.y)
    : [0];

  return (
    <section style={{ padding: `1rem` }}>
      <h2 style={{ textAlign: `center` }}>{title}</h2>
      <Filters filters={filters} />
      <div
        style={{
          width: `100%`,
          maxWidth: `1040px`,
          display: `flex`,
          flexFlow: `row wrap`,
          margin: `auto`,
        }}
      >
        <div style={{ width: "31%" }}>
          <BarTime
            width={400}
            height={200}
            dataset={dataSegmentOne}
            fullRange={fullRange}
            timeTickFormat={(t) => moment(t).format("M/D")}
          />
        </div>
        <div style={{ width: "31%" }}>
          <BarTime
            width={400}
            height={200}
            dataset={dataSegmentTwo}
            fullRange={fullRange}
            timeTickFormat={(t) => moment(t).format("M/D")}
          />
        </div>
        <div style={{ width: "31%" }}>
          <BarTime
            width={400}
            height={200}
            dataset={dataSegmentThree}
            fullRange={fullRange}
            timeTickFormat={(t) => moment(t).format("M/D")}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>
              {`${segmentOneStart.format("L")} -`}
              <br />
              {`${segmentOneEnd.format("L")}`}
            </th>
            <th>
              {`${segmentTwoStart.format("L")} -`}
              <br />
              {`${segmentTwoEnd.format("L")}`}
            </th>
            <th>
              {`${segmentThreeStart.format("L")} -`}
              <br />
              {`${segmentThreeEnd.format("L")}`}
            </th>
            <td>2nd vs 1st</td>
            <td>3rd vs 1st</td>
            <td>3rd vs 2nd</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Num Weeks</td>
            <td>{dataSegmentOneValues.length}</td>
            <td>{dataSegmentTwoValues.length}</td>
            <td>{dataSegmentThreeValues.length}</td>
            <td>{dataSegmentTwoValues.length - dataSegmentOneValues.length}</td>
            <td>
              {dataSegmentThreeValues.length - dataSegmentOneValues.length}
            </td>
            <td>
              {dataSegmentThreeValues.length - dataSegmentTwoValues.length}
            </td>
          </tr>
          {[
            ["Sum", sum],
            ["Max", max],
            ["Mean", mean],
            ["Median", median],
            ["Mode", mode],
            ["Min", min],
          ].map((pair, i) => {
            let [label, callback] = pair;
            let segOneValue = callback.call(undefined, dataSegmentOneValues);
            let segTwoValue = callback.call(undefined, dataSegmentTwoValues);
            let segThreeValue = callback.call(
              undefined,
              dataSegmentThreeValues
            );
            // show 'uniq' for sum if supported
            if (label === "Sum") {
              const segOneNumUnique = !!dataSegmentOne.length
                ? dataSegmentOne.reduce(uniqIdReducer, new Set()).size
                : 0;
              const segTwoNumUnique = !!dataSegmentTwo.length
                ? dataSegmentTwo.reduce(uniqIdReducer, new Set()).size
                : 0;
              const segThreeNumUnique = !!dataSegmentThree.length
                ? dataSegmentThree.reduce(uniqIdReducer, new Set()).size
                : 0;
              if ([segOneNumUnique, segTwoNumUnique, segThreeNumUnique].some(uniq => uniq > 0)) {
                label = "Total Unique";
                segOneValue = segOneNumUnique;
                segTwoValue = segTwoNumUnique;
                segThreeValue = segThreeNumUnique
              }
            }
            let deltaTwoVsOne = segTwoValue - segOneValue;
            let deltaThreeVsOne = segThreeValue - segOneValue;
            let deltaThreeVsTwo = segThreeValue - segTwoValue;

            return (
              <tr key={i}>
                <td>{label}</td>
                <td>{segOneValue.toFixed(2)}</td>
                <td>{segTwoValue.toFixed(2)}</td>
                <td>{segThreeValue.toFixed(2)}</td>
                <td>
                  {deltaTwoVsOne.toFixed(2)} (
                  {`${((deltaTwoVsOne / segOneValue) * 100).toFixed(2)}%`})
                </td>
                <td>
                  {deltaThreeVsOne.toFixed(2)} (
                  {`${((deltaThreeVsOne / segOneValue) * 100).toFixed(2)}%`})
                </td>
                <td>
                  {deltaThreeVsTwo.toFixed(2)} (
                  {`${((deltaThreeVsTwo / segTwoValue) * 100).toFixed(2)}%`})
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
