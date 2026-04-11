import React from 'react';

const PortfolioAnalysis = ({ verdict = "", projects = [] }: any) => {
  console.log("Projects in analusis ", projects)
  return (
    <div style={styles.container}>
      <style>
        {`
          .custom-scroll::-webkit-scrollbar { width: 4px; }
          .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.01); }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(190, 24, 93, 0.3); border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: #be185d; box-shadow: 0 0 10px #be185d; }
        `}
      </style>

      <div style={styles.scrollWrapper} className="custom-scroll">
        {/* 1. PORTFOLIO VERDICT */}
        <div style={styles.section}>
          <div style={styles.highlightHeader}>
            <span style={styles.label}>PORTFOLIO_VERDICT</span>
          </div>
          <p style={styles.validationText}>{verdict}</p>
        </div>

        <div style={styles.divider} />

        {/* 2. PROJECT DEEP DIVE */}
        <div style={styles.section}>
          <div style={styles.highlightHeader}>
            <span style={styles.label}>PROJECT_DEEP_DIVE</span>
          </div>
          <div style={styles.list}>
            {projects.length > 0 ? (
              projects.map((proj: any, idx: number) => (
                <div key={idx} style={styles.projectBlock}>
                  <div style={styles.entryHeader}>
                    <span style={styles.projectName}>{proj.title?.toUpperCase()}</span>
                    <span style={styles.relevanceTag}>REL: {proj.jd_relevance_score}/10</span>
                  </div>
                  <div style={styles.description}>{proj.description}</div>
                  
                  <div style={styles.depthRow}>
                    <span style={styles.subLabel}>TECH_DEPTH: </span>
                    <span style={styles.depthText}>{proj.technical_depth}</span>
                  </div>

                  <div style={styles.impactWrapper}>
                    <span style={styles.subLabel}>IMPACT: </span>
                    <span style={styles.impactText}>{proj.impact}</span>
                  </div>

                  <div style={styles.skillTagContainer}>
                    {proj.tech_stack?.map((skill: string, i: number) => (
                      <span key={i} style={styles.miniTag}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyText}>NO_PROJECT_DATA_SYNTHESIZED</div>
            )}
          </div>
        </div>
        <div style={{ height: '40px', flexShrink: 0 }} />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  scrollWrapper: { flex: 1, display: 'flex', flexDirection: 'column', gap: '32px', overflowY: 'auto', paddingRight: '12px' },
  divider: { height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '100%', flexShrink: 0 },
  section: { display: 'flex', flexDirection: 'column', gap: '16px' },
  highlightHeader: { background: 'rgba(30, 41, 59, 0.5)', padding: '4px 12px', borderRadius: '4px', borderLeft: '3px solid #be185d', alignSelf: 'flex-start' },
  label: { fontSize: '11px', fontWeight: 900, color: '#f8fafc', fontFamily: 'var(--font-mono)', letterSpacing: '2.5px' },
  validationText: { fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', margin: 0, paddingLeft: '4px' },
  list: { display: 'flex', flexDirection: 'column', gap: '24px' },
  projectBlock: { borderLeft: '1px solid rgba(190, 24, 93, 0.3)', paddingLeft: '16px', position: 'relative' },
  entryHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  projectName: { fontSize: '12px', color: '#be185d', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '1px' },
  relevanceTag: { fontSize: '10px', color: '#10b981', fontFamily: 'var(--font-mono)', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' },
  description: { fontSize: '13px', color: '#f1f5f9', lineHeight: '1.5', marginBottom: '10px' },
  depthRow: { marginBottom: '8px' },
  impactWrapper: { marginTop: '4px', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.03)' },
  subLabel: { fontSize: '9px', color: '#475569', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '2px' },
  depthText: { fontSize: '11px', color: '#38bdf8', lineHeight: '1.4' },
  impactText: { fontSize: '11px', color: '#64748b', fontStyle: 'italic' },
  skillTagContainer: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' },
  miniTag: { fontSize: '9px', background: 'rgba(190, 24, 93, 0.05)', color: '#be185d', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(190, 24, 93, 0.2)', fontFamily: 'var(--font-mono)' },
  emptyText: { fontSize: '11px', color: '#334155', fontFamily: 'var(--font-mono)' }
};

export default PortfolioAnalysis;