"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#0b0b0f",
          borderBottom: "1px solid #1f1f2a"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px"
          }}
        >
          {/* BRAND */}
          <Link
            href="/"
            style={{
              fontWeight: 700,
              letterSpacing: "0.08em"
            }}
          >
            MEGAGROK
          </Link>

          {/* HAMBURGER */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 24
            }}
          >
            ☰
          </button>
        </div>
      </header>

      {/* OVERLAY MENU */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#0b0b0f",
            zIndex: 200,
            padding: "24px"
          }}
        >
          {/* CLOSE */}
          <div style={{ textAlign: "right" }}>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 28
              }}
            >
              ✕
            </button>
          </div>

          {/* NAV LINKS */}
          <nav
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              gap: 24,
              fontSize: 20
            }}
          >
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/play" onClick={() => setOpen(false)}>
              Telegram RPG
            </Link>

            <Link href="/arena" onClick={() => setOpen(false)}>
              Arena
            </Link>

            <Link href="/comic" onClick={() => setOpen(false)}>
              Comic
            </Link>

            <Link href="/token" onClick={() => setOpen(false)}>
              Token
            </Link>

            <Link href="/roadmap" onClick={() => setOpen(false)}>
              Roadmap
            </Link>

            {/* SOCIALS */}
            <a
              href="https://x.com/MegaGrokdev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              X (Official)
            </a>

            <a
              href="https://x.com/i/communities/2006355799371575305"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              X Community
            </a>
          </nav>

          {/* PRIMARY CTA */}
          <div style={{ marginTop: 48 }}>
            <a
              href="https://t.me/megagrok"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "14px 20px",
                background: "#6cf",
                color: "#000",
                borderRadius: 6,
                fontWeight: 600
              }}
            >
              Join Telegram
            </a>
          </div>
        </div>
      )}
    </>
  );
}
