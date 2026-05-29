import { FadeIn } from '../common/FadeIn';
import { theme } from '../../constants/theme';

export function Experience({ experience }) {
  return (
    <section id="experience" style={{ padding: "4rem 0", borderTop: "1px solid #e8e3dc" }}>
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
            experience
          </p>
        </div>
        <div>
          {experience.map((e) => (
            <FadeIn key={e.company}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "1.5rem",
                }}
              >
                <div style={{ minWidth: 130 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>
                    {e.company}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: theme.accent,
                      marginBottom: 3,
                      fontWeight: 500,
                    }}
                  >
                    {e.role}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#aaa49c",
                      fontFamily: theme.fonts.mono,
                    }}
                  >
                    {e.period}
                  </p>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {e.points.map((pt, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 13,
                        color: theme.colors.textLight,
                        lineHeight: 1.7,
                        paddingLeft: 14,
                        position: "relative",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: theme.accent,
                          fontSize: 11,
                        }}
                      >
                        →
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}