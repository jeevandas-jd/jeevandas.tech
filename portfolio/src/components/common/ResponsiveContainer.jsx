import { theme } from '../../constants/theme';

export function ResponsiveContainer({ children, as = 'div', maxWidth = 860 }) {
  const Component = as;
  return (
    <Component
      style={{
        width: '100%',
        maxWidth: maxWidth,
        margin: '0 auto',
        padding: `0 ${theme.spacing.sm}`,
        '@media (min-width: 768px)': {
          padding: `0 ${theme.spacing.md}`,
        },
      }}
    >
      {children}
    </Component>
  );
}