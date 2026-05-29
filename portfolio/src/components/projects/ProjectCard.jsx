import { useState, useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { Pill } from '../common/Pill';
import { theme } from '../../constants/theme';

export function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.45s ease ${index * 80}ms, transform 0.45s ease ${index * 80}ms`,
        border: project.featured ? `1.5px solid ${theme.accent}` : "1px solid #e8e3dc",
        background: project.featured ? theme.accentBg : "#faf8f5",
        marginBottom: 12,
        padding: "1.25rem 1.4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          {project.featured && (
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: theme.accent,
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              {project.badge}
            </div>
          )}
          {!project.featured && (
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                color: "#aaa49c",
                marginBottom: 4,
                fontFamily: theme.fonts.mono,
              }}
            >
              {project.type}
            </div>
          )}
          <h3
            style={{
              fontSize: 16,
              fontFamily: theme.fonts.heading,
              fontWeight: 700,
              marginBottom: 6,
              lineHeight: 1.3,
              color: theme.colors.text,
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#6b6560",
              lineHeight: 1.65,
              marginBottom: 10,
            }}
          >
            {project.one}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {project.stack.map((s) => (
              <Pill key={s} label={s} accent={project.featured} />
            ))}
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#aaa49c",
            fontSize: 20,
            lineHeight: 1,
            padding: "4px 8px",
            flexShrink: 0,
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            fontWeight: 300,
          }}
          aria-label={open ? "Close details" : "Open details"}
        >
          +
        </button>
      </div>

      {open && (
        <ul
          style={{
            marginTop: 14,
            paddingLeft: 0,
            listStyle: "none",
            borderTop: `1px solid ${project.featured ? "#e8c9aa" : "#e8e3dc"}`,
            paddingTop: 12,
          }}
        >
          {project.points.map((pt, i) => (
            <li
              key={i}
              style={{
                fontSize: 12.5,
                color: "#6b6560",
                lineHeight: 1.7,
                paddingLeft: 16,
                position: "relative",
                marginBottom: 5,
              }}
            >
              <span style={{ position: "absolute", left: 0, color: "#c4b8ac" }}>
                —
              </span>
              {pt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}