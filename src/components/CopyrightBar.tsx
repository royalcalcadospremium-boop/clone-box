import Link from "next/link";

const links = [
  { label: "Press", href: "https://higgsfield.ai/press" },
  { label: "Creative Challenge", href: "https://higgsfield.ai/contests" },
  { label: "Privacy", href: "https://higgsfield.ai/privacy" },
  { label: "Terms", href: "https://higgsfield.ai/terms" },
  { label: "Cookie Notice", href: "https://higgsfield.ai/cookie-notice" },
  { label: "Cookie Settings", href: "https://higgsfield.ai/cookie-settings" },
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
          © 2026 Higgsfield AI™. All rights reserved.
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
