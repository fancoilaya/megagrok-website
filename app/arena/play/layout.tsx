export default function ArenaPlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#060414",
      }}
    >
      {children}
    </div>
  );
}
