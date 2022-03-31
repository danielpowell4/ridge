import * as React from "react";
import { Layout } from "../../components";

// see https://github.com/privateprep/dashboard-reports/blob/main/test_progression/act_score_predictor.rb
import fullDataset from "./actAchievement-Mar3022.json";

// TODO: clean data to remove:
// - Test Num 1 != Diag
// ... more weirdness

import {
  VictoryChart,
  VictoryBoxPlot,
  VictoryScatter,
  VictoryTheme,
} from "victory";

import { min, max, median, mean, mode } from "simple-statistics";

const numberSort = (a, b) => a - b;

const SCORE_KEYS = ["Composite", "English", "Math", "Reading", "Science"];

const ScoreTimeline = () => {
  const [diagScore, setDiagScore] = React.useState(27);
  const [binRange, setBinRange] = React.useState(0); // for grace
  const [scoreField, setScoreField] = React.useState(SCORE_KEYS[0]);

  const independentField = "Test Number";

  const startingField = `Diag ${scoreField}`;

  const minIncluded = diagScore - binRange;
  const maxIncluded = diagScore + binRange;

  const maxTestNum = 10;

  const filtered = fullDataset
    .filter(
      (row) =>
        row[startingField] >= minIncluded && row[startingField] <= maxIncluded
    )
    .filter((row) => row[independentField] <= maxTestNum);

  const uniqX = [...new Set(filtered.map((row) => row[independentField]))].sort(
    numberSort
  );

  let collection = [];
  let ledger = [];
  let sampleSize = 0;

  for (let x of uniqX) {
    const sameTestNum = filtered.filter((row) => row[independentField] === x);
    const sameTestScores = sameTestNum.map((row) => row[scoreField]);
    const scoreRange = [...new Set(sameTestScores)].sort(numberSort);
    let maxFrequency = 0;
    let totalMatches = 0;
    let frequencies = [];

    for (let y of scoreRange) {
      const frequency = sameTestScores.filter((score) => score === y).length;
      totalMatches += frequency;
      if (frequency > maxFrequency) {
        maxFrequency = frequency;
      }

      frequencies.push({ y, count: frequency });
      collection.push({ x, y, frequency });
    }

    if (totalMatches > sampleSize) {
      sampleSize = totalMatches;
    }

    ledger.push({
      x,
      maxFrequency,
      totalMatches,
      scoreRange,
      frequencies,
      scores: sameTestScores,
    });
  }

  const data = collection.map((set) => {
    const helper = ledger.find((tally) => tally.x === set.x);
    const stepPopRatio = helper.totalMatches / sampleSize;
    const stepPopAdjustment = stepPopRatio * 50;
    const stepRatio = set.frequency / helper.totalMatches;

    return {
      ...set,
      size: stepRatio * stepPopAdjustment,
    };
  });

  const xDomain = [0, maxTestNum];
  const yDomain = [1, 36];

  return (
    <Layout>
      <h1>Score Timeline</h1>
      <details open>
        <summary>Filters</summary>
        <ul>
          <li>
            <label htmlFor="scoreField">scoreField</label>{" "}
            <select
              value={scoreField}
              onChange={(e) => setScoreField(e.target.value)}
            >
              {SCORE_KEYS.map((opt) => (
                <option value={opt} selected={opt === scoreField}>
                  {opt}
                </option>
              ))}
            </select>
          </li>
          <li>startingField: {startingField}</li>
          <li>
            <label for="starting_score">Starting Score: {diagScore}</label>
            <input
              type="range"
              id="starting_score"
              name="starting_score"
              min={yDomain[0]}
              max={yDomain[1]}
              value={diagScore}
              onChange={(e) => setDiagScore(parseInt(e.target.value))}
            />
          </li>
          <li>
            Included Range: +/-{binRange} ({minIncluded} - {maxIncluded})
            <input
              type="range"
              id="binRange"
              name="binRange"
              value={binRange}
              min={0}
              max={18}
              onChange={(e) => setBinRange(parseInt(e.target.value))}
            />
          </li>
          <li>maxTestNum: {maxTestNum}</li>
        </ul>
      </details>
      <details>
        <summary>dataset keys</summary>
        <pre>{JSON.stringify(Object.keys(fullDataset[0]), null, 2)}</pre>
      </details>
      <details>
        <summary>sample rows</summary>
        <pre>{JSON.stringify(fullDataset.slice(0, 4), null, 1)}</pre>
      </details>
      <details>
        <summary>sample points</summary>
        <pre>{JSON.stringify(data.slice(0, 4), null, 1)}</pre>
      </details>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1 0 240px" }}>
          <VictoryChart
            theme={VictoryTheme.material}
            domain={{ x: xDomain, y: yDomain }}
            domainPadding={20}
            height={400}
            width={800}
          >
            <VictoryScatter style={{ data: { fill: "#c43a31" } }} data={data} />
          </VictoryChart>
        </div>
        <div style={{ flex: "1 0 240px" }}>
          <VictoryChart
            domain={{ x: xDomain, y: yDomain }}
            domainPadding={20}
            height={400}
            width={800}
          >
            <VictoryBoxPlot
              boxWidth={20}
              data={ledger.map((helper) => ({
                x: helper.x,
                y: helper.scores,
              }))}
            />
          </VictoryChart>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Test Number</th>
            <th>Students</th>
            <th>min</th>
            <th>max</th>
            <th>mean</th>
            <th>median</th>
            <th>mode</th>
            <th>Range</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map((helper) => {
            return (
              <tr key={helper.x}>
                <td>{helper.x}</td>
                <td>{helper.totalMatches}</td>
                <td>{min(helper.scores)}</td>
                <td>{max(helper.scores)}</td>
                <td>{mean(helper.scores).toFixed(2)}</td>
                <td>{median(helper.scores)}</td>
                <td>
                  {mode(helper.scores)} ({helper.maxFrequency})
                </td>
                <td>
                  <details>
                    <table>
                      <thead>
                        <tr>
                          <th>Score</th>
                          <th>Students</th>
                          <th>% of Total</th>
                          <th>or Better #</th>
                          <th>or Better %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {helper.frequencies.map((freq) => {
                          const orBetter = helper.frequencies.filter(
                            (other) => other.y >= freq.y
                          );
                          const orBetterTallyTotal = orBetter.reduce(
                            (total, item) => (total += item.count),
                            0
                          );

                          return (
                            <tr key={freq.y}>
                              <td>{freq.y}</td>
                              <td>{freq.count}</td>
                              <td>
                                {(
                                  (freq.count / helper.totalMatches) *
                                  100
                                ).toFixed(2)}
                                %
                              </td>
                              <td>{orBetterTallyTotal}</td>
                              <td>
                                {(
                                  (orBetterTallyTotal / helper.totalMatches) *
                                  100
                                ).toFixed(2)}
                                %
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </details>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default ScoreTimeline;
