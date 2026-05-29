import { FadeIn } from '../common/FadeIn';
import { Section } from '../common/Section';

export function Education({ education }) {
  return (
    <Section id="education" label="education">
      <FadeIn>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>
              {education.school}
            </p>
            <p style={{ fontSize: 13, color: "#6b6560", marginBottom: 4 }}>
              {education.degree}
            </p>
            <p
              style={{
                fontSize: 11,
                color: "#aaa49c",
                fontFamily: "monospace",
              }}
            >
              {education.years}
            </p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28,
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              {education.gpa}
              <span style={{ fontSize: 14, fontWeight: 400, color: "#aaa49c" }}>
                {" "}
                /10
              </span>
            </div>
            <p style={{ fontSize: 11, color: "#aaa49c", marginTop: 4 }}>GPA</p>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}