import React from "react";
import "./Utilization.css";

const weeklyHours = [
  [1, 2, 7, 4, 5, 2, 1],
  [2, 3, 3, 4, 5, 2, 0],
  [4, 5, 3, 0, 5, 6, 3],
  [2, 1, 3, 4, 2, 6, 2],
];

// date_range = 3.weeks.ago.beginning_of_week..Time.current.end_of_week
// lesson

const Utilization = props => {
  const allDays = weeklyHours.flat();
  const monthlyMax = Math.max(...allDays) * 1.05;
  const monthlyTotal = allDays.reduce((total, num) => total + num, 0);
  const getIndiatorStyle = hours => {
    if (hours > 0) {
      const proportion = Math.floor((hours / monthlyMax) * 20);
      const circleSize = proportion < 6 ? 3 + proportion : proportion;
      return { width: circleSize, height: circleSize };
    }
  };

  return (
    <>
      <section className="activity-overview">
        <div className="activity-count">
          <h3 className="text-footnote">Last 4 weeks</h3>
          <div className="count-total">
            <h1 className="count">{monthlyTotal}</h1>
            <p className="count-label">Total Hours</p>
          </div>
        </div>
        <div className="activity-calendar">
          <table>
            <thead>
              <tr>
                {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                  <th key={i} scope="col">
                    <div className="weekday">{day}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyHours.map((week, i) => (
                <tr key={i}>
                  {week.map((day, j) => (
                    <td key={j} className="day-wrapper">
                      <span className="day">{day}</span>
                      <span
                        className={`activity-indicatior ${
                          day === 0 ? "activity-indicatior--empty" : ""
                        }`}
                        style={getIndiatorStyle(day)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="activity-breakdown">
          <figure>
            <figcaption>
              <dl className="legend">
                <dd>
                  <h3 className="text-footnote">Weekly Totals</h3>
                </dd>
              </dl>
            </figcaption>
            <dl className="week-breakdown">
              {weeklyHours.map((week, i) => {
                const weekTotal = week.reduce((total, num) => total + num, 0);
                return (
                  <>
                    <dt className="week vh">Week {i + 1}</dt>
                    <dd className="hours">
                      <ul
                        className="hour-breakdown"
                        style={{
                          width: `${(150 * weekTotal) / monthlyTotal}%`,
                        }}
                      >
                        <li
                          className="bar-graph"
                          style={{ width: "100%" }}
                          tabindex="0"
                        />
                      </ul>
                      <div className="hour-total">
                        <span className="vh">Total</span> {`${weekTotal} `}
                        <abbr className="unit" title="hour">
                          hr
                        </abbr>
                      </div>
                    </dd>
                  </>
                );
              })}
            </dl>
          </figure>
        </div>
      </section>
    </>
  );
};

export default Utilization;
