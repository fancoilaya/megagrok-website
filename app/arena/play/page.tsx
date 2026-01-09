"use client";

import { useEffect, useRef, useState } from "react";
import { startArenaGame } from "@/game/arena/Game";

type ArenaView =
  | "launcher"
  | "running"
  | "summary"
  | "summary-submit";

export default function ArenaPlayPage() {
  const [view, setView] = useState<ArenaView>("launcher");
  const [scoreData, setScoreData] = useState<{
    score: number;
    wave: number;
  } | null>(null);

  const gameStartedRef = useRef(false);

  /* ===============================
     PHASER → REACT BRIDGE
  =============================== */
  useEffect(() => {
    const handler = (e: any) => {
      setScoreData(e.detail);
      setView("summary");
    };

    window.addEventListener("arena:submit-score", handler);
    return () => {
      window.removeEventListener("arena:submit-score", handler);
    };
  }, []);

  /* ===============================
     START GAME (ON DEMAND)
  =============================== */
  useEffect(() => {
    if (view === "running" && !gameStartedRef.current) {
      gameStartedRef.current = true;
      startArenaGame();
    }
  }, [view]);

  /* ===============================
     LAUNCHER
  =============================== */
  if (view === "launcher") {
    return (
      <div className="arena-overlay">
        <div style={{ maxWidth: 520 }}>
          <h2>THE ARENA</h2>

          <p style={{ marginBottom: 16 }}>
            Survive as many waves as you can.
            <br />
            One life. One run. One score.
          </p>

          <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 20 }}>
            Enemies scale every wave.
            <br />
            Higher waves mean higher rank.
            <br />
            Leaderboards reset daily.
          </p>

          <button
            onClick={() => {
              setScoreData(null);
              setView("running");
            }}
          >
            START RUN
          </button>
        </div>
      </div>
    );
  }

  /* ===============================
     RUN SUMMARY
  =============================== */
  if (view === "summary" && scoreData) {
    return (
      <div className="arena-overlay">
        <div style={{ maxWidth: 520 }}>
          <h2>RUN COMPLETE</h2>

          <p style={{ marginBottom: 12 }}>
            Final Score:
            <br />
            <strong style={{ fontSize: 24 }}>
              {scoreData.score}
            </strong>
          </p>

          <p style={{ marginBottom: 20 }}>
            Wave Reached:{" "}
            <strong>{scoreData.wave}</strong>
          </p>

          <button
            style={{ marginBottom: 12 }}
            onClick={() => setView("summary-submit")}
          >
            SUBMIT SCORE
          </button>

          <button
            className="skip"
            onClick={() => {
              gameStartedRef.current = false;
              setView("launcher");
            }}
          >
            BACK TO PORTAL
          </button>
        </div>
      </div>
    );
  }

  /* ===============================
     SUBMIT FORM
  =============================== */
  if (view === "summary-submit" && scoreData) {
    return (
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

            gameStartedRef.current = false;
            setView("launcher");
          }}
        >
          <h2>SUBMIT SCORE</h2>
          <input name="name" placeholder="Player name" />
          <input name="wallet" placeholder="Solana wallet" />
          <button type="submit">CONFIRM SUBMIT</button>

          <button
            type="button"
            className="skip"
            onClick={() => {
              gameStartedRef.current = false;
              setView("launcher");
            }}
          >
            SKIP
          </button>
        </form>
      </div>
    );
  }

  /* ===============================
     RUNNING GAME
  =============================== */
  return (
    <div
      id="arena-game"
      style={{
        width: "100%",
        height: "100vh",
        background: "#060414"
      }}
    />
  );
}
