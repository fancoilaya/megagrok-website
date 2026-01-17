export default function HomePage() {
  const CA = "BZjZyo5Zr18iP6YJEuPaS3oy791GhMzatNxtXfMLpump";

  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <h1>MEGAGROK</h1>
        <p>
          A living universe where players evolve,
          compete, and shape a shared story.
        </p>
      </section>

      {/* ECOSYSTEM */}
      <section>
        <h2 className="section-title">The MegaGrok Ecosystem</h2>

        <div className="grid">
          <a href="/play" className="panel">
            <h3>Telegram RPG</h3>
            <p>
              Persistent Groks, evolution, PvE and PvP —
              all inside Telegram.
            </p>
          </a>

          <a href="/arena" className="panel">
            <h3>The Arena</h3>
            <p>
              Competitive PvP battles with rankings,
              ELO, and seasonal tournaments.
            </p>
          </a>

          <a href="/comic" className="panel">
            <h3>The Comic</h3>
            <p>
              The canonical origin and evolving story
              shaped by player actions.
            </p>
          </a>

          <a href="/token" className="panel">
            <h3>The Token</h3>
            <p>
              Live MegaGrok token powering rewards,
              airdrops, and future utility.
            </p>
          </a>
        </div>
      </section>

{/* TOKEN SPOTLIGHT */}
<section style={{ marginTop: 64 }}>
  <h2 className="section-title">🚀 MegaGrok Token — LIVE</h2>

  <div
    className="panel"
    style={{
      border: "3px solid #ff7a00",
      boxShadow: "0 0 30px rgba(255,122,0,0.35)",
    }}
  >
    <p style={{ fontSize: 16, marginBottom: 12 }}>
      The official MegaGrok token is now live.
      Always verify the contract address below.
    </p>

    {/* CA BOX */}
    <div
      style={{
        marginTop: 16,
        padding: 16,
        borderRadius: 10,
        background: "rgba(0,0,0,0.65)",
        border: "1px solid rgba(255,122,0,0.6)",
        wordBreak: "break-all",
        fontWeight: 700,
        fontSize: 14,
      }}
      id="megagrok-ca"
    >
      BZjZyo5Zr18iP6YJEuPaS3oy791GhMzatNxtXfMLpump
    </div>

    {/* ACTION BUTTONS */}
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        marginTop: 16,
      }}
    >
      {/* COPY BUTTON */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            "BZjZyo5Zr18iP6YJEuPaS3oy791GhMzatNxtXfMLpump"
          );
          alert("Contract address copied!");
        }}
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          background: "#ff7a00",
          color: "#000",
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
        }}
      >
        📋 Copy CA
      </button>

      {/* PUMP.FUN LINK */}
      <a
        href="https://pump.fun/coin/BZjZyo5Zr18iP6YJEuPaS3oy791GhMzatNxtXfMLpump"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          background: "rgba(255,122,0,0.15)",
          border: "2px solid #ff7a00",
          color: "#ff7a00",
          fontWeight: 800,
          textDecoration: "none",
        }}
      >
        🔗 View on Pump.fun
      </a>
    </div>

    <p style={{ marginTop: 12, fontSize: 13, opacity: 0.75 }}>
      Chain: Solana · Launch platform: Pump.fun
    </p>

    <p style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
      ⚠️ Only trust this contract address. Beware of impostors.
    </p>
  </div>
</section>



      {/* ROADMAP */}
      <section style={{ marginTop: 64 }}>
        <h2 className="section-title">Roadmap</h2>

        <a href="/roadmap" className="panel">
          <h3>MegaGrok Roadmap</h3>
          <p>
            Explore the evolution of the MegaGrok universe —
            RPG systems, Arena PvP, lore expansion, and ecosystem growth.
          </p>

          <p style={{ marginTop: 10, fontWeight: 700, color: "#ff7a00" }}>
            → View the Roadmap
          </p>
        </a>
      </section>

     
    </main>
  );
}
