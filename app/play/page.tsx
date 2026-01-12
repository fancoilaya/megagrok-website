export default function PlayPage() {
  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <h1>TELEGRAM RPG</h1>
        <p>
          MegaGrok begins inside Telegram — where your Grok is born,
          evolves, and becomes part of a living universe.
        </p>
      </section>

      {/* OVERVIEW */}
      <section>
        <h2 className="section-title">What is the MegaGrok RPG?</h2>

        <p style={{ maxWidth: 900, marginBottom: 24 }}>
          The MegaGrok Telegram RPG is a persistent, character-driven game
          played directly inside Telegram.
        </p>

        <p style={{ maxWidth: 900 }}>
          You awaken a Grok, develop its stats, battle enemies, challenge
          other players, and progress through evolutions that permanently
          define your character.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ marginTop: 48 }}>
        <h2 className="section-title">How it works</h2>

        <div className="grid">
          <div className="panel">
            <h3>Persistent Character</h3>
            <p>
              Your Grok is permanent. There are no seasonal wipes or resets —
              decisions compound over time.
            </p>
          </div>

          <div className="panel">
            <h3>Evolutions</h3>
            <p>
              Groks evolve through meaningful stages that define playstyle,
              strengths, and long-term identity.
            </p>
          </div>

          <div className="panel">
            <h3>PvE & PvP</h3>
            <p>
              Battle enemies to progress, or challenge other players in
              risk-driven PvP encounters.
            </p>
          </div>

          <div className="panel">
            <h3>Connected Ecosystem</h3>
            <p>
              Your RPG progress feeds into Arena competition, community canon,
              and future ecosystem rewards.
            </p>
          </div>
        </div>
      </section>

      {/* SYSTEMS LINK */}
      <section style={{ marginTop: 56 }}>
        <div className="panel">
          <h3>Want to go deeper?</h3>
          <p>
            If you want to understand the RPG systems, evolution logic,
            and combat philosophy in detail, explore the systems overview.
          </p>

          <a
            href="/play/systems"
            style={{
              marginTop: 14,
              display: "inline-block",
              fontWeight: 800,
              color: "#ff7a00"
            }}
          >
            → View RPG Systems & Mechanics
          </a>
          <a  
            href="/play/mobs"
            style={{
              marginTop: 10,
              display: "inline-block",
              fontWeight: 800,
              color: "#ff7a00"
            }}
          >
            → Explore the Grokdex (Mobs & Tiers)
          </a>
        </div>
      </section>
      
      

      {/* CTA */}
      <section style={{ marginTop: 64 }}>
        <a
          href="https://t.me/megagrok"
          target="_blank"
          rel="noopener noreferrer"
          className="panel"
          style={{
            textAlign: "center",
            borderColor: "#ff7a00"
          }}
        >
          <h3>Play on Telegram</h3>
          <p>
            Jump directly into the MegaGrok RPG.
            No installation required — just open Telegram and begin.
          </p>
        </a>
      </section>
    </main>
  );
}
