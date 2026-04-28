import Link from "next/link";

const links = [
  { label: "Press", href: "/about" },
  { label: "Creative Challenge", href: "/earn" },
  { label: "Privacy", href: "/trust" },
  { label: "Terms", href: "/trust" },
  { label: "Cookie Notice", href: "/trust" },
  { label: "Cookie Settings", href: "/trust" },
];

export function CopyrightBar() {
  return (
    <footer className="w-full bg-hf-bg" style={{ height: 68 }}>
      <nav
        className="flex h-full items-center justify-between"
        style={{
          width: "100%",
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <p className="text-[13px] text-hf-text-muted">
          © 2026 Ninja Box™. All rights reserved.
        </p>
        <ul className="hidden items-center sm:flex" style={{ gap: 24, listStyle: "none" }}>
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[13px] text-hf-text-muted transition-colors duration-150 hover:text-hf-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
