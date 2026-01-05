export default function ComicPage() {
  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <h1>THE COMIC</h1>
        <p>
          The origin of MegaGrok — a universe born from collapse,
          chaos, and transformation.
        </p>
      </section>

      {/* INTRO */}
      <section>
        <div className="panel">
          <p>
            MegaGrok is not just a game or a token.
            It is a story — one shaped by collapse, adaptation,
            and the emergence of something stronger.
          </p>

          <p style={{ marginTop: 12 }}>
            This comic establishes the canonical origin of the universe.
            Future chapters will be influenced by the community,
            Arena champions, and player-driven events.
          </p>
        </div>
      </section>

      {/* ORIGIN PANELS */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Origin: Issue #0</h2>

        <div className="panel">
          <img
            src="/comic/origin-1.jpg"
            alt="The Great Liquidity Implosion"
            style={{ width: "100%", borderRadius: 12 }}
          />
        </div>

        <div className="panel" style={{ marginTop: 32 }}>
          <img
            src="/comic/origin-2.jpg"
            alt="Birth of MegaGrok"
            style={{ width: "100%", borderRadius: 12 }}
          />
        </div>

        <div className="panel" style={{ marginTop: 32 }}>
          <img
            src="/comic/origin-3.jpg"
            alt="The Collapse and Awakening"
            style={{ width: "100%", borderRadius: 12 }}
          />
        </div>
      </section>

      {/* COVER */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">The First Issue</h2>

        <div className="panel" style={{ textAlign: "center" }}>
          <img
            src="/comic/cover.jpg"
            alt="MegaGrok Issue #1 Cover"
            style={{
              width: "100%",
              maxWidth: 520,
              borderRadius: 12
            }}
          />

          <p style={{ marginTop: 16 }}>
            <strong>MEGAGROK #1</strong>
            <br />
            The Cosmic Amphibian Awakens
          </p>
        </div>
      </section>

      {/* FUTURE */}
      <section style={{ marginTop: 64 }}>
        <div className="panel">
          <h3>The Story Continues</h3>
          <p style={{ marginTop: 8 }}>
            Future issues will expand the universe and introduce
            new characters, factions, and conflicts.
          </p>

          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Community actions, Arena outcomes, and major events
            will influence what becomes canon.
          </p>
        </div>
      </section>
    </main>
  );
}
