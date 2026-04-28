import Link from "next/link";
import { ChevronDown } from "lucide-react";

/* ── Logo SVG ─────────────────────────────────────────────────────────── */
function HiggsLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Higgsfield logo"
    >
      {/* Rounded square background */}
      <rect width="28" height="28" rx="7" fill="#1c1e20" />
      {/* Stylised "H" letterform */}
      <path
        d="M8 8h3v5h6V8h3v12h-3v-5H11v5H8V8Z"
        fill="#f7f7f8"
      />
    </svg>
  );
}

/* ── Badge helpers ────────────────────────────────────────────────────── */
function BadgeNew() {
  return (
    <span className="bg-hf-neon text-[#13151a] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide leading-none">
      New
    </span>
  );
}

function BadgeVersion({ label }: { label: string }) {
  return (
    <span className="bg-white/10 text-white/50 text-[10px] px-1 py-0.5 rounded leading-none">
      {label}
    </span>
  );
}

function BadgeSale({ label }: { label: string }) {
  return (
    <span className="bg-[#db3f3e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase leading-none">
      {label}
    </span>
  );
}

/* ── Nav link shape ───────────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href?: string;
  active?: boolean;
  chevron?: boolean;
  badge?: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Explore", href: "/", active: true },
  { label: "Image", href: "/ai/image", chevron: true },
  { label: "Video", href: "/ai/video", chevron: true },
  { label: "Audio", href: "/audio" },
  { label: "Collab", href: "/chat" },
  { label: "Edit", href: "https://higgsfield.ai/edit", chevron: true },
  { label: "Character", href: "https://higgsfield.ai/character" },
  { label: "Marketing Studio", href: "/marketing-studio/app", badge: <BadgeNew /> },
  { label: "Cinema Studio", href: "/cinema-studio", badge: <BadgeVersion label="3.5" /> },
  { label: "Originals", href: "/original-series", badge: <BadgeNew /> },
  { label: "Apps", href: "/apps" },
  { label: "Assist", href: "/chat" },
  { label: "Pricing", href: "/pricing", badge: <BadgeSale label="30% OFF" /> },
];

/* ── Main export ──────────────────────────────────────────────────────── */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 bg-hf-bg backdrop-blur-sm border-b border-hf-border">
      <nav
        className="grid grid-cols-[auto_1fr_auto] items-center pr-4 h-full container"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 pr-4 flex-shrink-0"
          aria-label="Higgsfield home"
        >
          <HiggsLogo />
          <span className="font-bold text-[18px] text-hf-text md:hidden">
            Higgsfield
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul
          id="header__menu_list"
          className="hidden h-full md:flex items-center gap-0 overflow-x-auto hide-scrollbar list-none m-0 p-0"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href ?? "#"}
                className={[
                  "py-1 px-3 rounded-xl text-body-s font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors duration-150",
                  item.active
                    ? "text-[#f7f7f8]"
                    : "text-[rgba(255,255,255,0.6)] hover:text-[#f7f7f8]",
                ].join(" ")}
              >
                {item.label}
                {item.chevron && (
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    className="opacity-60 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                {item.badge}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Login + Sign up */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Link
            href="#login"
            className="text-hf-neon bg-transparent font-medium text-sm px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
          >
            Login
          </Link>
          <Link
            href="#signup"
            className="bg-hf-neon text-[#13151a] font-bold text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
