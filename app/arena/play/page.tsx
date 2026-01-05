"use client";

import { useEffect } from "react";
import { startArenaGame } from "@/game/arena/Game";

export default function ArenaPlayPage() {
  useEffect(() => {
    startArenaGame();
  }, []);

  return (
    <div
      id="arena-game"
      style={{
        width: "100%",
        height: "100vh",
        background: "#060414",
        overflow: "hidden"
      }}
    />
  );
}
