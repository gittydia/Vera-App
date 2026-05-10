interface StatusPillProps {
  type: 'safe' | 'caution' | 'danger';
  label: string;
}

export function StatusPill({ type, label }: StatusPillProps) {
  const colors = {
    safe: {
      bg: 'rgba(34, 197, 94, 0.15)',
      text: '#22C55E'
    },
    caution: {
      bg: 'rgba(245, 158, 11, 0.15)',
      text: '#F59E0B'
    },
    danger: {
      bg: 'rgba(239, 68, 68, 0.15)',
      text: '#EF4444'
    }
  };

  const color = colors[type];

  return (
    <span
      className="px-3 py-1 rounded-full inline-block"
      style={{
        backgroundColor: color.bg,
        color: color.text
      }}
    >
      {label}
    </span>
  );
}
