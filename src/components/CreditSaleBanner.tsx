"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const PINK = "237, 21, 114";

const wrapperBg = `linear-gradient(rgba(${PINK}, 0.04) 50%, rgba(${PINK}, 0.2) 100%), rgba(255, 255, 255, 0.03)`;

const ctaBg = `radial-gradient(ellipse 183px 125px at center, rgba(249,32,209,1) 0%, rgba(243,27,162,1) 50%, rgba(237,21,114,1) 100%)`;
const ctaShadow = "0px 12px 24px 0px rgba(255,0,91,0.16), 0px 6px 12px 0px rgba(255,0,91,0.16), 0px -4px 0px 0px inset #c50b7e";
const ctaTextShadow = "0 0 6px rgba(255,255,255,0.45)";

const cellBg = "linear-gradient(180deg, rgba(15,17,19,0.15) 0%, rgba(15,17,19,0.4) 100%)";
const cellShadow = "inset 0 -4px 32px 0 rgba(15,17,19,0.2)";

const numGradient = "linear-gradient(180deg,#FFFFFF 0%,rgba(255,255,255,0.4) 100%)";

function HourglassIcon({ size, color = "currentColor" }: { size: number; color?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color, flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5 3.5H3.75C3.33579 3.5 3 3.16421 3 2.75C3 2.33579 3.33579 2 3.75 2H20.25C20.6642 2 21 2.33579 21 2.75C21 3.16421 20.6642 3.5 20.25 3.5H19V7.45273C19 8.04945 18.6959 8.60505 18.1933 8.92671L13.3913 12L18.1933 15.0733C18.6959 15.395 19 15.9505 19 16.5473V20.5H20.25C20.6642 20.5 21 20.8358 21 21.25C21 21.6642 20.6642 22 20.25 22H3.75C3.33579 22 3 21.6642 3 21.25C3 20.8358 3.33579 20.5 3.75 20.5H5V16.5473C5 15.9505 5.30406 15.395 5.80666 15.0733L10.6087 12L5.80666 8.92671C5.30406 8.60505 5 8.04945 5 7.45273V3.5ZM6.5 7H17.5V3.5H6.5V7ZM17.5 16.5473V18H6.5V16.5473C6.5 16.462 6.54344 16.3827 6.61524 16.3367L12 12.8904L17.3848 16.3367C17.4566 16.3827 17.5 16.462 17.5 16.5473Z" fill="currentColor" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" width={16} height={16} viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 6.25C8 5.55964 8.55964 5 9.25 5H17.75C18.4404 5 19 5.55964 19 6.25V14.75C19 15.4404 18.4404 16 17.75 16C17.0596 16 16.5 15.4404 16.5 14.75V9.26777L7.13388 18.6339C6.64573 19.122 5.85427 19.122 5.36612 18.6339C4.87796 18.1457 4.87796 17.3543 5.36612 16.8661L14.7322 7.5H9.25C8.55964 7.5 8 6.94036 8 6.25Z" fill="currentColor" />
    </svg>
  );
}

