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

      {/* TOKEN STATUS */}
      <section style={{ marginTop: 64 }}>
        <h2 className="section-title">MegaGrok Token — Live</h2>

        <div className="panel">
          <p>
            The MegaGrok token is now live.
            Use the official contract address below.
          </p>

          <div
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 8,
              background: "rgba(0,0,0,0.4)",
              fontSize: 13,
              wordBreak: "break-all",
            }}
          >
            <strong>Contract Address</strong>
            <br />
            {CA}
          </div>

          <p style={{ marginTop: 12 }}>
            <a
              href="/token"
              style={{ fontWeight: 700, color: "#ff7a00" }}
            >
              → View token details
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
