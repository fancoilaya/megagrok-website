export default function ArenaPage() {
  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <h1>THE ARENA</h1>
        <p>
          A daily competitive battleground.
          Skill decides rank. Rank decides rewards.
        </p>
      </section>

      {/* RESET COUNTDOWN */}
      <section>
        <h2 className="section-title">Next Reset</h2>

        <div className="panel" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, opacity: 0.8 }}>Leaderboard resets in</p>
          <div
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: 42,
              letterSpacing: "0.12em",
              marginTop: 8
            }}
          >
            04 : 12 : 33
          </div>
          <p style={{ marginTop: 8, fontSize: 13, opacity: 0.7 }}>
            Reset occurs daily at 00:00 UTC
          </p>
        </div>
      </section>

      {/* TODAY'S LEADERBOARD */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Today’s Leaderboard</h2>

        <div className="panel">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14
            }}
          >
            <thead>
              <tr style={{ opacity: 0.75 }}>
                <th align="left">#</th>
                <th align="left">Player</th>
                <th align="right">Score</th>
                <th align="left">Wallet</th>
                <th align="right">Reward</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <td>{i + 1}</td>
                  <td>—</td>
                  <td align="right">—</td>
                  <td>—</td>
                  <td align="right">—</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ marginTop: 12, fontSize: 13, opacity: 0.6 }}>
            Top 10 scores reset daily. Ties are resolved by earliest submission.
          </p>
        </div>
      </section>

      {/* REWARD POOL */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Today’s Reward Pool</h2>

        <div className="panel">
          <p>
            Arena rewards are derived from ecosystem activity and creator inflows.
          </p>

          <p style={{ marginTop: 12, opacity: 0.8 }}>
            Reward Status: <strong>Inactive</strong>
          </p>

          <p style={{ marginTop: 12, fontSize: 14, opacity: 0.7 }}>
            Dev Wallet:
            <br />
            <span style={{ wordBreak: "break-all" }}>
              DEV_WALLET_ADDRESS_PLACEHOLDER
            </span>
          </p>

          <p style={{ marginTop: 12, fontSize: 13, opacity: 0.6 }}>
            Rewards will become active after token launch.
            All payouts will be publicly verifiable.
          </p>
        </div>
      </section>

      {/* ARENA CHAMPIONS */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Arena Champions</h2>

        <div className="panel">
          <p style={{ marginBottom: 12 }}>
            Recent daily winners will appear here once the Arena goes live.
          </p>

          <ul style={{ paddingLeft: 18, fontSize: 14, opacity: 0.75 }}>
            <li>— No history yet</li>
            <li>— Arena launching soon</li>
            <li>— Compete to become the first champion</li>
          </ul>
        </div>
      </section>

      {/* GAME PLACEHOLDER */}
      <section style={{ marginTop: 64 }}>
        <div className="panel" style={{ textAlign: "center" }}>
          <h3>Arena Game</h3>
          <p style={{ marginTop: 8 }}>
            The Arena game is currently under reconstruction.
          </p>
          <p style={{ marginTop: 8, fontSize: 14, opacity: 0.7 }}>
            Gameplay will be reintroduced once the system is finalized.
          </p>
        </div>
      </section>
    </main>
  );
}
