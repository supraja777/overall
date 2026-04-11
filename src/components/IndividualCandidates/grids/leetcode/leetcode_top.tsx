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
  isLoading?: boolean; // New prop for the spin effect
}

const LeetCodeTop = ({ 
  solved = 0, 
  breakdown, 
  consistency = "HIGH", 
  topics = [], 
  review = "Syncing profile...", 
  profile,
  isLoading = false 
}: TopProps) => {
  const radius = 34; 
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.min(Math.max(solved, 0), 500);
  const offset = circumference - (safeScore / 500) * circumference;

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinnerWrapper}>
          <div className="neural-spin" style={styles.neuralRing} />
          <div style={styles.loadingPulse}>✦</div>
        </div>
        <div style={styles.loadingText}>DECRYPTING_LEETCODE_PROFILE...</div>
        <div style={styles.loadingSubText}>ANALYZING_ALGORITHMIC_PATTERNS</div>
      </div>
    );
  }

  return (
    <div style={styles.container} className="fade-in-content">
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
  // --- LOADING STYLES ---
  loadingContainer: {
    height: '140px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(15, 23, 42, 0.4)',
    borderRadius: '12px',
    border: '1px solid #1e293b',
    gap: '8px'
  },
  spinnerWrapper: { position: 'relative' as const, width: '40px', height: '40px' },
  neuralRing: {
    position: 'absolute' as const,
    inset: 0,
    border: '2px solid transparent',
    borderTopColor: '#be185d',
    borderRightColor: '#be185d',
    borderRadius: '50%',
  },
  loadingPulse: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#be185d',
    fontSize: '14px',
    animation: 'pulse 1s infinite'
  },
  loadingText: { fontSize: '10px', color: '#f8fafc', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '1px' },
  loadingSubText: { fontSize: '8px', color: '#475569', fontWeight: 700, fontFamily: 'monospace' },

  // --- ORIGINAL STYLES ---
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
  percentage: { fontSize: '22px', fontWeight: 900, color: '#fff', fontFamily: 'monospace' },
  unit: { fontSize: '8px', color: '#be185d', fontWeight: 700, letterSpacing: '1px' },
  statusBox: { display: 'flex', flexDirection: 'column' as const, gap: '8px', flex: 1 },
  userRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  username: { fontSize: '11px', color: '#64748b', fontWeight: 700, fontFamily: 'monospace' },
  rankBadge: { 
    fontSize: '9px', background: 'rgba(190, 24, 93, 0.15)', color: '#be185d', 
    padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(190, 24, 93, 0.3)', fontWeight: 800 
  },
  reviewContainer: { borderLeft: '2px solid #be185d', paddingLeft: '8px', margin: '2px 0' },
  reviewText: { fontSize: '10px', color: '#cbd5e1', fontWeight: 600, fontFamily: 'monospace', letterSpacing: '0.5px' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  ratingLabel: { fontSize: '9px', color: '#475569', fontWeight: 800, letterSpacing: '0.5px' },
  ratingValue: { fontSize: '14px', color: '#f8fafc', fontWeight: 800, fontFamily: 'monospace' },
  divider: { height: '1px', background: 'rgba(255,255,255,0.05)', width: '100%' },
  metaGrid: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '12px' },
  metaItem: { display: 'flex', flexDirection: 'column' as const, gap: '2px' },
  metaLabel: { fontSize: '8px', color: '#475569', fontWeight: 800, fontFamily: 'monospace' },
  highlight: { color: '#be185d', fontSize: '11px', fontWeight: 700 },
  miniBreakdown: { display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700, fontFamily: 'monospace' },
  topicRow: { display: 'flex', gap: '6px', marginTop: '2px' },
  topTag: { fontSize: '8px', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 600, opacity: 0.8 }
};

export default LeetCodeTop;