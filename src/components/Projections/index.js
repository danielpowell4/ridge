import React, { useState } from "react";
import moment from "moment";
import Select from "react-select";
import { BarTime, ColorLabel } from "./charts";

// for stats
import {
  mean,
  median,
  mode,
  min,
  max,
  sum,
} from "simple-statistics";

// from dashboard-reports markets/recruitment/lesson_category_by_week_by_market.rb
import allData from "./2021_march_by_market_by_category_with_grades_location.json";

// setup options
const marketOptions = allData.map((marketGroup) => ({
  value: marketGroup.name,
  label: marketGroup.name,
  ...marketGroup,
}));
const categoryOptions = [
  "Admissions Consulting",
  "College Academics",
  "College Transitions Program",
  "English",
  "Executive Functioning",
  "Foreign Language",
  "Graduate Level Tests",
  "History and Social Sciences",
  "Math",
  "Multi-Subject Support",
  "Other",
  "SAT/ACT Prep",
  "Science",
  "SSAP Prep"
].map((cat) => ({ value: cat, label: cat }));

const dimensionOptions = [
  { value: "hours", label: "Total hours", },
  { value: "at_client_hours", label: "At Client Hours", },
  { value: "pp_office_hours", label: "PP Office Hours", },
  { value: "online_hours", label: "Online Hours", },
  { value: "coaches", label: "Coaches", },
  { value: "all_students", label: "All students", },
  { value: "High School Senior", label: "High School Senior", },
  { value: "High School Junior", label: "High School Junior", },
  { value: "High School Sophomore", label: "High School Sophomore", },
  { value: "High School Freshman", label: "High School Freshman", },
  { value: "College Senior", label: "College Senior", },
  { value: "College Junior", label: "College Junior", },
  { value: "College Sophomore", label: "College Sophomore", },
  { value: "College Freshman", label: "College Freshman", },
  { value: "Grade 1", label: "Grade 1", },
  { value: "Grade 2", label: "Grade 2", },
  { value: "Grade 3", label: "Grade 3", },
  { value: "Grade 4", label: "Grade 4", },
  { value: "Grade 5", label: "Grade 5", },
  { value: "Grade 6", label: "Grade 6", },
  { value: "Grade 7", label: "Grade 7", },
  { value: "Grade 8", label: "Grade 8", },
  { value: "Kindergarten", label: "Kindergarten", },
];

const Filters = ({ filters }) => (
  <ul
    style={{
      display: `grid`,
      gridGap: `1rem`,
      maxWidth: 600,
      margin: `auto`,
      listStyle: `none`,
    }}
  >
    {filters.map((filter) => (
      <li key={filter.label}>
        <span>
          <strong>{filter.label}</strong>
          {!!filter.onSelectAll && (
            <button onClick={filter.onSelectAll}>Select All</button>
          )}
        </span>

        {filter.type === `Select` ? (
          <Select
            options={filter.options}
            selected={filter.selected}
            onChange={filter.onChange}
          />
        ) : filter.type === `date` ? (
          <input
            type={filter.type}
            value={filter.selected}
            onChange={filter.onChange}
          />
        ) : filter.type === `checkboxGroup` ? (
          <div
            style={{ display: `grid`, gridTemplateColumns: `repeat(2, 1fr)` }}
          >
            {filter.options.map((opt) => (
              <label key={opt.value} htmlFor={opt.value}>
                <input
                  type="checkbox"
                  id={opt.value}
                  value={opt.value}
                  checked={
                    !!filter.selected.find(
                      (selected) => selected.value === opt.value
                    )
                  }
                  onChange={filter.onChange}
                />
                {opt.label}
              </label>
            ))}
          </div>
        ) : (
          <p style={{ color: `red` }}>Unsupported filter type</p>
        )}
      </li>
    ))}
  </ul>
);

// actual component

