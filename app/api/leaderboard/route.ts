import { NextResponse } from "next/server";

type Entry = {
  name: string;
  wallet: string;
  score: number;
  wave: number;
  timestamp: number;
};

// In-memory store (v1)
let leaderboard: Entry[] = [];

// DAILY RESET (UTC)
let lastReset = new Date().toISOString().slice(0, 10);

function resetIfNeeded() {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== lastReset) {
    leaderboard = [];
    lastReset = today;
  }
}

// GET: fetch top 10
export async function GET() {
  resetIfNeeded();

  const publicBoard = leaderboard
    .sort((a, b) => b.score - a.score || a.timestamp - b.timestamp)
    .slice(0, 10)
    .map(({ name, score, wave }) => ({ name, score, wave }));

  return NextResponse.json(publicBoard);
}

// POST: submit score
export async function POST(req: Request) {
  resetIfNeeded();

  const body = await req.json();

  const { name, wallet, score, wave } = body;

  // Basic validation
  if (
    typeof name !== "string" ||
    typeof wallet !== "string" ||
    typeof score !== "number" ||
    typeof wave !== "number"
  ) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  leaderboard.push({
    name: name.slice(0, 16),
    wallet,
    score,
    wave,
    timestamp: Date.now()
  });

  return NextResponse.json({ ok: true });
}
