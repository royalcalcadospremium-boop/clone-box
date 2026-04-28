"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CreditSaleBanner() {
  const [time, setTime] = useState({ h: 0, m: 25, s: 56 });

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mt-2 flex flex-col items-center gap-3 overflow-hidden rounded-[14px] border border-pink-500/20 bg-gradient-to-r from-[#1c0a14] via-[#14080e] to-[#0f1113] px-5 py-3 sm:flex-row sm:gap-5">
      {/* Countdown */}
      <div className="flex shrink-0 items-center gap-2">
        <p className="hidden text-[11px] font-semibold text-white/45 sm:block">
          Personal credit discounts expires in...
        </p>
        {(["h", "m", "s"] as const).map((key, i) => (
          <div
            key={key}
            className="flex min-w-[42px] flex-col items-center justify-center rounded-[6px] bg-pink-600/90 px-2 py-1"
          >
            <span className="text-[20px] font-black leading-none text-white">
              {pad(time[key])}
            </span>
            <span className="text-[8px] font-semibold uppercase text-white/70">
              {["Hours", "Minutes", "Seconds"][i]}
            </span>
          </div>
        ))}
      </div>

      {/* Text */}
      <div className="flex-1 text-center sm:text-left">
        <p className="text-[14px] font-black text-white">
          PERSONAL CREDIT PACK SALE!{" "}
          <span className="text-pink-400">55% OFF LIMITED OFFER</span>
        </p>
        <p className="mt-0.5 text-[12px] font-medium text-white/50">
          Top-up credits with personal limited offer up to 55% discount and generate more
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/pricing"
        className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-pink-600 px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-pink-500"
      >
        Top-up with 55% OFF ↗
      </Link>
    </section>
  );
}
