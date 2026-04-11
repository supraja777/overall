import React from 'react';

interface MiddleSectionProps {
  results: { domain: string; content: string }[];
  overallResult: string | null;
  isLoading: boolean;
  selectedCandidate?: any; // Contains the candidate data including photo
}

const MiddleSection = ({ results = [], overallResult, isLoading, selectedCandidate }: MiddleSectionProps) => {
  return (
    <div style={styles.container}>
      {/* Optional Header - keeps the interface clean */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>INTELLIGENCE FEED</h2>
          {isLoading && (
            <div style={styles.loadingContainer}>
              <div style={styles.pulse} />
              <span style={styles.statusPulse}>LIVE ANALYSIS ACTIVE</span>
            </div>
          )}
        </div>
      </div>
      
      <div style={styles.feed}>
        
        {/* DEFAULT STATE: Photo of the candidate */}
        {selectedCandidate && (
          <div style={styles.photoCard}>
            <div 
              style={{
                ...styles.photo,
                backgroundImage: selectedCandidate.photo ? `url(${selectedCandidate.photo})` : 'none',
                backgroundColor: selectedCandidate.photo ? 'transparent' : '#1e293b' // Placeholder color if no photo
              }} 
            >
              {/* If there's no photo, show the first letter of their name */}
              {!selectedCandidate.photo && (
                <span style={styles.placeholderText}>
                  {selectedCandidate.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
        )}

        {/* PHASE 2: EXECUTIVE OVERALL REPORT (appears below photo) */}
        {overallResult && (
          <div style={styles.overallCard}>
            <div style={styles.overallHeader}>
              <span style={styles.overallIcon}>💎</span>
              <span style={styles.overallLabel}>EXECUTIVE VERDICT</span>
            </div>
            <div style={styles.markdownContent}>{overallResult}</div>
          </div>
        )}

        {/* PHASE 1: INDIVIDUAL SOURCE REPORTS (appears below photo/verdict) */}
        {results.map((res, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.sourceLabel}>SOURCE_ID:</span>
              <span style={styles.domainName}>{res.domain.toUpperCase()}</span>
            </div>
            <div style={styles.markdownContent}>{res.content}</div>
          </div>
        ))}
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
  // PHOTO CARD STYLES
  photoCard: {
    display: 'flex',
    justifyContent: 'center', // Centers the photo horizontally
    padding: '20px 0',
    marginBottom: '20px'
  },
  photo: {
    width: '120px', // Adjusted size to be prominent
    height: '120px',
    borderRadius: '12px', // Rounded edges matching the UI theme
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #1e293b' // Adds a clean border
  },
  placeholderText: {
    fontSize: '48px',
    fontWeight: 900,
    color: '#6366f1' // Uses the theme's purple accent color
  },
  // AI RESULT STYLES
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
    padding: '24px'
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
  }
};

export default MiddleSection;