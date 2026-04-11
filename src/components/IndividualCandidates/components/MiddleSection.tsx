import React from 'react';

interface MiddleSectionProps {
  results: { domain: string; content: string }[];
  overallResult: string | null;
  isLoading: boolean;
  selectedCandidate?: any; // Added to show who we are analyzing
}

const MiddleSection = ({ results = [], overallResult, isLoading, selectedCandidate }: MiddleSectionProps) => {
  return (
    <div style={styles.container}>
      {/* HEADER SECTION */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>INTELLIGENCE FEED</h2>
          {selectedCandidate && (
            <div style={styles.targetBadge}>
              TARGET: <span style={styles.targetName}>{selectedCandidate.name}</span>
            </div>
          )}
        </div>
        {isLoading && (
          <div style={styles.loadingContainer}>
            <div style={styles.pulse} />
            <span style={styles.statusPulse}>LIVE ANALYSIS ACTIVE</span>
          </div>
        )}
      </div>
      
      {/* MAIN FEED CONTENT */}
      <div style={styles.feed}>
        
        {/* PHASE 2: EXECUTIVE OVERALL REPORT (Top Priority) */}
        {overallResult && (
          <div style={styles.overallCard}>
            <div style={styles.overallHeader}>
              <span style={styles.overallIcon}>💎</span>
              <span style={styles.overallLabel}>EXECUTIVE VERDICT</span>
            </div>
            <div style={styles.markdownContent}>{overallResult}</div>
          </div>
        )}

        {/* PHASE 1: INDIVIDUAL SOURCE REPORTS (Mapped from Specialist Agents) */}
        {results.map((res, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.sourceLabel}>SOURCE_ID:</span>
              <span style={styles.domainName}>{res.domain.toUpperCase()}</span>
            </div>
            <div style={styles.markdownContent}>{res.content}</div>
          </div>
        ))}

        {/* EMPTY STATE / INITIAL STATE */}
        {!isLoading && results.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📡</div>
            <p>System idle. Ingest sources via the Neural Queue to begin synthesis.</p>
          </div>
        )}
        
        {/* LOADING PLACEHOLDER */}
        {isLoading && results.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.spinner} />
            <p style={{ color: '#6366f1' }}>INITIATING SOURCE DECODING...</p>
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
    background: '#0c0a0c', // Deep tech black
    overflow: 'hidden',
    borderRight: '1px solid #1e293b'
  },
  header: {
    padding: '24px 40px',
    borderBottom: '1px solid #1e293b',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#09090b'
  },
  title: { fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: '#475569', margin: 0 },
  targetBadge: { fontSize: '10px', color: '#6366f1', fontWeight: 800, marginTop: '4px' },
  targetName: { color: '#f1f5f9', letterSpacing: '0.5px' },
  loadingContainer: { display: 'flex', alignItems: 'center', gap: '8px' },
  pulse: { width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' },
  statusPulse: { fontSize: '10px', color: '#10b981', fontWeight: 700, letterSpacing: '1px' },
  feed: {
    flex: 1,
    padding: '40px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  overallCard: {
    background: 'linear-gradient(145deg, #1e1b4b 0%, #0f172a 100%)',
    border: '1px solid #6366f1',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 10px 40px -10px rgba(99, 102, 241, 0.4)',
    marginBottom: '10px'
  },
  overallHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  overallIcon: { fontSize: '20px' },
  overallLabel: { fontWeight: 900, fontSize: '11px', color: '#818cf8', letterSpacing: '1.5px' },
  card: {
    background: '#111114',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '24px',
    transition: 'all 0.3s ease'
  },
  cardHeader: { display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' },
  sourceLabel: { fontSize: '9px', fontWeight: 700, color: '#475569' },
  domainName: { fontSize: '10px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '1px' },
  markdownContent: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#cbd5e1',
    whiteSpace: 'pre-wrap',
    fontFamily: '"Inter", sans-serif'
  },
  emptyState: { 
    textAlign: 'center', 
    marginTop: '100px', 
    color: '#334155', 
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  emptyIcon: { fontSize: '32px', opacity: 0.5 },
  spinner: {
    width: '24px',
    height: '24px',
    border: '2px solid #1e293b',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

export default MiddleSection;