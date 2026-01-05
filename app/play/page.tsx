export default function PlayPage() {
  return (
    <section style={{ padding: "64px 24px", maxWidth: 720 }}>
      {/* HEADER */}
      <h1 style={{ fontSize: 36 }}>Telegram RPG</h1>

      <p style={{ marginTop: 16, fontSize: 18, opacity: 0.9 }}>
        MegaGrok begins inside Telegram — where your Grok is born,
        evolves, and becomes part of a living universe.
      </p>

      {/* WHAT IT IS */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 24 }}>What is it?</h2>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          The MegaGrok Telegram RPG is a persistent, character-driven game
          played directly inside Telegram.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          You awaken a Grok, develop its stats, battle enemies,
          challenge other players, and progress through evolutions
          that permanently define your character.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 24 }}>How it works</h2>

        <ul style={{ marginTop: 16, paddingLeft: 20, opacity: 0.85 }}>
          <li>Awaken your Grok inside Telegram</li>
          <li>Train, battle, and evolve over time</li>
          <li>Engage in PvE and PvP encounters</li>
          <li>Unlock evolutions and progression paths</li>
          <li>Your progress persists — this is not a reset game</li>
        </ul>
      </section>

      {/* WHY IT MATTERS */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 24 }}>Why it matters</h2>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Your Grok is more than a stat sheet.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Actions taken in the RPG influence the wider MegaGrok ecosystem —
          from Arena competition to future comic canon and NFT derivations.
        </p>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          This is where identity is formed.
        </p>
      </section>

      {/* CTA */}
      <section style={{ marginTop: 64 }}>
        <a
          href="https://t.me/megagrok"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "16px 24px",
            background: "#6cf",
            color: "#000",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 18
          }}
        >
          Play on Telegram
        </a>

        <p style={{ marginTop: 16, fontSize: 14, opacity: 0.6 }}>
          Opens Telegram • No installation required
        </p>
      </section>
    </section>
  );
}
