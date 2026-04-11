import React from 'react';

const PortfolioAnalysis = ({ data }: any) => {
  // Extracting from the structure in your portfolio_agent_result.json
  const verdict = data?.portfolio_verdict || "Awaiting neural synthesis...";
  
  // Flattening the tech stack summary for the badges
  const stack = data?.tech_stack_summary;
  const allTech = stack 
    ? [...(stack.languages || []), ...(stack.frameworks || []), ...(stack.infrastructure || [])]
    : [];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.status}>ARCHITECTURAL_VERDICT</span>
      </div>
      
      <div style={styles.content}>
        <div style={styles.highlightCard}>
          <div style={styles.cardTag}>CORE_PROJECT_INSIGHT</div>
          <p style={styles.p}>{verdict}</p>
        </div>
        
        <div style={styles.stackRow}>
          {allTech.length > 0 ? (
            allTech.slice(0, 10).map((tech, index) => (
              <span key={index} style={styles.techBadge}>
                {tech.toUpperCase()}
              </span>
            ))
          ) : (
            <span style={styles.loadingText}>EXTRACTING_TECH_STACK...</span>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { width: '100%' },
  header: { marginBottom: '15px', textAlign: 'left' },
  status: { 
    fontSize: '9px', 
    fontWeight: 900, 
    color: '#10b981', 
    background: 'rgba(16,185,129,0.1)', 
    padding: '4px 8px', 
    borderRadius: '4px',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '1px'
  },
  content: { display: 'flex', flexDirection: 'column', gap: '15px' },
  highlightCard: { 
    background: 'rgba(255,255,255,0.02)', 
    border: '1px solid rgba(255,255,255,0.05)', 
    padding: '16px', 
    borderRadius: '8px', 
    textAlign: 'left' 
  },
  cardTag: { 
    fontSize: '8px', 
    fontWeight: 900, 
    color: '#475569', 
    marginBottom: '10px',
    fontFamily: 'var(--font-mono)' 
  },
  p: { 
    fontSize: '13px', 
    color: '#cbd5e1', 
    margin: 0, 
    lineHeight: '1.6',
    fontStyle: 'italic'
  },
  stackRow: { 
    display: 'flex', 
    gap: '6px', 
    flexWrap: 'wrap' 
  },
  techBadge: { 
    fontSize: '9px', 
    color: '#94a3b8', 
    background: '#0f172a',
    border: '1px solid #1e293b', 
    padding: '3px 10px', 
    borderRadius: '4px',
    fontFamily: 'var(--font-mono)',
    fontWeight: 600
  },
  loadingText: {
    fontSize: '10px',
    color: '#475569',
    fontFamily: 'var(--font-mono)'
  }
};

export default PortfolioAnalysis;