export default function HomePage() {
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
              Daily competitive battles with public leaderboards
              and future rewards.
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
              Utility-driven economics connecting
              gameplay, competition, and rewards.
            </p>
          </a>
        </div>
      </section>

      {/* TOKENOMICS PLACEHOLDER */}
      <section style={{ marginTop: 64 }}>
        <h2 className="section-title">Tokenomics</h2>

        <div className="panel">
          <p>
            Live tokenomics will be published here
            once the MegaGrok token launches.
          </p>

          <p style={{ marginTop: 12, fontSize: 14, opacity: 0.75 }}>
            This section will include:
          </p>

          <ul style={{ marginTop: 12, paddingLeft: 18, opacity: 0.75 }}>
            <li>Contract Address (CA)</li>
            <li>Supply & allocation</li>
            <li>Pump.fun link</li>
            <li>Live token metrics</li>
          </ul>

          <p style={{ marginTop: 12, fontSize: 13, opacity: 0.6 }}>
            No token has launched yet.
            Details will be added transparently at launch.
          </p>
        </div>
      </section>
    </main>
  );
}
