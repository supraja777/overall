import React from 'react';

const LeetCodeTop = ({ data }: any) => {
  // 1. DATA_EXTRACTION: Mapping to your specific JSON keys
  const consistency = data?.algorithmic_consistency || "ANALYZING";
  const breakdown = data?.problem_breakdown || { easy: 0, medium: 0, hard: 0 };
  const topics = data?.top_topics || [];
  const totalSolved = data?.profile_summary?.total_solved || 450;

  return (
    <div style={styles.container}>
      {/* Visual Indicator: Total Solved */}
      <div style={styles.scoreCircle}>
        <div style={styles.circleContent}>
          <span style={styles.solvedNum}>{totalSolved}</span>
          <span style={styles.solvedLabel}>SOLVED</span>
        </div>
      </div>

      <div style={styles.textContainer}>
        <div style={styles.labelRow}>
          <div style={styles.glowDot} />
          <span style={styles.label}>ALGORITHMIC_VITAL_SIGNS</span>
        </div>
        
        <p style={styles.description}>
          Consistency: <span style={styles.highlight}>{consistency.toUpperCase()}</span>
        </p>

        {/* Problem Breakdown Row */}
        <div style={styles.breakdownRow}>
          <div style={styles.breakdownItem}>
            <span style={{...styles.count, color: '#10b981'}}>{breakdown.easy}</span>
            <span style={styles.diffLabel}>EASY</span>
          </div>
          <div style={styles.breakdownItem}>
            <span style={{...styles.count, color: '#f59e0b'}}>{breakdown.medium}</span>
            <span style={styles.diffLabel}>MED</span>
          </div>
          <div style={styles.breakdownItem}>
            <span style={{...styles.count, color: '#ef4444'}}>{breakdown.hard}</span>
            <span style={styles.diffLabel}>HARD</span>
          </div>
        </div>

        {/* Top Topics Section */}
        <div style={styles.topicGrid}>
          {topics.slice(0, 4).map((topic: string, i: number) => (
            <span key={i} style={styles.topicBadge}>
              #{topic.replace(/\s+/g, '_').toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '24px', 
    marginBottom: '20px',
    padding: '16px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  scoreCircle: { 
    width: '70px', 
    height: '70px', 
    borderRadius: '50%', 
    border: '2px solid #be185d',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'rgba(190, 24, 93, 0.05)',
    boxShadow: '0 0 20px rgba(190, 24, 93, 0.15)',
    flexShrink: 0
  },
  circleContent: { display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1' },
  solvedNum: { fontSize: '22px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-mono)' },
  solvedLabel: { fontSize: '8px', fontWeight: 800, color: '#be185d', marginTop: '4px', letterSpacing: '1px' },
  textContainer: { flex: 1, textAlign: 'left' },
  labelRow: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' },
  glowDot: { width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#be185d', boxShadow: '0 0 8px #be185d' },
  label: { fontSize: '9px', fontWeight: 800, color: '#475569', fontFamily: 'var(--font-mono)', letterSpacing: '1px' },
  description: { fontSize: '15px', color: '#f1f5f9', margin: '0 0 12px 0', fontWeight: 600 },
  highlight: { color: '#be185d' },
  breakdownRow: { display: 'flex', gap: '15px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' },
  breakdownItem: { display: 'flex', alignItems: 'baseline', gap: '4px' },
  count: { fontSize: '12px', fontWeight: 800, fontFamily: 'var(--font-mono)' },
  diffLabel: { fontSize: '8px', color: '#475569', fontWeight: 700 },
  topicGrid: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  topicBadge: { 
    fontSize: '9px', 
    color: '#94a3b8', 
    fontFamily: 'var(--font-mono)',
    fontWeight: 500
  }
};

export default LeetCodeTop;