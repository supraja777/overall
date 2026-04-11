import React from 'react';

const PortfolioTop = ({ data }: any) => {
  // 1. DATA EXTRACTION FROM YOUR JSON STRUCTURE
  console.log("In portfolio top ", data)
  const matchScore = data?.match_percentage || 0;
  const strength = data?.overall_portfolio_strength || "N/A";
  
  // Extracting from tech_stack_summary object
  const languages = data?.tech_stack_summary?.languages || [];
  const frameworks = data?.tech_stack_summary?.frameworks || [];
  const topTech = [...languages, ...frameworks];

  // 2. SVG CIRCLE MATH
  const radius = 34; 
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.min(Math.max(matchScore, 0), 100);
  const offset = circumference - (safeScore / 100) * circumference;

  return (
    <div style={styles.container}>
      {/* --- HEADER SECTION: RING & ALIGNMENT --- */}
      <div style={styles.headerLayout}>
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
            <span style={styles.percentage}>{safeScore}</span>
            <span style={styles.unit}>%</span>
          </div>
        </div>

        <div style={styles.statusBox}>
          <div style={styles.labelRow}>
            <div style={styles.glowDot} />
            <span style={styles.label}>PORTFOLIO_MATCH_ENGINE</span>
          </div>
          <h3 style={styles.matchTitle}>
            Strength: <span style={styles.highlight}>{strength.toUpperCase()}</span>
          </h3>
          <p style={styles.subText}>Architecture verified via {data?.main_projects?.length || 0} projects.</p>
        </div>
      </div>

      {/* --- SKILLS SECTION: TECH BADGES --- */}
      <div style={styles.skillsSection}>
        <span style={styles.label}>EXTRACTED_STACK_SUMMARY</span>
        <div style={styles.chipGrid}>
          {topTech.length > 0 ? (
            topTech.slice(0, 10).map((tech, i) => (
              <span key={i} style={styles.skillChip}>{tech}</span>
            ))
          ) : (
            <span style={styles.noData}>NO_TECH_DETECTED</span>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' },
  headerLayout: { display: 'flex', alignItems: 'center', gap: '20px' },
  ringWrapper: { position: 'relative', width: '90px', height: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  svg: { transform: 'rotate(-90deg)' },
  backgroundCircle: { fill: 'none', stroke: '#1e293b', strokeWidth: 5 },
  progressCircle: { 
    fill: 'none', 
    stroke: '#be185d', 
    strokeWidth: 5, 
    strokeLinecap: 'round', 
    filter: 'drop-shadow(0 0 4px rgba(190, 24, 93, 0.6))', 
    transition: 'stroke-dashoffset 1s ease-in-out' 
  },
  scoreText: { position: 'absolute', display: 'flex', alignItems: 'baseline' },
  percentage: { fontSize: '20px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' },
  unit: { fontSize: '10px', color: '#be185d', fontWeight: 700, marginLeft: '1px' },
  statusBox: { display: 'flex', flexDirection: 'column', gap: '4px' },
  labelRow: { display: 'flex', alignItems: 'center', gap: '6px' },
  glowDot: { width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#be185d', boxShadow: '0 0 8px #be185d' },
  label: { fontSize: '9px', fontWeight: 800, color: '#475569', fontFamily: 'var(--font-mono)', letterSpacing: '1px' },
  matchTitle: { fontSize: '16px', fontWeight: 700, color: '#f1f5f9', margin: 0 },
  highlight: { color: '#be185d' },
  subText: { fontSize: '11px', color: '#64748b', margin: 0, fontFamily: 'var(--font-mono)' },
  skillsSection: { display: 'flex', flexDirection: 'column', gap: '10px' },
  chipGrid: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  skillChip: { 
    fontSize: '9px', 
    padding: '3px 10px', 
    backgroundColor: 'rgba(30, 41, 59, 0.6)', 
    border: '1px solid rgba(255, 255, 255, 0.08)', 
    borderRadius: '4px', 
    color: '#cbd5e1', 
    fontFamily: 'var(--font-mono)', 
    textTransform: 'uppercase', 
    letterSpacing: '0.5px' 
  },
  noData: { fontSize: '10px', color: '#334155', fontFamily: 'var(--font-mono)' }
};

export default PortfolioTop;