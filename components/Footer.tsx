export default function Footer() {
  return (
    <footer style={{
      padding: "24px",
      textAlign: "center",
      borderTop: "1px solid #1f1f2a",
      marginTop: "64px",
      opacity: 0.7
    }}>
      MegaGrok © {new Date().getFullYear()}
    </footer>
  );
}
