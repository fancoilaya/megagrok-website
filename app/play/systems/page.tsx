export default function RPGSystemsPage() {
  return (
    <section style={{ padding: "64px 24px", maxWidth: 800 }}>
      {/* HEADER */}
      <h1 style={{ fontSize: 36 }}>RPG Systems & Mechanics</h1>

      <p style={{ marginTop: 16, fontSize: 18, opacity: 0.9 }}>
        This page explains how the MegaGrok Telegram RPG works under the hood —
        the systems, logic, and philosophy behind progression.
      </p>

      {/* CORE PHILOSOPHY */}
      <section style={{ marginTop: 56 }}>
        <h2 style={{ fontSize: 26 }}>Core Design Philosophy</h2>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          MegaGrok is built around one core principle: <strong>persistence</strong>.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Your Grok is not disposable, seasonal, or reset-based. Decisions compound
          over time, and progression is designed to reward consistency, strategy,
          and long-term engagement.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          This is not a grind-forget-repeat loop. Your Grok is an identity.
        </p>
      </section>

      {/* EVOLUTION SYSTEM */}
      <section style={{ marginTop: 56 }}>
        <h2 style={{ fontSize: 26 }}>The Evolution System</h2>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Groks evolve through multiple stages as they grow stronger.
          Evolutions are not cosmetic — they meaningfully change how
          your Grok performs and how it is perceived in the universe.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Each evolution represents a milestone. Some paths favor aggression,
          others defense, adaptability, or risk-taking.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Evolution choices matter. They define playstyle and are not meant
          to be changed casually.
        </p>
      </section>

      {/* COMBAT OVERVIEW */}
      <section style={{ marginTop: 56 }}>
        <h2 style={{ fontSize: 26 }}>Combat Overview</h2>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Combat in MegaGrok is turn-based and decision-driven.
          Stats matter, but choices matter just as much.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Players engage in both PvE and PvP encounters. PvE focuses on
          progression and challenge, while PvP introduces risk, mind games,
          and competition between Groks.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          There are no instant-win builds. The system is designed to
          reward awareness, timing, and understanding of your Grok’s strengths.
        </p>
      </section>

      {/* PROGRESSION & BALANCE */}
      <section style={{ marginTop: 56 }}>
        <h2 style={{ fontSize: 26 }}>Progression, Balance & Fairness</h2>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Progression is intentionally paced. Cooldowns, limits, and balance
          systems exist to prevent spam, abuse, and runaway advantages.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          MegaGrok is designed so that skill and consistency outperform
          brute-force grinding.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Balance adjustments are made with long-term health in mind,
          not short-term metas.
        </p>
      </section>

      {/* CONNECTION TO ECOSYSTEM */}
      <section style={{ marginTop: 56 }}>
        <h2 style={{ fontSize: 26 }}>Connection to the MegaGrok Ecosystem</h2>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          The Telegram RPG is the foundation of the MegaGrok universe.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Your Grok’s identity and progression influence future systems —
          including Arena competition, community canon, and ecosystem rewards.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          This is where characters are born. Everything else builds on top of it.
        </p>
      </section>

      {/* BACK LINK */}
      <section style={{ marginTop: 72 }}>
        <a
          href="/play"
          style={{
            color: "#6cf",
            fontWeight: 600
          }}
        >
          ← Back to Telegram RPG overview
        </a>
      </section>
    </section>
  );
}
