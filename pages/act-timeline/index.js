import * as React from "react";
import { Layout, Histogram } from "../../components";

// see https://github.com/privateprep/dashboard-reports/blob/main/test_progression/act_score_predictor.rb
import fullDataset from "./actAchievement-Ap1022.json";

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

const MAX_SCORE = 36;
const SCORE_KEYS = ["Composite", "English", "Math", "Reading", "Science"];

const pointsCaptured = (diagScore, score) => {
  const pointsPossible = MAX_SCORE - diagScore;
  if (pointsPossible == 0) return 0;

  const pointsAchieved = score - diagScore;
  const ppc = (pointsAchieved / pointsPossible) * 100;
  return ppc.toFixed(2);
};

const PointsCapturedTable = ({ diagScore }) => {
  let possibleScores = [];
  for (let score = diagScore; score <= MAX_SCORE; score++) {
    possibleScores.push(score);
  }

  return (
    <div>
      <h2>Percent Points Captured</h2>
      <table>
        <tbody>
          <tr>
            {possibleScores.map((score) => (
              <td key={score}>{score}</td>
            ))}
          </tr>
          <tr>
            {possibleScores.map((score) => (
              <td key={score}>{pointsCaptured(score)}%</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ProgressTable = ({ ledger }) => {
  const [crowdPercent, setCrowdPercent] = React.useState(50); // the median
  const crowdThreshold = Number((crowdPercent / 100).toFixed(2));

  return (
    <div>
      <h2>Progress by Test</h2>
      <ul style={{ listStyle: "none" }}>
        <li>
          <input
            type="range"
            id="crowdPercent"
            name="crowdPercent"
            min="5"
            max="95"
            value={crowdPercent}
            onChange={(e) => setCrowdPercent(parseInt(e.target.value))}
            step="5"
          />
          <label htmlFor="crowdPercent">
            Crowd Size: {crowdPercent}% of Students
          </label>
          <small style={{ marginLeft: "1rem" }}>
            Q1: 75%, Median: 50%, Q3: Top 25%
          </small>
        </li>
      </ul>
      <table>
        <thead>
          <tr>
            <th>Test Number</th>
            <th>
              Crowd Score
              <br />
              (this or better)
            </th>
            <th>Crowd Size</th>
            <th>All Students</th>
            <th>Median</th>
            <th>Mean</th>
            <th>Mode</th>
            <th>Min</th>
            <th>Max</th>
            <th>Range</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map((helper) => {
            let orBetterTally = {};
            for (let freq of helper.frequencies) {
              const orBetter = helper.frequencies.filter(
                (other) => other.y >= freq.y
              );
              const orBetterCount = orBetter.reduce(
                (total, item) => (total += item.count),
                0
              );
              orBetterTally[freq.y] = orBetterCount;
            }
            let crowdScores = [];
            for (let y in orBetterTally) {
              const orBetterRatio = orBetterTally[y] / helper.totalMatches;
              if (orBetterRatio > crowdThreshold) {
                crowdScores.push(y);
              }
            }
            let crowdY = Math.max(...crowdScores, 0);

            return (
              <tr key={helper.x}>
                <td>{helper.x}</td>
                <td>{crowdY}</td>
                <td>
                  {(
                    (orBetterTally[crowdY] / helper.totalMatches) *
                    100
                  ).toFixed(2)}
                  {"% - "}
                  {orBetterTally[crowdY]} Students
                </td>
                <td>{helper.totalMatches}</td>
                <td>{median(helper.scores)}</td>
                <td>{mean(helper.scores).toFixed(2)}</td>
                <td>
                  {mode(helper.scores)} ({helper.maxFrequency})
                </td>
                <td>{min(helper.scores)}</td>
                <td>{max(helper.scores)}</td>
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
    </div>
  );
};

const TopScoreHistogram = ({ topScores }) => {
  return (
    <div>
      <Histogram
        dataset={topScores.map((score) => ({ score }))} // expects array of objects
        steps={7}
        attr="score"
      />
      <label>Top Real Scores (n = {topScores.length})</label>
    </div>
  );
};

const TopScoreTable = ({ topScores, diagScore }) => {
  const topScoreCount = topScores.length;
  if (!topScoreCount) return <p>No matching real tests</p>;

  let topScoreTally = {};

  for (let score of topScores) {
    let prev = topScoreTally[score] || 0;
    topScoreTally[score] = prev + 1;
  }

  const uniqScores = Object.keys(topScoreTally).sort(numberSort);

  return (
    <table>
      <thead>
        <tr>
          <th>Score</th>
          <th>%PC</th>
          <th>Students %</th>
          <th>Students #</th>
        </tr>
      </thead>
      <tbody>
        {uniqScores.map((score) => (
          <tr key={score}>
            <td>{score}</td>
            <td>{pointsCaptured(diagScore, score)}%</td>
            <td>
              {((topScoreTally[score] / topScoreCount) * 100).toFixed(2)}%
            </td>
            <td>{topScoreTally[score]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ScoreTimeline = () => {
  const [diagScore, setDiagScore] = React.useState(25);
  const [scoreField, setScoreField] = React.useState(SCORE_KEYS[0]);
  const [binRange, setBinRange] = React.useState(0); // for grace
  const [maxX, setMaxX] = React.useState(12);
  const [minHours, setMinHours] = React.useState(15);

  const xField = "Test Number";
  const hourField = "Total Hours";

  const startingField = `Diag ${scoreField}`;

  const minIncluded = diagScore - binRange;
  const maxIncluded = diagScore + binRange;

  const absoluteMaxX = max(fullDataset.map((row) => row[xField]));
  const absoluteMaxHours = max(fullDataset.map((row) => row[hourField]));

  const filtered = fullDataset
    .filter((row) => row[xField] <= maxX)
    .filter(
      (row) =>
        row[startingField] >= minIncluded &&
        row[startingField] <= maxIncluded &&
        row[hourField] > minHours
    );
  const uniqX = [...new Set(filtered.map((row) => row[xField]))].sort(
    numberSort
  );

  let collection = [];
  let ledger = [];
  let sampleSize = 0;

  for (let x of uniqX) {
    const sameTestNum = filtered.filter((row) => row[xField] === x);
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

  const studentIds = [...new Set(filtered.map((row) => row["Student ID"]))];
  const topScores = studentIds
    .map((studentId) => {
      const studentRows = filtered.filter(
        (row) => row["Student ID"] === studentId
      );
      const realScores = studentRows
        .filter((row) => row["Result Type"] === "Real")
        .map((row) => row[scoreField]);
      return Math.max(...realScores);
    })
    .filter((top) => top > 0); // clear null

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

  const xDomain = [0, maxX];
  const yDomain = [1, 36];

  return (
    <Layout>
      <h1>ACT Timeline</h1>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <h3>Filters</h3>
          <ul>
            <li>
              <label htmlFor="scoreField">scoreField</label>{" "}
              <select
                value={scoreField}
                onChange={(e) => setScoreField(e.target.value)}
              >
                {SCORE_KEYS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </li>
            <li>startingField: {startingField}</li>
            <li>
              <label htmlFor="starting_score">
                Starting Score: {diagScore}
              </label>
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
            <li>
              <label htmlFor="maxX">
                {xField} max: {maxX}
              </label>
              <input
                type="range"
                id="maxX"
                name="maxX"
                value={maxX}
                min={0}
                max={absoluteMaxX}
                onChange={(e) => setMaxX(parseInt(e.target.value))}
              />
            </li>
            <li>
              <label htmlFor="minHours">At least {minHours} Hours</label>
              <input
                type="range"
                id="minHours"
                name="minHours"
                value={minHours}
                min={0}
                max={absoluteMaxHours}
                onChange={(e) => setMinHours(parseInt(e.target.value))}
              />
            </li>
          </ul>
        </div>
        <div style={{ flex: "0 0 260px" }}>
          <TopScoreHistogram topScores={topScores} />
        </div>
        <div style={{ flex: "1 0 260px" }}>
          <TopScoreTable diagScore={diagScore} topScores={topScores} />
        </div>
      </div>
      <hr />
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
      <PointsCapturedTable diagScore={diagScore} />
      <ProgressTable ledger={ledger} />
    </Layout>
  );
};

export default ScoreTimeline;
