import Link from "next/link";
import { useRouter } from "next/router";

export const LINKS = [
  { href: "/", label: "Home", description: "You're already here." },
  {
    href: "/act-population",
    label: "ACT Population",
    description: "Examine population wide ACT metrics.",
  },
  {
    href: "/act-timeline",
    label: "ACT Timeline",
    description: "Ponder the miracle of student achievement overtime.",
  },
];

const Menu = () => {
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

export default Menu;
