"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "#0b0b0f",
      padding: "16px",
      borderBottom: "1px solid #1f1f2a"
    }}>
      <Link href="/">MEGAGROK</Link>
    </nav>
  );
}
