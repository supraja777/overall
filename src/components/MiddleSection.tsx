import React from 'react';

interface AnalysisResult {
  domain: string;
  content: string;
}

interface Props {
  results: AnalysisResult[];
  isLoading: boolean;
}

const MiddleSection = ({ results, isLoading }: Props) => {
  // Helper to dynamically style cards based on which Agent processed the data
  const getAgentTheme = (domain: string) => {
    const d = domain.toLowerCase();
    if (d.includes('linkedin')) {
      return {
        label: 'LINKEDIN STRATEGIST',
        color: '#0a66c2',
        border: 'rgba(10, 102, 194, 0.3)',
        bg: 'rgba(10, 102, 194, 0.05)'
      };
    }
    if (d.includes('leetcode')) {
      return {
        label: 'ALGO SPECIALIST',
        color: '#ffa116',
        border: 'rgba(255, 161, 22, 0.3)',
        bg: 'rgba(255, 161, 22, 0.05)'
      };
    }
    return {
      label: 'PORTFOLIO ANALYST',
      color: '#818cf8',
      border: 'rgba(129, 140, 248, 0.3)',
      bg: 'rgba(129, 140, 248, 0.05)'
    };
  };

  return (
    <div style={styles.container}>
      {/* Feed Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Intelligence Feed</h1>
          <p style={styles.subtitle}>Real-time multi-agent synthesis</p>
        </div>
        {isLoading && <div className="pulse" title="Agents are active..."></div>}
      </div>

      <div style={styles.feedScroll}>
        {results.length === 0 && !isLoading && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📡</div>
            <p>Awaiting source ingestion...</p>
            <span style={styles.emptyHint}>Add URLs in the left panel to begin analysis</span>
          </div>
        )}

        {results.map((res, i) => {
          const theme = getAgentTheme(res.domain);
          return (
            <div key={i} style={{ 
              ...styles.card, 
              borderLeft: `4px solid ${theme.color}`,
              backgroundColor: theme.bg
            }}>
              <div style={styles.cardTop}>
                <div style={{ ...styles.badge, color: theme.color, border: `1px solid ${theme.border}` }}>
                  {theme.label}
                </div>
                <span style={styles.domainName}>{res.domain}</span>
              </div>
              
              {/* This renders the complete multi-line analysis from the Agent */}
              <div style={styles.cardBody}>
                {res.content}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div style={styles.loadingIndicator}>
            <span style={styles.loadingText}>Synthesizing deep-profile data...</span>
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
    backgroundColor: '#020617', // Obsidian Deep Blue
    color: '#f8fafc',
  },
  header: {
    padding: '32px 40px',
    borderBottom: '1px solid #1e293b',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(2, 6, 23, 0.8)',
    backdropFilter: 'blur(10px)',
    zIndex: 10
  },
  title: { fontSize: '24px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' },
  subtitle: { fontSize: '13px', color: '#64748b', marginTop: '4px' },
  feedScroll: {
    padding: '32px 40px',
    overflowY: 'auto',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  card: {
    padding: '28px',
    borderRadius: '12px',
    background: '#09090b',
    border: '1px solid #1e293b',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.3s ease'
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  badge: {
    fontSize: '10px',
    fontWeight: 800,
    padding: '4px 10px',
    borderRadius: '4px',
    letterSpacing: '0.05em'
  },
  domainName: { fontSize: '12px', color: '#475569', fontWeight: 500 },
  cardBody: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#cbd5e1',
    whiteSpace: 'pre-wrap', // Essential for rendering AI bullet points/paragraphs
    wordBreak: 'break-word'
  },
  emptyState: {
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#334155'
  },
  emptyIcon: { fontSize: '48px', marginBottom: '16px', opacity: 0.3 },
  emptyHint: { fontSize: '12px', marginTop: '8px', opacity: 0.6 },
  loadingIndicator: {
    padding: '20px',
    textAlign: 'center',
    border: '1px dashed #1e293b',
    borderRadius: '12px'
  },
  loadingText: { fontSize: '13px', color: '#64748b', fontStyle: 'italic' }
};

export default MiddleSection;


// import { getFullContextForCompression } from '../utils/storage';

// const MiddleSection = () => {
//   const checkStorage = () => {
//     const data = getFullContextForCompression();
//     console.log("Current Global State:", JSON.parse(data));
//     alert(`Stored Analyses: ${JSON.parse(data).analyses.length}`);
//   };

//   return (
//     <button onClick={checkStorage} >
//       CHECK DB
//     </button>
//   );
// };

// export default MiddleSection;