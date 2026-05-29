import { theme } from '../../constants/theme';

export function Section({ id, label, children }) {
  return (
    <section
      id={id}
      style={{
        padding: `${theme.spacing.xl} 0`,
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gap: theme.spacing.lg,
          alignItems: 'start',
        }}
        className="section-grid"
      >
        <div
          style={{
            paddingTop: 4,
            position: 'sticky',
            top: 80,
          }}
          className="section-label"
        >
          <p
            style={{
              fontFamily: theme.fonts.cursive,
              fontSize: 15,
              color: theme.colors.textMuted,
              letterSpacing: '0.04em',
            }}
          >
            {label}
          </p>
        </div>
        <div>{children}</div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .section-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .section-label {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}