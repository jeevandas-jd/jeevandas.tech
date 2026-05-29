export function HeroStats({ stats }) {
  return (
    <div style={{ display: "flex", gap: 8, width: "100%" }}>
      {stats.map((s) => (
        <div
          key={s.n}
          style={{
            flex: 1,
            background: "#f3efe8",
            border: "1px solid #e8e3dc",
            padding: "10px 8px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#1c1916",
              lineHeight: 1,
            }}
          >
            {s.n}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#aaa49c",
              lineHeight: 1.5,
              marginTop: 4,
              whiteSpace: "pre-line",
              letterSpacing: "0.02em",
            }}
          >
            {s.sub}
          </div>
        </div>
      ))}
    </div>
  );
}