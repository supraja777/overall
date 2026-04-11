import React, { useState } from 'react';
import ResumeAnalysis from '../grids/resume_analysis';
import PortfolioAnalysis from '../grids/portfolio_analysis';
import LeetCodeAnalysis from '../grids/leetcode_analysis';
import ExecutiveVerdict from '../grids/executive_verdict';

const MiddleSection = ({ results, overallResult, selectedCandidate, activeView, showGrid, isLoading }: any) => {
  const [expandedTile, setExpandedTile] = useState<number | null>(null);

  const renderTile = (index: number, title: string, content: any, label: string) => {
    const isExpanded = expandedTile === index;
    if (expandedTile !== null && !isExpanded) return null;

    return (
      <div 
        onClick={() => !isLoading && setExpandedTile(isExpanded ? null : index)}
        style={{ 
          ...styles.tile, 
          ...(isExpanded ? styles.expanded : {}),
          cursor: isLoading ? 'wait' : (isExpanded ? 'zoom-out' : 'pointer'),
        }}
      >
        <div style={styles.tileHeader}>
          <span style={styles.tileTitle}>{title}</span>
          <span style={styles.tileLabel}>{label}</span>
        </div>
        
        {/* Scrollable container that respects parent bounds */}
        <div style={styles.scrollContent} className="custom-scroll">
          {content}
        </div>

        {!isExpanded && !isLoading && <div style={styles.zoomHint}>CLICK_TO_EXPAND</div>}
      </div>
    );
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.header}>
        <h2 style={styles.title}>{showGrid ? "COMPETENCY_MATRIX" : "SOURCE_DOSSIER"}</h2>
      </div>
      <div style={styles.mainGridArea}>
        {showGrid ? (
          <div style={styles.grid}>
            {renderTile(0, "RESUME ALIGNMENT", isLoading ? <Loader /> : <ResumeAnalysis data={results.find((r: any) => r.domain === 'resume') || results[0]} />, "PDF_CORE")}
            {renderTile(1, "PROJECT DEPTH", isLoading ? <Loader /> : <PortfolioAnalysis data={results.find((r: any) => r.domain === 'portfolio') || results[1]} />, "WEB_PORTFOLIO")}
            {renderTile(2, "PROBLEM SOLVING", isLoading ? <Loader /> : <LeetCodeAnalysis data={results.find((r: any) => r.domain === 'leetcode') || results[2]} />, "LEETCODE_STATS")}
            {renderTile(3, "EXECUTIVE VERDICT", isLoading ? <Loader /> : <ExecutiveVerdict summary={overallResult} />, "AI_SYNTHESIS")}
          </div>
        ) : (
          <SourceViewer activeView={activeView} selectedCandidate={selectedCandidate} />
        )}
      </div>
    </div>
  );
};

const Loader = () => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div className="spinner"></div>
    <span style={{ fontSize: '9px', color: '#be185d', marginTop: '10px' }}>ANALYZING...</span>
  </div>
);

const SourceViewer = ({ activeView, selectedCandidate }: any) => {
  const isFile = activeView?.type === 'file';
  const source = isFile ? selectedCandidate?.resumeUrl : activeView?.content;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden' }}>
      <iframe src={source} style={{ flex: 1, border: 'none', background: '#fff' }} title="viewer" />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  outerContainer: { 
    height: '100%', 
    width: '100%',
    display: 'flex', 
    flexDirection: 'column', 
    background: '#09090b', 
    overflow: 'hidden' 
  },
  header: { 
    padding: '15px 30px', 
    borderBottom: '1px solid #1e293b', 
    flexShrink: 0 
  },
  title: { fontSize: '10px', fontWeight: 900, color: '#475569', letterSpacing: '2px' },
  
  mainGridArea: { 
    flex: 1, 
    padding: '30px', // Increased padding to give the grid "room to breathe"
    boxSizing: 'border-box',
    overflow: 'hidden'
  },

  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(2, 1fr)', 
    gridTemplateRows: 'repeat(2, 1fr)', 
    gap: '30px', // Forced 30px gap
    height: '100%', 
    width: '100%',
    boxSizing: 'border-box'
  },

  tile: { 
    background: '#111114', 
    border: '1px solid #1e293b', 
    borderRadius: '12px', 
    padding: '24px', 
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%', 
    width: '100%',
    overflow: 'hidden', // Forces internal scrolling
    position: 'relative',
    boxSizing: 'border-box'
  },

  expanded: { 
    gridColumn: '1 / -1', 
    gridRow: '1 / -1', 
    border: '2px solid #be185d', // Thicker border for clarity
    zIndex: 10 
  },

  tileHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    marginBottom: '15px', 
    flexShrink: 0 
  },
  tileTitle: { fontSize: '11px', fontWeight: 900, color: '#f8fafc' },
  tileLabel: { fontSize: '9px', fontWeight: 800, color: '#be185d' },

  scrollContent: { 
    flex: 1, 
    overflowY: 'auto', 
    overflowX: 'hidden',
    textAlign: 'left',
    paddingRight: '10px'
  },
  
  zoomHint: { position: 'absolute', bottom: '12px', right: '15px', fontSize: '8px', color: '#334155' }
};

export default MiddleSection;