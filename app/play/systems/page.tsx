export default function RPGSystemsPage() {
  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <h1>RPG SYSTEMS</h1>
        <p>
          A deeper look into how the MegaGrok Telegram RPG works —
          the systems, logic, and philosophy behind progression.
        </p>
      </section>

      {/* PHILOSOPHY */}
      <section>
        <h2 className="section-title">Core Design Philosophy</h2>

        <div className="panel">
          <p>
            MegaGrok is built around persistence. Your Grok is not disposable,
            seasonal, or reset-based. Decisions compound over time, and long-term
            identity matters more than short-term optimization.
          </p>
        </div>
      </section>

      {/* EVOLUTION */}
      <section style={{ marginTop: 48 }}>
        <h2 className="section-title">Evolution System</h2>

        <div className="grid">
          <div className="panel">
            <h3>Meaningful Stages</h3>
            <p>
              Groks evolve through multiple stages. Evolutions are not cosmetic —
              they define strengths, weaknesses, and how your Grok plays.
            </p>
          </div>

          <div className="panel">
            <h3>Permanent Identity</h3>
            <p>
              Evolution paths are intentional. Choices are designed to matter
              and are not meant to be changed casually.
            </p>
          </div>
        </div>
      </section>

      {/* COMBAT */}
      <section style={{ marginTop: 48 }}>
        <h2 className="section-title">Combat Overview</h2>

        <div className="grid">
          <div className="panel">
            <h3>Turn-Based & Tactical</h3>
            <p>
              Combat is decision-driven. Stats matter, but timing, awareness,
              and understanding your Grok’s role matter just as much.
            </p>
          </div>

          <div className="panel">
            <h3>PvE vs PvP</h3>
            <p>
              PvE focuses on progression and challenge. PvP introduces risk,
              mind games, and competition between Groks.
            </p>
          </div>
        </div>
      </section>

      {/* BALANCE */}
      <section style={{ marginTop: 48 }}>
        <h2 className="section-title">Progression & Balance</h2>

        <div className="panel">
          <p>
            Progression is intentionally paced. Cooldowns, limits, and balance
            systems exist to prevent abuse and reward consistency over spam.
          </p>

          <p style={{ marginTop: 12 }}>
            MegaGrok is designed so skill and commitment outperform brute-force
            grinding.
          </p>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section style={{ marginTop: 48 }}>
        <h2 className="section-title">Connection to the Ecosystem</h2>

        <div className="panel">
          <p>
            The Telegram RPG is the foundation of the MegaGrok universe.
            Characters are born here, and their identity feeds into Arena
            competition, community canon, and future ecosystem rewards.
          </p>
        </div>
      </section>

      {/* BACK LINK */}
      <section style={{ marginTop: 64 }}>
        <a
          href="/play"
          style={{
            fontWeight: 800,
            color: "#ff7a00"
          }}
        >
          ← Back to Telegram RPG overview
        </a>
      </section>
    </main>
  );
}
