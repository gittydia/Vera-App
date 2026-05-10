interface VerdictBadgeProps {
  type: 'safe' | 'caution' | 'danger';
}

export function VerdictBadge({ type }: VerdictBadgeProps) {
  const colors = {
    safe: {
      border: '#22C55E',
      bg: 'rgba(34, 197, 94, 0.1)',
      dot: '#22C55E'
    },
    caution: {
      border: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.1)',
      dot: '#F59E0B'
    },
    danger: {
      border: '#EF4444',
      bg: 'rgba(239, 68, 68, 0.1)',
      dot: '#EF4444'
    }
  };

  const color = colors[type];

  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: color.bg,
        border: `1.5px solid ${color.border}`
      }}
    >
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color.dot }}
      />
    </div>
  );
}
