import React from 'react';

interface MiddleSectionProps {
  results: { domain: string; content: string }[];
  overallResult: string | null;
  isLoading: boolean;
}

const MiddleSection = ({ results, overallResult, isLoading }: MiddleSectionProps) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>INTELLIGENCE FEED</h2>
        {isLoading && <span style={styles.statusPulse}>LIVE ANALYSIS ACTIVE</span>}
      </div>
      
      <div style={styles.feed}>
        {/* EXECUTIVE OVERALL REPORT - ALWAYS TOP */}
        {overallResult && (
          <div style={styles.overallCard}>
            <div style={styles.overallHeader}>
              <span style={styles.overallIcon}>💎</span>
              <span style={styles.overallLabel}>EXECUTIVE VERDICT</span>
            </div>
            <div style={styles.markdownContent}>{overallResult}</div>
          </div>
        )}

        {/* INDIVIDUAL SOURCE REPORTS */}
        {results.map((res, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.sourceLabel}>SOURCE:</span>
              <span style={styles.domainName}>{res.domain}</span>
            </div>
            <div style={styles.markdownContent}>{res.content}</div>
          </div>
        ))}

        {!isLoading && results.length === 0 && (
          <div style={styles.emptyState}>
            Queue sources in the sidebar to begin neural extraction.
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#0c0a0c',
    overflow: 'hidden',
    borderRight: '1px solid #1e293b'
  },
  header: {
    padding: '24px 40px',
    borderBottom: '1px solid #1e293b',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: { fontSize: '12px', fontWeight: 900, letterSpacing: '2px', color: '#94a3b8' },
  statusPulse: { fontSize: '10px', color: '#10b981', fontWeight: 700 },
  feed: {
    flex: 1,
    padding: '40px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  overallCard: {
    background: 'linear-gradient(145deg, #1e1b4b 0%, #0f172a 100%)',
    border: '1px solid #6366f1',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 10px 40px -10px rgba(99, 102, 241, 0.3)',
    marginBottom: '16px'
  },
  overallHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  overallIcon: { fontSize: '20px' },
  overallLabel: { fontWeight: 900, fontSize: '12px', color: '#818cf8', letterSpacing: '1.5px' },
  card: {
    background: '#111114',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '24px'
  },
  cardHeader: { display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' },
  sourceLabel: { fontSize: '10px', fontWeight: 700, color: '#475569' },
  domainName: { fontSize: '11px', fontWeight: 700, color: '#f1f5f9' },
  markdownContent: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#cbd5e1',
    whiteSpace: 'pre-wrap'
  },
  emptyState: { 
    textAlign: 'center', 
    marginTop: '100px', 
    color: '#475569', 
    fontSize: '13px',
    fontStyle: 'italic'
  }
};

export default MiddleSection;