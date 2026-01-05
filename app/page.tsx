export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section style={{ padding: "64px 24px" }}>
        <h1 style={{ fontSize: 42 }}>MegaGrok</h1>

        <p style={{ marginTop: 16, fontSize: 18, maxWidth: 520 }}>
          A living universe where players evolve, compete,
          and shape a shared story.
        </p>

        <a
          href="#pillars"
          style={{
            display: "inline-block",
            marginTop: 32,
            padding: "14px 22px",
            background: "#6cf",
            color: "#000",
            borderRadius: 8,
            fontWeight: 600
          }}
        >
          Enter the Universe
        </a>
      </section>

      {/* PILLARS */}
      <section
        id="pillars"
        style={{
          padding: "64px 24px",
          borderTop: "1px solid #1f1f2a"
        }}
      >
        <h2 style={{ fontSize: 28 }}>The MegaGrok Ecosystem</h2>

        <div
          style={{
            marginTop: 32,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 20,
            maxWidth: 720
          }}
        >
          {/* RPG */}
          <a
            href="/play"
            style={{
              padding: 20,
              borderRadius: 12,
              border: "1px solid #1f1f2a",
              background: "#111118"
            }}
          >
            <h3>Telegram RPG</h3>
            <p style={{ marginTop: 8, opacity: 0.85 }}>
              Grow a persistent Grok through battles, evolution,
              and daily interaction — all inside Telegram.
            </p>
          </a>

          {/* ARENA */}
          <a
            href="/arena"
            style={{
              padding: 20,
              borderRadius: 12,
              border: "1px solid #1f1f2a",
              background: "#111118"
            }}
          >
            <h3>The Arena</h3>
            <p style={{ marginTop: 8, opacity: 0.85 }}>
              Compete in fast-paced web battles, climb the
              daily leaderboard, and earn real rewards.
            </p>
          </a>

          {/* COMIC */}
          <a
            href="/comic"
            style={{
              padding: 20,
              borderRadius: 12,
              border: "1f1f2a",
              background: "#111118"
            }}
          >
            <h3>Community Comic</h3>
            <p style={{ marginTop: 8, opacity: 0.85 }}>
              A shared canon shaped by player actions.
              Characters, events, and history are born here.
            </p>
          </a>

          {/* TOKEN */}
          <a
            href="/token"
            style={{
              padding: 20,
              borderRadius: 12,
              border: "1px solid #1f1f2a",
              background: "#111118"
            }}
          >
            <h3>The Token</h3>
            <p style={{ marginTop: 8, opacity: 0.85 }}>
              Utility-driven economy connecting the RPG,
              Arena rewards, and future ecosystem mechanics.
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
