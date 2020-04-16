import React from "react";
import sectionData from "./tagged_and_graded_v1.json";
import { buildReport, asPercent } from "./utils";

const sortTagResults = (a, b) => {
  // Sort by ratio, highest first
  if (a.ratio < b.ratio) return 1;
  if (a.ratio > b.ratio) return -1;

  // Sort by available, highest first
  if (a.available > b.available) return -1;
  if (a.available < b.available) return 1;

  // Sort by correct, highest first
  if (a.correct > b.correct) return -1;
  if (a.correct < b.correct) return 1;
};

const SectionScore = ({ section }) => {
  const report = buildReport(section.answers);
  const nonSkillType = report.tags.find((t) => t.type !== "Skill Tested");
  const bestType = nonSkillType.results.sort(sortTagResults)[0];

  const skillResults = report.tags.find((t) => t.type === "Skill Tested")
    .results.sort(sortTagResults);
  const acedSkills = skillResults.filter((r) => r.correct === r.available);
  const strongSkills = skillResults.filter(
    (r) => r.correct !== r.available && r.ratio >= 0.8
  );
  const growthOpportunities = skillResults
    .filter((r) => r.correct !== r.available && r.ratio < 0.8)
    .reverse(); // weakest stated in wording

  return (
    <section key={section.sectionName} id={section.sectionName}>
      <h2>{section.sectionName}</h2>
      <h3>Score</h3>
      <details style={{ marginBottom: `1rem` }}>
        <summary>View Overview</summary>
        <table style={{ maxWidth: 320 }}>
          <thead>
            <tr>
              <th>Grouping</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Available</td>
              <td>{report.available}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Correct </td>
              <td>{report.correct}</td>
              <td>{asPercent(report.correct, report.available)}</td>
            </tr>
            <tr>
              <td>Incorrect </td>
              <td>{report.incorrect}</td>
              <td>{asPercent(report.incorrect, report.available)}</td>
            </tr>
            <tr>
              <td>Omitted </td>
              <td>{report.omitted}</td>
              <td>{asPercent(report.omitted, report.available)}</td>
            </tr>
          </tbody>
        </table>
      </details>

      <h3>Section Report</h3>

      <div>
        <h4>{nonSkillType.type}</h4>
        <p>
          This section had {nonSkillType.results.length} main{" "}
          {nonSkillType.type.toLowerCase()}s.
        </p>
        <p>
          You did {nonSkillType.results.length > 2 ? "best" : "better"} on{" "}
          {bestType.name} getting {bestType.correct} of {bestType.available}{" "}
          correct.
        </p>
        <details style={{ marginBottom: `1rem` }}>
          <summary>View Breakdown</summary>
          <div>
            <h4>{nonSkillType.type}</h4>
            <table>
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>Available</th>
                  <th>Percentage</th>
                  <th>Correct</th>
                  <th>Incorrect</th>
                  <th>Omitted</th>
                </tr>
              </thead>
              <tbody>
                {nonSkillType.results.sort(sortTagResults).map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td>{r.available}</td>
                    <td>{asPercent(r.correct, r.available)}</td>
                    <td>{r.correct}</td>
                    <td>{r.incorrect}</td>
                    <td>{r.omitted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>

      <div>
        <h4>Skills</h4>
        <p>This section tested {skillResults.length} skills.</p>

        {acedSkills.length > 2 ? (
          <p>
            You aced {acedSkills.length} of these getting all questions correct
            for skills including {acedSkills[0].name}, {acedSkills[1].name}, and{" "}
            {acedSkills[2].name}.
          </p>
        ) : acedSkills.length === 2 ? (
          <p>
            You aced {acedSkills.length} of these getting all questions correct
            for {acedSkills[0].name} and {acedSkills[1].name}.
          </p>
        ) : acedSkills.length === 1 ? (
          <p>
            You did fantastic on {acedSkills[0].name} getting all questions
            correct.
          </p>
        ) : (
                ""
              )}

        {strongSkills.length > 2 ? (
          <p>
            You performed well on {strongSkills.length} skills including{" "}
            {strongSkills[0].name}, {strongSkills[1].name}, and{" "}
            {strongSkills[2].name} getting 80% or more correct.
          </p>
        ) : strongSkills.length === 2 ? (
          <p>
            You performed well on {strongSkills[0].name} and{" "}
            {strongSkills[1].name} questions getting 80% or more correct.
          </p>
        ) : strongSkills.length === 1 ? (
          <p>
            You performed well on {strongSkills[0].name} questions getting 80%
            or more correct.
          </p>
        ) : (
                ""
              )}

        {growthOpportunities.length > 2 ? (
          <p>
            We indentify that you can improve most on{" "}
            {growthOpportunities.length} skills like{" "}
            {growthOpportunities[0].name}, {growthOpportunities[1].name}, and{" "}
            {growthOpportunities[2].name} where you got less than 80% correct.
          </p>
        ) : growthOpportunities.length === 2 ? (
          <p>
            We indentify that you have an opportunity to developing stills
            related to {growthOpportunities[0].name} and{" "}
            {growthOpportunities[1].name} where you got less than 80% correct.
          </p>
        ) : growthOpportunities.length === 1 ? (
          <p>
            We indentify that you have an opportunity to developing stills
            related to {growthOpportunities[0].name} where you got less than 80%
            correct.
          </p>
        ) : (
                ""
              )}

        <details style={{ marginBottom: `1rem` }}>
          <summary>View Breakdown</summary>
          <table>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Available</th>
                <th>Percentage</th>
                <th>Correct</th>
                <th>Incorrect</th>
                <th>Omitted</th>
              </tr>
            </thead>
            <tbody>
              {skillResults.sort(sortTagResults).map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.available}</td>
                  <td>{asPercent(r.correct, r.available)}</td>
                  <td>{r.correct}</td>
                  <td>{r.incorrect}</td>
                  <td>{r.omitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>

      <div>
        <h4>Omissions</h4>
        {report.omitted > 1 ? (
          <p>
            You left {report.omitted} answers blank. For next test, let's
            practice pacing.
          </p>
        ) : (
            <p>
              You were able to answer all questions for this section. Great work!
            </p>
          )}
      </div>

      <h3>Answer Key</h3>
      <details style={{ marginBottom: `1rem` }}>
        <summary>View All Answers</summary>
        <table>
          <thead>
            <tr>
              <th>{`Question #`}</th>
              <th>{`Correct Answer`}</th>
              <th>{`Student Answer`}</th>
              <th>{`Result`}</th>
              <th>{`Skipped`}</th>
              <th>{`Tags`}</th>
            </tr>
          </thead>
          <tbody>
            {section.answers.map((answer) => (
              <tr key={answer.questionPosition}>
                <td>{answer.questionPosition}</td>
                <td>{answer.correctAnswer}</td>
                <td>{answer.studentAnswer}</td>
                <td>{answer.correct ? `Correct` : `Incorrect`}</td>
                <td>{answer.omitted ? `Skipped` : `-`}</td>
                <td>
                  <ul>
                    {answer.tags.map((tag, tagNum) => (
                      <li key={tagNum}>{`${tag.type}: ${tag.name}`}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <hr />
    </section>
  );
};

const ScoreReport = () => {
  return (
    <div style={{ maxWidth: 880, margin: `auto` }}>
      <h1>Sample ACT Score Report</h1>
      <small>
        Note: at this point in development, we are <em>almost</em> done with the scaled scoring.
        <br/>
        As such you will notice it is current missing both here at the top and for each section next to 'Score.'
      </small>
      {sectionData.map((section, sectionIndex) => (
        <SectionScore key={sectionIndex} section={section} />
      ))}
    </div>
  );
};

export default ScoreReport;
