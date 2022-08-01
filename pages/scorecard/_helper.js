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
  "Billed Rev": asDollar,
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
  Consultations: asDecimal,
};

import Link from "next/link";
import { useRouter } from "next/router";

export const LINKS = [
  { href: "/scorecard/overview", label: "Overview" },
  {
    href: "/scorecard/season-strength",
    label: "Seasonality",
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
