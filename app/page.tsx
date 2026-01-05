export default function HomePage() {
  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <h1>MEGAGROK</h1>
        <p>
          A living universe where players evolve, compete,
          and shape a shared story.
        </p>
      </section>

      {/* ECOSYSTEM */}
      <section>
        <h2 className="section-title">The MegaGrok Ecosystem</h2>

        <div className="grid">
          <a href="/play" className="panel">
            <h3>Telegram RPG</h3>
            <p>
              Awaken a persistent Grok inside Telegram.
              Progress, battle, and evolve through long-term systems
              that define your identity.
            </p>
          </a>

          <a href="/arena" className="panel">
            <h3>The Arena</h3>
            <p>
              Short, intense web battles with daily leaderboard resets.
              Compete for dominance and earn real ecosystem rewards.
            </p>
          </a>

          <a href="/comic" className="panel">
            <h3>Community Comic</h3>
            <p>
              A living canon shaped by player actions.
              Characters, events, and history are forged together.
            </p>
          </a>

          <a href="/token" className="panel">
            <h3>The Token</h3>
            <p>
              A utility-driven economy connecting gameplay,
              competition, and future ecosystem mechanics.
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}
