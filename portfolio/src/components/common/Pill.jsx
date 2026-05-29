import { theme } from '../../constants/theme';

export function Pill({ label, accent: isAccent }) {
  return (
    <span
      style={{
        fontSize: 11,
        letterSpacing: "0.04em",
        border: `1px solid ${isAccent ? theme.accent : "#ddd8d0"}`,
        color: isAccent ? theme.accent : "#8a8178",
        background: isAccent ? theme.accentBg : "transparent",
        padding: "2px 8px",
        whiteSpace: "nowrap",
        fontFamily: theme.fonts.mono,
      }}
    >
      {label}
    </span>
  );
}