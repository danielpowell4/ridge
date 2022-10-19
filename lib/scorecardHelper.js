export const asDecimal = new Intl.NumberFormat("en-US", {
  style: "decimal",
});
export const asPercent = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
});
export const asDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencySign: "accounting",
});

export const FORMATTERS = {
  "Billed Items": asDollar,
  "Active Families": asDecimal,
  "Approved Hours": asDecimal,
  "Hour per Client": asDecimal,
  "Active Tutors": asDecimal,
  "Online %": asPercent,
  "Salaried Coach %": asPercent,
  "SAT/ACT Hours %": asPercent,
  "Tutor Pay Rate %": asPercent,
  "Avg Online Bill Rate": asDollar,
  "Avg In-Person Bill Rate": asDollar,
  "Client Referrals": asDecimal,
  "Contact Us Forms": asDecimal,
  "Projects Added": asDecimal,
  "1st Consultations": asDecimal,
};

import Link from "next/link";
import { useRouter } from "next/router";

export const LINKS = [
  { href: "/scorecard/overview", label: "Overview" },
  {
    href: "/scorecard/trends",
    label: "Trends",
  },
];

export const Nav = () => {
  const router = useRouter();

  return (
    <nav
      style={{
        padding: ".85rem 1.5rem",
        boxShadow: "0 1px 1px rgba(0,0,0,.15)",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {LINKS.map((item) => (
        <Link key={item.href} href={item.href}>
          <a
            style={
              router.pathname === item.href
                ? { color: "var(--grey)", textDecoration: "underline" }
                : {}
            }
          >
            {item.label}
          </a>
        </Link>
      ))}
    </nav>
  );
};

import styles from "../pages/scorecard/styles.module.css";
export const THIS_YEAR = 2022;

export const DataTable = ({
  recentWeeks,
  lastYearWeeks,
  activeWeekNum,
  compareYear,
  attributes,
  displayType,
  absoluteFormatter,
}) => {
  const totalAttribute = attributes[0]; // first assumed

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Attribute</td>
          {lastYearWeeks.map((week, weekIndex) => (
            <td key={weekIndex}>
              Wk {week["SY Week"]} - {compareYear}
            </td>
          ))}
          <td />
          {recentWeeks.map((week, weekIndex) => (
            <td key={weekIndex}>
              Wk {week["SY Week"]} - {THIS_YEAR}
            </td>
          ))}
          <td />
          {lastYearWeeks.map((week, weekIndex) => (
            <td key={weekIndex}>Wk {week["SY Week"]} %</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {attributes.map((attr) => {
          return (
            <tr key={attr}>
              <td>{attr}</td>
              {lastYearWeeks.map((week, weekIndex) => (
                <td
                  key={weekIndex}
                  className={
                    week["SY Week"] == activeWeekNum &&
                    styles.activeLastYearWeek
                  }
                >
                  {displayType === "Absolute"
                    ? absoluteFormatter.format(week[attr])
                    : asPercent.format(week[attr] / week[totalAttribute])}
                </td>
              ))}
              <td></td>
              {recentWeeks.map((week, weekIndex) => (
                <td
                  key={weekIndex}
                  className={
                    week["SY Week"] == activeWeekNum && styles.activeWeek
                  }
                >
                  {displayType === "Absolute"
                    ? absoluteFormatter.format(week[attr])
                    : asPercent.format(week[attr] / week[totalAttribute])}
                </td>
              ))}
              <td></td>
              {recentWeeks.map((week, weekIndex) => {
                const lastYearWeek = lastYearWeeks.find(
                  (lastWeek) => lastWeek["SY Week"] === week["SY Week"]
                );
                const thisYear = week[attr];
                const lastYear = lastYearWeek[attr];
                const thisYearRel = thisYear / week[totalAttribute];
                const lastYearRel = lastYear / lastYearWeek[totalAttribute];

                return (
                  <td
                    key={weekIndex}
                    className={`${
                      week["SY Week"] == activeWeekNum && styles.activeWeek
                    }`}
                  >
                    {displayType === "Absolute"
                      ? asPercent.format((thisYear - lastYear) / lastYear)
                      : asPercent.format(thisYearRel - lastYearRel)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
