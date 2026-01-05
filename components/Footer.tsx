export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 96,
        borderTop: "1px solid #1f1f2a",
        background: "#060414"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
            textAlign: "center"
          }}
        >
          {/* BRAND */}
          <div>
            <h3
              style={{
                fontFamily: "Anton, sans-serif",
                letterSpacing: "0.08em"
              }}
            >
              MEGAGROK
            </h3>
            <p style={{ fontSize: 14, opacity: 0.75 }}>
              A living universe shaped by players.
            </p>
          </div>

          {/* SOCIALS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap"
            }}
          >
            <a
              href="https://t.me/megagrok"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 700, color: "#ff7a00" }}
            >
              Telegram
            </a>

            <a
              href="https://x.com/MegaGrokdev"
              target="_blank"
              rel="noopener noreferrer"
            >
              X (Official)
            </a>

            <a
              href="https://x.com/i/communities/2006355799371575305"
              target="_blank"
              rel="noopener noreferrer"
            >
              X Community
            </a>
          </div>

          {/* COPYRIGHT */}
          <div style={{ fontSize: 13, opacity: 0.6 }}>
            © {new Date().getFullYear()} MegaGrok. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
