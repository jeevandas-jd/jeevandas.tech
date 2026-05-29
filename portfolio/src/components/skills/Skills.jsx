import { FadeIn } from '../common/FadeIn';
import { Section } from '../common/Section';
import { Pill } from '../common/Pill';

export function Skills({ skills }) {
  return (
    <Section id="skills" label="skills">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Object.entries(skills).map(([cat, items], i) => (
          <FadeIn key={cat} delay={i * 50}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: 12,
                alignItems: "start",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "#aaa49c",
                  letterSpacing: "0.04em",
                  paddingTop: 3,
                }}
              >
                {cat}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {items.map((s) => (
                  <Pill key={s} label={s} />
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}