export function CreditSaleBanner() {
  const [time, setTime] = useState({ h: 10, m: 39, s: 43 });

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

  const units = [
    { value: pad(time.h), label: "Hours" },
    { value: pad(time.m), label: "Minutes" },
    { value: pad(time.s), label: "Seconds" },
  ];

  return (
    <>
      {/* ── Desktop ──────────────────────────────────────────────────── */}
      <Link
        href="/pricing"
        className="relative mb-6 hidden w-full cursor-pointer overflow-hidden rounded-[20px] text-left transition hover:opacity-95 md:block"
        style={{ background: wrapperBg }}
      >
        {/* Top radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-4 h-24"
          style={{
            background: `radial-gradient(ellipse 70% 100% at 50% 0%, rgba(${PINK}, 0.2) 0%, rgba(${PINK}, 0) 70%)`,
            filter: "blur(12px)",
          }}
        />
        {/* Bottom radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-6 h-20"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 100%, rgba(${PINK}, 0.8) 0%, rgba(${PINK}, 0) 65%)`,
            filter: "blur(18px)",
          }}
        />

        <div className="relative flex items-center gap-6 py-3 pl-3 pr-6">
          {/* Countdown box */}
          <div
            className="relative flex h-24 w-64 shrink-0 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-white/[0.04] p-1.5"
            style={{
              background: `radial-gradient(55.77% 149.71% at 82.94% 100%, rgba(${PINK}, 0.3) 0%, rgba(${PINK}, 0.03) 100%), radial-gradient(46.25% 83.22% at 0.17% 14%, rgba(${PINK}, 0.5) 0%, rgba(${PINK}, 0.05) 100%), linear-gradient(rgba(${PINK}, 0.04) 0%, rgba(${PINK}, 0.4) 100%), rgba(${PINK}, 0.4)`,
              backdropFilter: "blur(8px)",
              boxShadow: "10px 34px 24px 0 rgba(0,0,0,0.15)",
            }}
          >
            {/* Label row */}
            <div className="relative flex shrink-0 items-center gap-2">
              <HourglassIcon size={12} color="white" />
              <span
                className="text-[12px] font-medium leading-[18px]"
                style={{
                  background: numGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Personal credit discounts expires in...
              </span>
            </div>

            {/* Time cells */}
            <div className="relative flex min-h-px w-full flex-1 items-center justify-center gap-1">
              {units.map(({ value, label }) => (
                <div
                  key={label}
                  className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden rounded-[10px] p-2"
                  style={{ background: cellBg, boxShadow: cellShadow }}
                >
                  <span
                    className="font-grotesk text-[24px] font-bold uppercase leading-[30px] tracking-[-0.24px] tabular-nums"
                    style={{
                      background: numGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {value}
                  </span>
                  <span className="text-[12px] font-normal leading-[18px] text-white/50">{label}</span>
                </div>
              ))}
            </div>

            {/* Inner glow overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{ boxShadow: `inset 0 -2px 20px 0 rgba(${PINK}, 0.6), inset 0 2px 10px 0 rgba(${PINK}, 0.4)` }}
            />
          </div>

          {/* Text block */}
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
            <h2 className="w-full font-grotesk text-[24px] font-bold uppercase leading-[30px] tracking-[-0.24px] text-white">
              <span>PERSONAL CREDIT PACK SALE! </span>
              <span style={{ color: "#FF005B" }}>55% OFF LIMITED OFFER</span>
            </h2>
            <p className="w-full text-[14px] font-normal leading-[20px] text-white/40">
              Top-up credits with personal limited offer up to 55% discount and generate more
            </p>
          </div>

          {/* CTA */}
          <span
            className="inline-grid shrink-0 grid-flow-col items-center gap-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-80 active:opacity-60"
            style={{
              height: 48,
              paddingLeft: 24,
              paddingRight: 24,
              paddingBottom: 2,
              backgroundImage: ctaBg,
              boxShadow: ctaShadow,
              textShadow: ctaTextShadow,
            }}
          >
            <span className="font-medium">Top-up with <span className="font-bold">55% OFF</span></span>
            <ArrowUpRightIcon />
          </span>
        </div>
      </Link>

      {/* ── Mobile ───────────────────────────────────────────────────── */}
      <Link
        href="/pricing"
        className="relative mb-6 w-full cursor-pointer overflow-hidden rounded-[20px] text-left transition hover:opacity-95 md:hidden"
        style={{ background: wrapperBg, boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)" }}
      >
        {/* Top glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-8 h-32"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 0%, rgba(${PINK}, 0.25) 0%, rgba(${PINK}, 0) 70%)`,
            filter: "blur(18px)",
          }}
        />
        {/* Bottom glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-8 h-24"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 100%, rgba(${PINK}, 0.8) 0%, rgba(${PINK}, 0) 65%)`,
            filter: "blur(24px)",
          }}
        />

        {/* Title block */}
        <div className="relative flex w-full flex-col items-start p-4">
          <div className="flex w-full flex-col items-start gap-2">
            <h2 className="w-full font-grotesk text-[32px] font-bold uppercase leading-[40px] tracking-[-0.8px] text-white">
              <span>PERSONAL CREDIT PACK SALE! </span>
              <span style={{ color: "#FF005B" }}>55% OFF PERSONAL OFFER</span>
            </h2>
            <p className="w-full text-[12px] font-normal leading-[18px] text-white/50">
              Top-up credits with personal limited offer up to 55% discount and generate more
            </p>
          </div>
        </div>

        {/* Countdown + button */}
        <div className="relative flex w-full flex-col items-start gap-4 px-3 pb-3">
          {/* Countdown box */}
          <div
            className="relative flex w-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.04] px-2 pb-2 pt-3"
            style={{
              background: `radial-gradient(at 50% 83%, rgba(${PINK}, 0.2) 0%, rgba(${PINK}, 0) 70%), linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 100%)`,
            }}
          >
            <div className="flex shrink-0 items-center gap-2">
              <HourglassIcon size={16} color="#FF005B" />
              <span className="text-[14px] font-normal leading-[20px]" style={{ color: "#FF005B" }}>
                Personal credit discounts expires in...
              </span>
            </div>
            <div className="flex w-full items-center justify-center gap-1">
              {units.map(({ value, label }) => (
                <div
                  key={label}
                  className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[10px] p-2"
                  style={{ background: cellBg, boxShadow: cellShadow }}
                >
                  <span
                    className="font-grotesk text-[32px] font-bold uppercase leading-[48px] tracking-[-0.8px] tabular-nums"
                    style={{
                      background: "linear-gradient(180deg,#FFFFFF 0%,rgba(255,255,255,0.25) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {value}
                  </span>
                  <span className="text-[14px] font-normal leading-[20px] text-white/40">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA full width */}
          <span
            className="inline-grid w-full grid-flow-col items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-80 active:opacity-60"
            style={{
              height: 48,
              paddingBottom: 2,
              backgroundImage: ctaBg,
              boxShadow: ctaShadow,
              textShadow: ctaTextShadow,
            }}
          >
            <span className="font-medium">Top-up with <span className="font-bold">55% OFF</span></span>
            <ArrowUpRightIcon />
          </span>
        </div>

        {/* Inner overlay glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ boxShadow: `inset 0 1px 64px 0 rgba(${PINK}, 0.32)` }}
        />
      </Link>
    </>
  );
}
