export default function TokenPage() {
  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <h1>THE TOKEN</h1>
        <p>
          A utility-driven asset connecting gameplay,
          competition, and the MegaGrok ecosystem.
        </p>
      </section>

      {/* TOKEN STATUS */}
      <section>
        <div className="panel">
          <h3>Token Status</h3>

          <p style={{ marginTop: 8 }}>
            The MegaGrok token has not yet launched.
          </p>

          <p style={{ marginTop: 8, fontSize: 14, opacity: 0.75 }}>
            Contract address, charts, and live market data
            will be published here at launch.
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section style={{ marginTop: 56 }}>
        <div className="panel">
          <p>
            The MegaGrok token is designed to support the ecosystem —
            not to exist independently of it.
          </p>

          <p style={{ marginTop: 12 }}>
            It connects the Telegram RPG, the Arena,
            and future systems through transparent,
            verifiable mechanics.
          </p>
        </div>
      </section>

      {/* CORE UTILITIES */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Core Utilities</h2>

        <div className="grid">
          <div className="panel">
            <h3>Arena Rewards</h3>
            <p>
              A portion of ecosystem inflows will be allocated
              to daily Arena rewards and distributed to top players.
            </p>
          </div>

          <div className="panel">
            <h3>Future Mechanics</h3>
            <p>
              The token will be used in future systems tied to
              progression, events, and ecosystem participation.
            </p>
          </div>

          <div className="panel">
            <h3>Transparency</h3>
            <p>
              All reward flows, wallets, and payouts
              will be publicly visible and verifiable.
            </p>
          </div>

          <div className="panel">
            <h3>Alignment</h3>
            <p>
              Token value is tied to activity and engagement —
              not artificial incentives or inflation.
            </p>
          </div>
        </div>
      </section>

      {/* REWARDS & WALLET */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Rewards & Distribution</h2>

        <div className="panel">
          <p>
            Arena rewards are derived from ecosystem activity
            and creator inflows.
          </p>

          <p style={{ marginTop: 12 }}>
            Payouts will be distributed transparently,
            with public records linking winners,
            reward amounts, and transaction hashes.
          </p>

          <p style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>
            Dev / Reward Wallet:
            <br />
            <span style={{ wordBreak: "break-all" }}>
              DEV_WALLET_ADDRESS_PLACEHOLDER
            </span>
          </p>
        </div>
      </section>

      {/* LIVE DATA PLACEHOLDER */}
      <section style={{ marginTop: 56 }}>
        <h2 className="section-title">Live Token Data</h2>

        <div className="panel">
          <p>
            Live token metrics will appear here after launch.
          </p>

          <p style={{ marginTop: 12, opacity: 0.75 }}>
            This section will include:
          </p>

          <ul style={{ marginTop: 12, paddingLeft: 18, opacity: 0.75 }}>
            <li>Price chart</li>
            <li>Liquidity information</li>
            <li>Market links (Dexscreener)</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
