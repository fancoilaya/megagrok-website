"use client";

import { useEffect, useState } from "react";
import { startArenaGame } from "@/game/arena/Game";

export default function ArenaPlayPage() {
  const [showForm, setShowForm] = useState(false);
  const [scoreData, setScoreData] = useState<{
    score: number;
    wave: number;
  } | null>(null);

  useEffect(() => {
    startArenaGame();

    const handler = (e: any) => {
      setScoreData(e.detail);
      setShowForm(true);
    };

    window.addEventListener("arena:submit-score", handler);
    return () => {
      window.removeEventListener("arena:submit-score", handler);
    };
  }, []);

  return (
    <>
      <div
        id="arena-game"
        style={{
          width: "100%",
          height: "100vh",
          background: "#060414"
        }}
      />

      {showForm && scoreData && (
        <div className="arena-overlay">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;

              const name = (form.name as any).value.trim();
              const wallet = (form.wallet as any).value.trim();

              if (!name || !wallet) {
                alert("Name and wallet required");
                return;
              }

              await fetch("/api/leaderboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name,
                  wallet,
                  score: scoreData.score,
                  wave: scoreData.wave
                })
              });

              window.location.reload();
            }}
          >
            <h2>SUBMIT SCORE</h2>
            <input name="name" placeholder="Name" />
            <input name="wallet" placeholder="Solana wallet" />
            <button type="submit">CONFIRM SUBMIT</button>
          </form>
        </div>
      )}
    </>
  );
}
