export default function HomePage() {
  return (
    <>
      {/* HERO / ATMOSPHERE */}
      <section
        style={{
          position: "relative",
          padding: "96px 24px 72px",
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(11,11,15,0.6),
              rgba(11,11,15,0.95)
            ),
            url('/images/hero-bg.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottom: "1px solid #1f1f2a"
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <h1
            style={{
              fontSize: 44,
              letterSpacing: "0.06em",
              textTransform: "uppercase"
            }}
          >
            MegaGrok
          </h1>

          <p
            style={{
              marginTop: 20,
              fontSize: 18,
              maxWidth: 520,
              opacity: 0.9
            }}
          >
            A living universe where players evolve, compete,
            and shape a shared story.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section
        style={{
          padding: "72px 24px",
          background: "#0b0b0f"
        }}
      >
        <div style={{ maxWidth: 900 }}>
          <h2
            style={{
              fontSize: 30,
              letterSpacing: "0.04em",
              marginBottom: 32
            }}
          >
            The MegaGrok Ecosystem
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24
            }}
          >
            {/* TELEGRAM RPG */}
            <a href="/play" style={pillarCardStyle}>
              <h3 style={pillarTitleStyle}>Telegram RPG</h3>
              <p style={pillarTextStyle}>
                Awaken a persistent Grok inside Telegram.
                Progress, battle, and evolve through long-term systems
                that define your identity.
              </p>
            </a>

            {/* ARENA */}
            <a href="/arena" style={pillarCardStyle}>
              <h3 style={pillarTitleStyle}>The Arena</h3>
              <p style={pillarTextStyle}>
                Short, intense web battles with daily leaderboard resets.
                Compete for dominance and earn real ecosystem rewards.
              </p>
            </a>

            {/* COMIC */}
            <a href="/comic" style={pillarCardStyle}>
              <h3 style={pillarTitleStyle}>Community Comic</h3>
              <p style={pillarTextStyle}>
                A living canon shaped by player actions.
                Characters, events, and history are forged together.
              </p>
            </a>

            {/* TOKEN */}
            <a href="/token" style={pillarCardStyle}>
              <h3 style={pillarTitleStyle}>The Token</h3>
              <p style={pillarTextStyle}>
                A utility-driven economy connecting gameplay,
                competition, and future ecosystem mechanics.
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────── STYLES ───────────────── */

const pillarCardStyle: React.CSSProperties = {
  padding: 28,
  background: "#111118",
  borderRadius: 16,
  border: "1px solid #1f1f2a",
  textDecoration: "none"
};

const pillarTitleStyle: React.CSSProperties = {
  fontSize: 22,
  letterSpacing: "0.04em",
  marginBottom: 10
};

const pillarTextStyle: React.CSSProperties = {
  opacity: 0.85,
  lineHeight: 1.5
};
