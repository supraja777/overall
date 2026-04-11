import React from 'react';

interface TopProps {
  solved?: number;
  breakdown?: { easy: number; medium: number; hard: number };
  consistency?: string;
  topics?: string[];
  review?: string;
  profile?: {
    username: string;
    ranking: string;
    contest_rating: number;
  };
}

const LeetCodeTop = ({ solved = 0, breakdown, consistency = "HIGH", topics = [], review = "Syncing profile...", profile }: TopProps) => {
  const radius = 34; 
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.min(Math.max(solved, 0), 500);
  const offset = circumference - (safeScore / 500) * circumference;

  return (
    <div style={styles.container}>
      <div style={styles.headerLayout}>
        {/* PROGRESS RING */}
        <div style={styles.ringWrapper}>
          <svg width="90" height="90" style={styles.svg}>
            <circle cx="45" cy="45" r={radius} style={styles.backgroundCircle} />
            <circle
              cx="45" cy="45" r={radius}
              style={{
                ...styles.progressCircle,
                strokeDasharray: circumference,
                strokeDashoffset: isNaN(offset) ? circumference : offset,
              }}
            />
          </svg>
          <div style={styles.scoreText}>
            <span style={styles.percentage}>{solved}</span>
            <span style={styles.unit}>SLV</span>
          </div>
        </div>

        {/* DETAILED STATS BOX */}
        <div style={styles.statusBox}>
          <div style={styles.userRow}>
            <span style={styles.username}>@{profile?.username || 'USER_ID'}</span>
            <span style={styles.rankBadge}>{profile?.ranking || 'TOP_TIER'}</span>
          </div>
          
          {/* PROFILE REVIEW SNIPPET */}
          <div style={styles.reviewContainer}>
            <span style={styles.reviewText}>{review.toUpperCase()}</span>
          </div>

          <div style={styles.ratingRow}>
            <span style={styles.ratingLabel}>CONTEST_RATING:</span>
            <span style={styles.ratingValue}>{profile?.contest_rating || 0}</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.metaGrid}>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>CONSISTENCY</span>
              <span style={styles.highlight}>{consistency.toUpperCase()}</span>
            </div>
            {breakdown && (
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>SOLVE_DIST</span>
                <div style={styles.miniBreakdown}>
                  <span style={{color: '#10b981'}}>{breakdown.easy}</span>
                  <span style={{color: '#f59e0b'}}>{breakdown.medium}</span>
                  <span style={{color: '#ef4444'}}>{breakdown.hard}</span>
                </div>
              </div>
            )}
          </div>

          <div style={styles.topicRow}>
            {topics.slice(0, 3).map((topic, i) => (
              <span key={i} style={styles.topTag}>#{topic.split(' ')[0].toUpperCase()}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column' as const, width: '100%' },
  headerLayout: { display: 'flex', alignItems: 'flex-start', gap: '24px' },
  ringWrapper: { 
    position: 'relative' as const, width: '90px', height: '90px', 
    display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 
  },
  svg: { transform: 'rotate(-90deg)' },
  backgroundCircle: { fill: 'none', stroke: '#1e293b', strokeWidth: 5 },
  progressCircle: { 
    fill: 'none', stroke: '#be185d', strokeWidth: 5, strokeLinecap: 'round' as const,
    filter: 'drop-shadow(0 0 4px rgba(190, 24, 93, 0.6))', transition: 'stroke-dashoffset 1s ease-in-out' 
  },
  scoreText: { position: 'absolute' as const, display: 'flex', flexDirection: 'column' as const, alignItems: 'center' },
  percentage: { fontSize: '22px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-mono)' },
  unit: { fontSize: '8px', color: '#be185d', fontWeight: 700, letterSpacing: '1px' },
  
  statusBox: { display: 'flex', flexDirection: 'column' as const, gap: '8px', flex: 1 },
  userRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  username: { fontSize: '11px', color: '#64748b', fontWeight: 700, fontFamily: 'var(--font-mono)' },
  rankBadge: { 
    fontSize: '9px', background: 'rgba(190, 24, 93, 0.15)', color: '#be185d', 
    padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(190, 24, 93, 0.3)', fontWeight: 800 
  },
  reviewContainer: { 
    borderLeft: '2px solid #be185d', paddingLeft: '8px', margin: '2px 0' 
  },
  reviewText: { 
    fontSize: '10px', color: '#cbd5e1', fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' 
  },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  ratingLabel: { fontSize: '9px', color: '#475569', fontWeight: 800, letterSpacing: '0.5px' },
  ratingValue: { fontSize: '14px', color: '#f8fafc', fontWeight: 800, fontFamily: 'var(--font-mono)' },
  divider: { height: '1px', background: 'rgba(255,255,255,0.05)', width: '100%' },
  metaGrid: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '12px' },
  metaItem: { display: 'flex', flexDirection: 'column' as const, gap: '2px' },
  metaLabel: { fontSize: '8px', color: '#475569', fontWeight: 800, fontFamily: 'var(--font-mono)' },
  highlight: { color: '#be185d', fontSize: '11px', fontWeight: 700 },
  miniBreakdown: { display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-mono)' },
  topicRow: { display: 'flex', gap: '6px', marginTop: '2px' },
  topTag: { fontSize: '8px', color: '#94a3b8', fontFamily: 'var(--font-mono)', fontWeight: 600, opacity: 0.8 }
};

export default LeetCodeTop;