export default function RoadmapPage() {
  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <h1>ROADMAP</h1>
        <p>
          MegaGrok is built as a living universe.
          This roadmap outlines how systems, story,
          and competition evolve over time.
        </p>
      </section>

      {/* INTRO */}
      <section>
        <div className="panel">
          <p>
            This is a phase-based roadmap.
            Each phase unlocks new capabilities, systems,
            and meaning — without artificial deadlines.
          </p>

          <p style={{ marginTop: 12 }}>
            MegaGrok grows through persistence, competition,
            and player-driven events.
          </p>
        </div>
      </section>

      {/* PHASE 0 */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Phase 0 — The Awakening</h2>

        <div className="panel">
          <p><strong>Status:</strong> Active</p>

          <ul style={{ marginTop: 12, paddingLeft: 18 }}>
            <li>Telegram RPG live with persistent Groks</li>
            <li>Progression, stats, and evolution system</li>
            <li>PvE gameplay established</li>
            <li>Arena system designed (daily resets & leaderboard)</li>
            <li>Website rebuild</li>
            <li>Comic origin established (Issue #0)</li>
          </ul>

          <p style={{ marginTop: 12, opacity: 0.8 }}>
            Outcome: MegaGrok awakens as a cohesive universe
            with identity, rules, and continuity.
          </p>
        </div>
      </section>

      {/* PHASE I */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Phase I — Conflict & Competition</h2>

        <div className="panel">
          <p><strong>Status:</strong> Next</p>

          <ul style={{ marginTop: 12, paddingLeft: 18 }}>
            <li>PvP Challenge mode completed</li>
            <li>Structured PvP battles in Telegram</li>
            <li>PvP rankings and reputation</li>
            <li>Arena web game v2 launch</li>
            <li>Daily Arena leaderboard (Top 10)</li>
            <li>Arena Champions archive begins</li>
          </ul>

          <p style={{ marginTop: 12, opacity: 0.8 }}>
            Outcome: Competition becomes a daily ritual.
            Skill and consistency begin to define status.
          </p>
        </div>
      </section>

      {/* PHASE II */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Phase II — Tournaments & Legacy</h2>

        <div className="panel">
          <p><strong>Status:</strong> Planned</p>

          <ul style={{ marginTop: 12, paddingLeft: 18 }}>
            <li>Turn-based PvP tournaments</li>
            <li>Bracket-style competitive events</li>
            <li>Limited-time championships</li>
            <li>Tournament winners recorded in canon</li>
            <li>Special recognition & titles</li>
          </ul>

          <p style={{ marginTop: 12, opacity: 0.8 }}>
            Outcome: Victories become historic moments,
            not just numbers on a leaderboard.
          </p>
        </div>
      </section>

      {/* PHASE III */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Phase III — The Living Comic</h2>

        <div className="panel">
          <p><strong>Status:</strong> In development</p>

          <ul style={{ marginTop: 12, paddingLeft: 18 }}>
            <li>Regular comic chapters released</li>
            <li>Storylines influenced by Arena champions</li>
            <li>New characters and factions introduced</li>
            <li>Canon events reflected back into gameplay</li>
          </ul>

          <p style={{ marginTop: 12, opacity: 0.8 }}>
            Outcome: The universe responds to player actions.
            Gameplay and story become inseparable.
          </p>
        </div>
      </section>

      {/* PHASE IV */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Phase IV — NFTs: Canon Artifacts</h2>

        <div className="panel">
          <p><strong>Status:</strong> Designed</p>

          <ul style={{ marginTop: 12, paddingLeft: 18 }}>
            <li>NFTs derived from canon moments</li>
            <li>Legendary Arena victories preserved</li>
            <li>Historic characters and events minted</li>
            <li>No random mints or artificial scarcity</li>
          </ul>

          <p style={{ marginTop: 12, opacity: 0.8 }}>
            Outcome: NFTs become artifacts of history,
            not speculative collectibles.
          </p>
        </div>
      </section>

      {/* PHASE V */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Phase V — Token Activation</h2>

        <div className="panel">
          <p><strong>Status:</strong> Planned</p>

          <ul style={{ marginTop: 12, paddingLeft: 18 }}>
            <li>Token launch</li>
            <li>Arena rewards funded via ecosystem inflows</li>
            <li>Public reward wallet</li>
            <li>Dexscreener integration</li>
            <li>Manual → semi-automated payouts</li>
          </ul>

          <p style={{ marginTop: 12, opacity: 0.8 }}>
            Outcome: Real activity connects to real rewards
            with full transparency.
          </p>
        </div>
      </section>

      {/* PHASE VI */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Phase VI — Automation & Expansion</h2>

        <div className="panel">
          <p><strong>Status:</strong> Long-term</p>

          <ul style={{ marginTop: 12, paddingLeft: 18 }}>
            <li>Fully automated Arena payouts</li>
            <li>On-chain verification of results</li>
            <li>Advanced tournament formats</li>
            <li>Expanded RPG systems and evolutions</li>
            <li>New Arena modes</li>
          </ul>

          <p style={{ marginTop: 12, opacity: 0.8 }}>
            Outcome: A resilient, self-sustaining ecosystem
            with minimal manual intervention.
          </p>
        </div>
      </section>
    </main>
  );
}
