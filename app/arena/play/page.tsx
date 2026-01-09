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
     FULLSCREEN SHELL
  =============================== */
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#060414",
        overflow: "hidden"
      }}
    >
      {/* ===============================
          LAUNCHER — VARIANT B
      =============================== */}
      {view === "launcher" && (
        <div className="arena-overlay">
          <div style={{ maxWidth: 620, textAlign: "center" }}>
            <img
              src="/arena/grok-player.png"
              alt="MegaGrok"
              style={{
                width: 220,
                marginBottom: 28,
                imageRendering: "pixelated",
                filter: "drop-shadow(0 0 18px rgba(0,255,136,0.45))"
              }}
            />

            <h2 style={{ marginBottom: 8 }}>
              THE ARENA
            </h2>

            <p style={{ opacity: 0.9, marginBottom: 20 }}>
              A living universe shaped by players.
            </p>

            <p style={{ marginBottom: 20 }}>
              Survive as many waves as you can.
              <br />
              <strong>
                One life. One run. One score.
              </strong>
            </p>

            <div
              style={{
                fontSize: 14,
                textAlign: "left",
                margin: "0 auto 28px",
                maxWidth: 420,
                lineHeight: 1.7,
                opacity: 0.9
              }}
            >
              <div>
                <strong>🕹 Movement</strong> — WASD / Arrow Keys
              </div>
              <div>
                <strong>⚔ Attack</strong> — Mouse Click / Space
              </div>
              <div>
                <strong>🧠 Survival</strong> — Positioning beats damage
              </div>
              <div>
                <strong>📈 Progression</strong> — Enemies scale every wave
              </div>
              <div>
                <strong>🏆 Ranking</strong> — Leaderboards reset daily
              </div>
            </div>

            <button
              style={{ marginBottom: 8 }}
              onClick={() => {
                setScoreData(null);
                setView("running");
              }}
            >
              START RUN
            </button>

            <div style={{ fontSize: 12, opacity: 0.6 }}>
              Death ends the run.
            </div>
          </div>
        </div>
      )}

      {/* ===============================
          RUN SUMMARY
      =============================== */}
      {view === "summary" && scoreData && (
        <div className="arena-overlay">
          <div style={{ maxWidth: 520, textAlign: "center" }}>
            <h2>RUN COMPLETE</h2>

            <p style={{ marginBottom: 12 }}>
              Final Score
              <br />
              <strong style={{ fontSize: 28 }}>
                {scoreData.score}
              </strong>
            </p>

            <p style={{ marginBottom: 24 }}>
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
      )}

      {/* ===============================
          SUBMIT FORM
      =============================== */}
      {view === "summary-submit" && scoreData && (
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
                headers: {
                  "Content-Type": "application/json"
                },
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

            <input
              name="name"
              placeholder="Player name"
            />
            <input
              name="wallet"
              placeholder="Solana wallet"
            />

            <button type="submit">
              CONFIRM SUBMIT
            </button>

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
      )}

      {/* ===============================
          RUNNING GAME
      =============================== */}
      {view === "running" && (
        <div
          id="arena-game"
          style={{
            width: "100%",
            height: "100%",
            background: "#060414"
          }}
        />
      )}
    </div>
  );
}
