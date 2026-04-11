import React from 'react';

const MiddleSection = ({ results, overallResult, selectedCandidate, activeView }: any) => {
  
  // 1. RENDER SOURCE VIEWER (Resume or Website)
  if (activeView.type === 'file' || activeView.type === 'url') {
    const isFile = activeView.type === 'file';
    const displayUrl = isFile 
      ? (selectedCandidate?.resumeUrl || "") 
      : (activeView.content?.startsWith('http') ? activeView.content : `https://${activeView.content}`);

    return (
      <div style={styles.container}>
        <div style={styles.viewerHeader}>
          <div style={styles.dots}><div style={styles.dot}></div><div style={styles.dot}></div><div style={styles.dot}></div></div>
          <div style={styles.addressBar}>{isFile ? "SOURCE_RESUME.PDF" : displayUrl}</div>
        </div>
        <div style={styles.contentArea}>
          {isFile && !selectedCandidate?.resumeUrl ? (
            <div style={styles.fallbackText}><pre>{activeView.content}</pre></div>
          ) : (
            <iframe src={isFile ? `${displayUrl}#view=FitH` : displayUrl} style={styles.iframe} title="Source Viewer" />
          )}
        </div>
      </div>
    );
  }

  // 2. RENDER ANALYSIS FEED (Default / "Analyze Candidate" Clicked)
  return (
    <div style={styles.container}>
      <div style={styles.header}><h2 style={styles.title}>INTELLIGENCE_STREAM</h2></div>
      <div style={styles.feed}>
        {overallResult && (
          <div style={styles.overallCard}>
            <div style={styles.cardLabel}>💎 EXECUTIVE VERDICT</div>
            <div style={styles.cardContent}>{overallResult}</div>
          </div>
        )}

        {results.map((res: any, i: number) => (
          <div key={i} style={styles.reportCard}>
            <div style={styles.cardLabel}>SOURCE: {res.domain.toUpperCase()}</div>
            <div style={styles.cardContent}>{res.content}</div>
          </div>
        ))}
        
        {results.length === 0 && !overallResult && (
          <div style={styles.emptyState}>READY FOR ARCHITECTURAL ASSESSMENT</div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { flex: 1, display: 'flex', flexDirection: 'column', background: '#0c0a0c', overflow: 'hidden' },
  header: { padding: '24px 40px', borderBottom: '1px solid #1e293b', background: '#09090b' },
  title: { fontSize: '11px', fontWeight: 900, color: '#475569', letterSpacing: '2px' },
  feed: { flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' },
  
  // Viewer Styles
  viewerHeader: { background: '#1e293b', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '20px' },
  dots: { display: 'flex', gap: '8px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', background: '#475569' },
  addressBar: { flex: 1, background: '#0f172a', borderRadius: '6px', padding: '6px 16px', color: '#94a3b8', fontSize: '11px', fontFamily: 'monospace' },
  contentArea: { flex: 1, background: '#fff' },
  iframe: { width: '100%', height: '100%', border: 'none' },
  fallbackText: { padding: '40px', color: '#1e293b', background: '#fff', height: '100%', overflowY: 'auto' },

  // Feed Styles
  overallCard: { background: 'linear-gradient(145deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid #6366f1', borderRadius: '16px', padding: '32px' },
  reportCard: { background: '#111114', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' },
  cardLabel: { fontSize: '9px', fontWeight: 800, color: '#818cf8', marginBottom: '12px' },
  cardContent: { fontSize: '14px', lineHeight: '1.7', color: '#cbd5e1', whiteSpace: 'pre-wrap' },
  emptyState: { color: '#334155', textAlign: 'center', marginTop: '100px', fontWeight: 900, fontSize: '14px', letterSpacing: '4px' }
};

export default MiddleSection;