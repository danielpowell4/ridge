import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import moment from "moment";
import { titleize } from "./utils";
import { BarTime, ColorLabel } from "./charts";
import Filters from "./Filters";

// for stats
import { mean, median, mode, min, max, sum } from "simple-statistics";

// from dashboard-reports markets/recruitment/lesson_category_by_week_by_market.rb
import lessonHourData from "./data/2021_march_lessons_by_market_by_category_with_grades_location.json";
// from dashboard-reports/markets/recruitment/new_business_by_week_by_market.rb
import newBusinessData from "./data/2021_march_new_business_by_market.json";

// expected data shape
// [
//   { name: MARKET_NAME,
//     weeks: [
//       {
//         start_date: "2018-06-25",
//         CATEGORY_AS_KEY: {
//           DIMENSION_AS_KEY: 0.75
//         }
//       }
//     ]
//   }
// ]

// note that categoryKeys + dimensionKeys == '__all' assumes first week + option has everything!
// except ignored keys of 'start_date' for categoryKeys and '__uniqXXX' for dimensionKeys
const datasets = [
  {
    label: 'Lessons Hours',
    route: 'lesson_hours',
    data: lessonHourData,
    categoryKeys: "__all",
    dimensionKeys: "__all",
  },
  {
    label: 'Early Signs',
    route: 'early_signs',
    data: newBusinessData,
    categoryKeys: ["consultations", "projects_added"],
    dimensionKeys: "__all"
  },
  {
    label: 'New Clients',
    route: 'new_clients',
    data: newBusinessData,
    categoryKeys: ['clients_added', "clients_activated"],
    dimensionKeys: "__all"
  },
  {
    label: "Incoming Traffic",
    route: 'incoming_traffic',
    data: newBusinessData,
    categoryKeys: ['website_leads', "non_website_referrals"],
    dimensionKeys: "__all"
  }
]

const buildCategoryOptions = (data, categoryKeys) => {
  if (categoryKeys === "__all") {
    return Object.keys(data[0].weeks[0])
      .filter((key) => key !== "start_date")
      .map((catValue) => ({
        value: catValue,
        label: titleize(catValue),
      }));
  }

  return categoryKeys.map((catValue) => ({
    value: catValue,
    label: titleize(catValue),
  }));
};

const buildDimensionOptions = (data, dimensionKeys, categoryOptions) => {
  if (dimensionKeys === "__all") {
    const assumedCategory = categoryOptions[0].value;
    return Object.keys(data[0].weeks[0][assumedCategory])
      .filter((key) => key.indexOf("__uniq") !== 0)
      .map((dimVal) => ({
        value: dimVal,
        label: titleize(dimVal),
      }));
  }

  return dimensionKeys.map((dimVal) => ({
    value: dimVal,
    label: titleize(dimVal),
  }));
};

const Title = ({ label }) => {
  return (
    <header style={{ maxWidth: 660, margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <h1 style={{ marginLeft: "0.5rem" }}>{label}</h1>
      <Link to="/projections">Pick new path ↗</Link>
    </header>
  )
}

const Projections = ({ label, data = lessonHourData, categoryKeys = "__all", dimensionKeys = "__all" }) => {
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dimension, setDimension] = useState();
  const [segmentStart, setSegmentStart] = useState("2019-07-01");
  const [segmentEnd, setSegmentEnd] = useState("2020-02-28");

  // build options
  const marketOptions = data.map((d) => ({ value: d.name, label: d.name }));
  const categoryOptions = buildCategoryOptions(data, categoryKeys);
  const dimensionOptions = buildDimensionOptions(data, dimensionKeys, categoryOptions)

  const filters = [
    {
      label: `Markets`,
      options: marketOptions,
      selected: selectedMarkets,
      onChange: (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked || false;

        // add if checked else remove
        setSelectedMarkets((prevSelected) => {
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
        setSelectedMarkets((prev) =>
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

  const markets = selectedMarkets.map(marketOption => data.find(marketData => marketData.name === marketOption.value));

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

  if (!activeData.length) {
    return (
      <div>
        <Title label={label} />
        <Filters filters={filters} />
        <hr style={{ maxWidth: 660, margin: `1rem auto` }} />
        <div style={{ textAlign: `center` }}>Select filters</div>
      </div>
    );
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
        <Title label={label} />
        <Filters label={label} filters={filters} />
        <hr style={{ maxWidth: 660, margin: `1rem auto` }} />
        <div style={{ maxWidth: 660, margin: `1rem auto` }}>
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

  let marketLabel = "";
  let categoryLabel = "";
  if (activeData.length) {
    if (markets.length === marketOptions.length) {
      marketLabel = `All markets`;
    } else if (markets.length > 3) {
      marketLabel = `${markets.length} markets`;
    } else {
      marketLabel = markets.map((m) => m.label).join(", ");
    }

    if (categories.length === categoryOptions.length) {
      categoryLabel = `All categories`;
    } else if (categories.length > 3) {
      categoryLabel = `${categories.length} categories`;
    } else {
      categoryLabel = categories.map((c) => c.label).join(", ");
    }
  }
  const chartTitle = `${titleize(
    dimension
  )} for ${categoryLabel} in ${marketLabel}`;

  return (
    <div>
      <Title label={label} />
      <Filters filters={filters} />
      <hr style={{ maxWidth: 660, margin: `1rem auto` }} />
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
          <h2>{chartTitle}</h2>
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
            {chartTitle} | Simple Stat Breakdown
          </h2>
          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>{`${segmentOneStart.format("L")} - ${segmentOneEnd.format(
                  "L"
                )}`}</th>
                <th>{`${segmentTwoStart.format("L")} - ${segmentTwoEnd.format(
                  "L"
                )}`}</th>
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
                    <td>{`${((delta / segOneValue) * 100).toFixed(2)}%`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const FallbackPage = () => (
  <div style={{ maxWidth: 660, margin: "auto" }}>
    <h1>Choose your data adventure</h1>
    <ul>
      {datasets.map(({ label, route }) => (
        <li key={route} style={{ margin: "1rem" }}>
          <Link to={`/projections/${route}`}>{label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const ProjectionsApp = () => (
  <Switch>
    {datasets.map(({ route, ...rest }) => (
      <Route key={route} path={`/projections/${route}`} exact>
        <Projections {...rest} />
      </Route>
    ))}
    <Route path="*">
      <FallbackPage />
    </Route>
  </Switch>
);

export default ProjectionsApp;
