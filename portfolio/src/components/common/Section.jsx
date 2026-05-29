export function Section({ id, label, children }) {
  return (
    <section
      id={id}
      style={{ padding: "4rem 0", borderTop: "1px solid #e8e3dc" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "140px 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        <div style={{ paddingTop: 4, position: "sticky", top: 80 }}>
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 15,
              color: "#aaa49c",
              letterSpacing: "0.04em",
            }}
          >
            {label}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}