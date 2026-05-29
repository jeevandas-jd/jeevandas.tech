import { useState } from 'react';
import { theme } from '../../constants/theme';

export function Navbar({ active, items }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(250,248,245,0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e8e3dc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.7rem 2rem",
        flexWrap: "wrap",
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: theme.fonts.cursive,
          fontSize: 15,
          color: "#aaa49c",
          textDecoration: "none",
        }}
      >
        ← jeevandas.tech
      </a>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.6rem",
        }}
        className="desktop-nav"
      >
        {items.map((item) => (
          <a
            key={item}
            href={`#${item}`}
            style={{
              fontSize: 12,
              letterSpacing: "0.04em",
              color: active === item ? theme.accent : "#9a9289",
              textDecoration: "none",
              borderBottom: active === item ? `1px solid ${theme.accent}` : "1px solid transparent",
              paddingBottom: 1,
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            {item}
          </a>
        ))}
        <a
          href="mailto:jeevandasms2004@gmail.com"
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: theme.accent,
            color: "#faf8f5",
            padding: "6px 16px",
            textDecoration: "none",
            fontWeight: 500,
            transition: "opacity 0.15s",
            borderRadius: 2,
          }}
        >
          hire me
        </a>
      </div>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          fontSize: 20,
          cursor: "pointer",
          color: "#9a9289",
        }}
        className="mobile-menu-btn"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 48,
            left: 0,
            right: 0,
            background: "white",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderBottom: "1px solid #e8e3dc",
          }}
          className="mobile-nav"
        >
          {items.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: 14,
                color: active === item ? theme.accent : "#9a9289",
                textDecoration: "none",
                padding: "0.5rem 0",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}