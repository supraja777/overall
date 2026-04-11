import React, { useState } from 'react';
// IMPORT YOUR ACTUAL GRID COMPONENTS
import ResumeAnalysis from '../grids/resume_analysis';
import PortfolioAnalysis from '../grids/portfolio_analysis';
import LeetCodeAnalysis from '../grids/leetcode_analysis';
import ExecutiveVerdict from '../grids/executive_verdict';

const MiddleSection = ({ results, overallResult, selectedCandidate, activeView, showGrid }: any) => {
  const [expandedTile, setExpandedTile] = useState<number | null>(null);

  // --- 1. THE ACTUAL GRID RENDERING ---
  const renderGrid = () => (
    <div style={styles.grid}>
      {/* TILE 0: RESUME ANALYSIS */}
      {renderTile(0, "RESUME ALIGNMENT", (
        <ResumeAnalysis data={results.find((r: any) => r.domain === 'resume') || results[0]} />
      ), "PDF_CORE")}

      {/* TILE 1: PORTFOLIO ANALYSIS */}
      {renderTile(1, "PROJECT DEPTH", (
        <PortfolioAnalysis data={results.find((r: any) => r.domain === 'portfolio') || results[1]} />
      ), "WEB_PORTFOLIO")}

      {/* TILE 2: LEETCODE ANALYSIS */}
      {renderTile(2, "PROBLEM SOLVING", (
        <LeetCodeAnalysis data={results.find((r: any) => r.domain === 'leetcode') || results[2]} />
      ), "LEETCODE_STATS")}

      {/* TILE 3: EXECUTIVE VERDICT */}
      {renderTile(3, "EXECUTIVE VERDICT", (
        <ExecutiveVerdict summary={overallResult} />
      ), "AI_SYNTHESIS")}
    </div>
  );

  const renderTile = (index: number, title: string, content: any, label: string) => {
    const isExpanded = expandedTile === index;
    // Hide other tiles when one is expanded
    if (expandedTile !== null && !isExpanded) return null;

    return (
      <div 
        onClick={() => setExpandedTile(isExpanded ? null : index)}
        style={{ 
          ...styles.tile, 
          ...(isExpanded ? styles.expanded : {}),
          // When expanded, we want to allow scrolling if the grid content is long
          overflowY: isExpanded ? 'auto' : 'hidden' 
        }}
      >
        <div style={styles.tileHeader}>
          <span style={styles.tileTitle}>{title}</span>
          <span style={styles.tileLabel}>{label}</span>
        </div>
        
        <div style={{
          ...styles.tileBody,
          alignItems: isExpanded ? 'flex-start' : 'center' // Align top when zoomed
        }}>
          {content}
        </div>

        {!isExpanded && <div style={styles.zoomHint}>CLICK_TO_EXPAND</div>}
      </div>
    );
  };

  // --- 2. THE SOURCE VIEWER (For PDF/URL view) ---
  const renderViewer = () => {
    if (!activeView) return <div style={styles.empty}>INITIALIZING_FORENSIC_STREAM...</div>;
    const isFile = activeView.type === 'file';
    const source = isFile ? selectedCandidate?.resumeUrl : activeView.content;

    return (
      <div style={styles.viewerFrame}>
        <div style={styles.browserBar}>
          <div style={styles.dots}><div style={styles.dot}></div><div style={styles.dot}></div><div style={styles.dot}></div></div>
          <div style={styles.address}>{isFile ? "SOURCE_RESUME.PDF" : source}</div>
        </div>
        <iframe src={isFile ? `${source}#toolbar=0` : source} style={styles.iframe} title="Source View" />
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{showGrid ? "COMPETENCY_MATRIX" : "SOURCE_DOSSIER"}</h2>
      </div>
      <div style={styles.contentContainer}>
        {showGrid ? renderGrid() : renderViewer()}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { flex: 1, display: 'flex', flexDirection: 'column', background: '#09090b', overflow: 'hidden' },
  header: { padding: '20px 40px', borderBottom: '1px solid #1e293b', background: '#09090b' },
  title: { fontSize: '10px', fontWeight: 900, color: '#475569', letterSpacing: '2px' },
  contentContainer: { flex: 1, padding: '20px', overflow: 'hidden' },

  // Grid Logic
  grid: { 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gridTemplateRows: '1fr 1fr', 
    gap: '20px', 
    height: '100%',
    width: '100%' 
  },
  tile: { 
    background: '#111114', 
    border: '1px solid #1e293b', 
    borderRadius: '12px', 
    padding: '24px', 
    display: 'flex', 
    flexDirection: 'column', 
    cursor: 'pointer', 
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative'
  },
  expanded: { 
    gridColumn: '1 / -1', 
    gridRow: '1 / -1', 
    border: '1px solid #be185d',
    background: '#0c0c0e',
    cursor: 'zoom-out'
  },
  
  tileHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
  tileTitle: { fontSize: '11px', fontWeight: 900, color: '#f8fafc', letterSpacing: '1px' },
  tileLabel: { fontSize: '9px', fontWeight: 800, color: '#be185d' },
  
  tileBody: { flex: 1, display: 'flex', justifyContent: 'center' },
  zoomHint: { position: 'absolute', bottom: '12px', right: '12px', fontSize: '8px', color: '#334155', fontWeight: 900 },

  // Viewer
  viewerFrame: { height: '100%', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  browserBar: { background: '#1e293b', padding: '12px', display: 'flex', alignItems: 'center', gap: '15px' },
  dots: { display: 'flex', gap: '6px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', background: '#475569' },
  address: { flex: 1, background: '#0f172a', color: '#94a3b8', fontSize: '10px', padding: '6px 12px', borderRadius: '4px', fontFamily: 'monospace' },
  iframe: { flex: 1, border: 'none', background: '#fff' },
  empty: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b', fontWeight: 900, letterSpacing: '4px' }
};

export default MiddleSection;