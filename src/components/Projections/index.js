import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import moment from "moment";
import { titleize } from "./utils";
import { BarTime, ColorLabel } from "./charts";
import { Segments } from "./segments";
import Filters from "./Filters";

// from dashboard-reports markets/recruitment/lesson_category_by_week_by_market.rb
import lessonHourData from "./data/2021_march_lessons_by_market_by_category_with_grades_location.json";
// from dashboard-reports/markets/recruitment/new_business_by_week_by_market.rb
import newBusinessData from "./data/2021_august_new_business_by_week_by_market.json";

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
    categoryKeys: "__all",
    dimensionKeys: "__all",
    defaultSegmentStart: "2019-01-01",
    defaultSegmentEnd: "2019-07-01"
  },
]

const buildCategoryOptions = (data, categoryKeys) => {
  if (categoryKeys === "__all") {
    return Object.keys(data[0].weeks[0])
      .filter((key) => !["start_date", "week_number", "week_year"].includes(key))
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

const Projections = ({ label, data = lessonHourData, categoryKeys = "__all", dimensionKeys = "__all", defaultSegmentStart = "2018-07-02", defaultSegmentEnd = "2019-03-14"}) => {
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dimension, setDimension] = useState();

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
    }
  ];

  let activeData = [];

  const markets = selectedMarkets.map(marketOption => data.find(marketData => marketData.name === marketOption.value));

  if (!!markets.length && !!categories.length && !!dimension) {
    let weeklyTotals = {};
    let weeklyUniq = {}; // from arrays of IDs
    let uniqDimension = `__uniq_${dimension}`

    for (let market of markets) {
      for (let marketWeek of market.weeks) {
        for (let categoryOpt of categories) {
          let weekStart = marketWeek.start_date;

          let val = marketWeek[categoryOpt.value][dimension];
          let prevTotal = weeklyTotals[weekStart] || 0;
          weeklyTotals[weekStart] = prevTotal + val;

          let uniqVal = marketWeek[categoryOpt.value][uniqDimension] || [];
          let prevUniqs = weeklyUniq[weekStart] || [];
          weeklyUniq[weekStart] = [...new Set(prevUniqs, uniqVal)];
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
        __uniq_ids: weeklyUniq[weekStart],
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

  let marketLabel = "";
  let categoryLabel = "";
  if (activeData.length) {
    if (markets.length === marketOptions.length) {
      marketLabel = `All markets`;
    } else if (markets.length > 3) {
      marketLabel = `${markets.length} markets`;
    } else {
      marketLabel = markets.map((m) => m.name).join(", ");
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
      <Segments
        activeData={activeData}
        defaultSegmentStart={defaultSegmentStart}
        defaultSegmentEnd={defaultSegmentEnd}
      />
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
