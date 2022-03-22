import * as React from "react";
import useSearch from "./useSearch";

import Histogram from "../Histogram";

import dataset from "./2021_diag.json"; // see /Users/Powell/work/pp/dashboard-reports/tests/act_achievement.rb

const ACT_START_ZONES = [
  { min: 1, max: 14 },
  { min: 14, max: 18 },
  { min: 19, max: 21 },
  { min: 22, max: 25 },
  { min: 26, max: 28 },
  { min: 29, max: 32 },
  { min: 33, max: 36 },
];

const markets = [
  { value: 9, label: "Central New Jersey" },
  { value: 11, label: "Connecticut" },
  { value: 4, label: "DC Metro" },
  { value: 8, label: "International" },
  { value: 3, label: "Long Island" },
  { value: 7, label: "Long Island South Shore" },
  { value: 6, label: "Los Angeles" },
  { value: 1, label: "NYC" },
  { value: 5, label: "Northern New Jersey" },
  { value: 10, label: "South Florida" },
  { value: 12, label: "Tampa Bay" },
  { value: 2, label: "Westchester" },
];

const PRACTICE_TEST_MAX = Math.max(
  ...dataset
    .map((r) => r["Practice Tests"])
    .filter((num) => !!num)
    .map((value) => Number(value))
    .filter((num) => !Number.isNaN(num))
);

const REAL_TEST_MAX = Math.max(
  ...dataset
    .map((r) => r["Real Tests"])
    .filter((num) => !!num)
    .map((value) => Number(value))
    .filter((num) => !Number.isNaN(num))
);

const PREP_HOURS_MAX = Math.ceil(
  Math.max(
    ...dataset
      .map((r) => r["Total Hours"])
      .filter((num) => !!num)
      .map((value) => Number(value))
      .filter((num) => !Number.isNaN(num))
  )
);

const ScorePredictor = () => {
  const grad_years = [2018, 2019, 2020, 2021, 2022];
  const [search, setSearch] = useSearch();

  const result_type = search.result_type || "diag";
  const market_ids = search.market_ids || markets.map((m) => m["value"]);

  const practice_test_min = parseInt(search.practice_test_min || 1);
  const practice_test_max = parseInt(
    search.practice_test_max || PRACTICE_TEST_MAX
  );
  const real_test_min = parseInt(search.real_test_min || 1);
  const real_test_max = parseInt(search.real_test_max || REAL_TEST_MAX);

  const prep_hours_min = parseFloat(search.prep_hours_min || 1);
  const prep_hours_max = parseFloat(search.prep_hours_max || PREP_HOURS_MAX);

  const activeMarkets = market_ids.map(
    (activeId) => markets.find((m) => m["value"] == activeId)["label"]
  );

  const activeData = dataset
    .filter((row) => activeMarkets.includes(row["Market"]))
    .filter(
      (row) =>
        row["Practice Tests"] >= practice_test_min &&
        row["Practice Tests"] <= practice_test_max
    )
    .filter(
      (row) =>
        row["Real Tests"] >= real_test_min && row["Real Tests"] <= real_test_max
    )
    .filter(
      (row) =>
        row["Total Hours"] >= prep_hours_min &&
        row["Total Hours"] <= prep_hours_max
    );

  return (
    <>
      <div>
        <h4>Result Type</h4>
        <ul style={{ listStyle: "none" }}>
          {[
            ["Diagnostic", "diag"],
            ["Real SuperScore", "real"],
          ].map(([label, value]) => {
            const id = `result_type_${value}`;

            return (
              <li key={id}>
                <input
                  type="radio"
                  name="result_type"
                  id={id}
                  value={value}
                  checked={result_type === value}
                  onChange={() => setSearch({ ...search, result_type: value })}
                />
                <label htmlFor={id}>{label}</label>
              </li>
            );
          })}
        </ul>
        <h4>Markets</h4>
        <ul
          style={{
            listStyle: "none",
            display: "grid",
            gridGap: "0.5rem",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {markets.map(({ value, label }) => {
            const id = `market_id_${value}`;
            const isChecked = market_ids.some((activeId) => activeId == value);

            return (
              <li key={id}>
                <input
                  type="checkbox"
                  name={`market[${value}]`}
                  id={id}
                  value={value}
                  checked={isChecked}
                  onChange={() =>
                    setSearch({
                      ...search,
                      market_ids: isChecked
                        ? market_ids.filter((activeId) => activeId != value)
                        : [...market_ids, value],
                    })
                  }
                />
                <label htmlFor={id}>{label}</label>
              </li>
            );
          })}
        </ul>
        <h4>Practice Tests</h4>
        {[
          ["Min Tests", "practice_test_min", practice_test_min],
          ["Max Tests", "practice_test_max", practice_test_max],
        ].map(([label, name, value]) => (
          <React.Fragment key={label}>
            <label htmlFor={name}>{label}</label>
            <input
              type="number"
              id={name}
              name={name}
              value={value}
              step={1}
              min={1}
              max={PRACTICE_TEST_MAX}
              onChange={(e) => setSearch({ ...search, [name]: e.target.value })}
            />
          </React.Fragment>
        ))}
        <h4>Real Tests</h4>
        {[
          ["Min Tests", "real_test_min", real_test_min],
          ["Max Tests", "real_test_max", real_test_max],
        ].map(([label, name, value]) => (
          <React.Fragment key={label}>
            <label htmlFor={name}>{label}</label>
            <input
              type="number"
              id={name}
              name={name}
              value={value}
              step={1}
              min={1}
              max={PRACTICE_TEST_MAX}
              onChange={(e) => setSearch({ ...search, [name]: e.target.value })}
            />
          </React.Fragment>
        ))}
        <h4>Prep Hours</h4>
        {[
          ["Min Hours", "prep_hours_min", prep_hours_min],
          ["Max Hours", "prep_hours_max", prep_hours_max],
        ].map(([label, name, value]) => (
          <React.Fragment key={label}>
            <label htmlFor={name}>{label}</label>
            <input
              type="number"
              id={name}
              name={name}
              value={value}
              step={1}
              min={1}
              max={PRACTICE_TEST_MAX}
              onChange={(e) => setSearch({ ...search, [name]: e.target.value })}
            />
          </React.Fragment>
        ))}
      </div>
      <div>
        {["Composite", "English", "Math", "Reading", "Science"].map(
          (scoreType) => {
            const scoreAttr =
              result_type === "diag" ? scoreType : `Top ${scoreType}`;

            return (
              <div key={scoreType}>
                <h2>{scoreType}</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    padding: "1rem",
                  }}
                >
                  {grad_years.map((year) => {
                    const chartData = activeData.filter(
                      (d) => d["Grad Year"] == year
                    );

                    return (
                      <div key={year}>
                        <Histogram
                          dataset={chartData}
                          bins={ACT_START_ZONES}
                          attr={scoreAttr}
                        />
                        <label>
                          {year} Seniors (n = {chartData.length})
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default ScorePredictor;