const Projections = () => {
  const [markets, setMarkets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dimension, setDimension] = useState();
  const [segmentStart, setSegmentStart] = useState("2019-07-01");
  const [segmentEnd, setSegmentEnd] = useState("2020-02-28");

  const filters = [
    {
      label: `Markets`,
      options: marketOptions,
      selected: markets,
      onChange: (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked || false;

        // add if checked else remove
        setMarkets((prevSelected) => {
          if (isChecked) {
            return [
              ...prevSelected,
              marketOptions.find((opt) => opt.value === value),
            ];
          } else {
            return prevSelected.filter((opt) => opt.value !== value);
          }
        });
      },
      onSelectAll: () =>
        setMarkets((prev) =>
          prev.length === marketOptions.length ? [] : marketOptions
        ),
      type: `checkboxGroup`,
    },
    {
      label: `Category`,
      options: categoryOptions,
      selected: categories,
      onChange: (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked || false;

        // add if checked else remove
        setCategories((prevSelected) => {
          if (isChecked) {
            return [
              ...prevSelected,
              categoryOptions.find((opt) => opt.value === value),
            ];
          } else {
            return prevSelected.filter((opt) => opt.value !== value);
          }
        });
      },
      onSelectAll: () =>
        setCategories((prev) =>
          prev.length === categoryOptions.length ? [] : categoryOptions
        ),
      type: `checkboxGroup`,
    },
    {
      label: `Dimension`,
      options: dimensionOptions,
      selected: dimensionOptions.filter((opt) => opt.value === dimension),
      onChange: (selected) => setDimension(selected.value),
      type: `Select`,
    },
    {
      label: `First Segment Starts`,
      selected: segmentStart,
      onChange: (e) => setSegmentStart(e.target.value),
      type: `date`,
    },
    {
      label: `First Segment Ends`,
      selected: segmentEnd,
      onChange: (e) => setSegmentEnd(e.target.value),
      type: `date`,
    },
  ];

  let activeData = [];

  if (!!markets.length && !!categories.length && !!dimension) {
    let weeklyTotals = {};

    for (let market of markets) {
      for (let marketWeek of market.weeks) {
        for (let categoryOpt of categories) {
          let val = marketWeek[categoryOpt.value][dimension];
          let weekStart = marketWeek.start_date;

          let prevTotal = weeklyTotals[weekStart] || 0;
          weeklyTotals[weekStart] = prevTotal + val;
        }
      }
    }

    activeData = Object.keys(weeklyTotals).map((weekStart) => {
      const total = weeklyTotals[weekStart];
      return {
        x: new Date(weekStart),
        y: total,
        label: [
          `Week of ${moment(weekStart).format("L")}`,
          `${total.toFixed(2)} ${dimension}`,
        ],
      };
    });
  }

  let marketLabel = "";
  let categoryLabel = "";
  if (activeData.length) {
    if (markets.length === marketOptions.length) {
      marketLabel = `all markets`;
    } else if (markets.length > 3) {
      marketLabel = `${markets.length} markets`;
    } else {
      marketLabel = markets.map((m) => m.label).join(", ");
    }

    if (categories.length === categoryOptions.length) {
      categoryLabel = `all categories`;
    } else if (categories.length > 3) {
      categoryLabel = `${categories.length} categories`;
    } else {
      categoryLabel = categories.map((c) => c.label).join(", ");
    }
  }

  const fullRange = activeData.map((d) => d.y);
  const segmentOneStart = moment(segmentStart);
  const segmentOneEnd = moment(segmentEnd);
  const segmentTwoStart = moment(segmentStart).add(1, "year");
  const segmentTwoEnd = moment(segmentEnd).add(1, "year");

  if (
    !segmentOneStart.isValid() ||
    !segmentOneEnd.isValid() ||
    segmentOneEnd <= segmentOneStart
  ) {
    return (
      <div>
        <Filters filters={filters} />
        <hr style={{ maxWidth: 660, margin: `1rem auto` }} />
        <pre>
          first segment starts:{" "}
          {segmentOneStart.isValid()
            ? segmentOneStart.format("L")
            : "Not Valid"}
        </pre>
        <pre>
          first segment ends:{" "}
          {segmentOneEnd.isValid() ? segmentOneEnd.format("L") : "Not Valid"}
          {segmentOneEnd <= segmentOneStart
            ? `Must be after segment start`
            : ``}
        </pre>
      </div>
    );
  }

  const dataSegmentOne = activeData.filter(({ x }) => {
    return x > segmentOneStart && x < segmentOneEnd;
  });
  const dataSegmentTwo = activeData.filter(({ x }) => {
    return x > segmentTwoStart && x < segmentTwoEnd;
  });

  const dataSegmentOneValues = !!dataSegmentOne.length
    ? dataSegmentOne.map((d) => d.y)
    : [0];
  const dataSegmentTwoValues = !!dataSegmentTwo.length
    ? dataSegmentTwo.map((d) => d.y)
    : [0];

  return (
    <div>
      <Filters filters={filters} />
      <hr style={{ maxWidth: 660, margin: `1rem auto` }} />
      {!activeData.length ? (
        <div style={{ textAlign: `center` }}>Select filters</div>
      ) : (
        <>
          <section>
            <div
              style={{
                width: `100%`,
                maxWidth: `1040px`,
                display: `flex`,
                flexFlow: `row wrap`,
                margin: `auto`,
              }}
            >
              <h1>{`${dimension} for ${categoryLabel} in ${marketLabel}`}</h1>
              <BarTime dataset={activeData} width={800} height={300} />
              <aside
                style={{
                  display: `flex`,
                  flexFlow: `row wrap`,
                  justifyContent: `center`,
                  padding: `.5rem 1rem`,
                  margin: `auto`,
                }}
              >
                <ColorLabel dataset={activeData} />
              </aside>
            </div>
          </section>
          <section>
            <div
              style={{
                width: `100%`,
                maxWidth: `1040px`,
                display: `flex`,
                flexFlow: `row wrap`,
                margin: `auto`,
              }}
            >
              <div style={{ width: "48%" }}>
                <BarTime
                  width={400}
                  height={200}
                  dataset={dataSegmentOne}
                  fullRange={fullRange}
                  timeTickFormat={(t) => moment(t).format("M/D")}
                />
              </div>
              <div style={{ width: "48%" }}>
                <BarTime
                  width={400}
                  height={200}
                  dataset={dataSegmentTwo}
                  fullRange={fullRange}
                  timeTickFormat={(t) => moment(t).format("M/D")}
                />
              </div>
              <h2 style={{ textAlign: `center` }}>
                {`${dimension} for ${categoryLabel} in ${marketLabel}`} | Simple
                Stat Breakdown
              </h2>
              <table>
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>{`${segmentOneStart.format(
                      "L"
                    )} - ${segmentOneEnd.format("L")}`}</th>
                    <th>{`${segmentTwoStart.format(
                      "L"
                    )} - ${segmentTwoEnd.format("L")}`}</th>
                    <th>Raw Change</th>
                    <th>% Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Num Weeks</td>
                    <td>{dataSegmentOneValues.length}</td>
                    <td>{dataSegmentTwoValues.length}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  {[
                    ["Sum", sum],
                    ["Max", max],
                    ["Mean", mean],
                    ["Median", median],
                    ["Mode", mode],
                    ["Min", min],
                  ].map((pair, i) => {
                    const [label, callback] = pair;
                    let segOneValue = callback.call(
                      undefined,
                      dataSegmentOneValues
                    );
                    let segTwoValue = callback.call(
                      undefined,
                      dataSegmentTwoValues
                    );
                    let delta = segTwoValue - segOneValue;

                    return (
                      <tr key={i}>
                        <td>{label}</td>
                        <td>{segOneValue.toFixed(2)}</td>
                        <td>{segTwoValue.toFixed(2)}</td>
                        <td>{delta.toFixed(2)}</td>
                        <td>{`${((delta / segOneValue) * 100).toFixed(
                          2
                        )}%`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Projections;
