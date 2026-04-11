import React, { useState } from 'react';
import ResumeTop from '../grids/resume_top';
import PortfolioTop from '../grids/portfolio_top';
import LeetCodeTop from '../grids/leetcode_top';
import ExecutiveTop from '../grids/executive_top';
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
        
        {/* CRITICAL: scrollWrapper prevents internal text from breaking grid bounds */}
        <div style={styles.scrollWrapper} className="custom-scroll">
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
      <div style={styles.mainContent}>
        {showGrid ? (
          <div style={styles.grid}>
            {/* TILE 0: RESUME */}
            {renderTile(0, "RESUME ALIGNMENT", (
              <>
                <ResumeTop />
                <ResumeAnalysis data={results.find((r: any) => r.domain === 'resume') || results[0]} />
              </>
            ), "PDF_CORE")}

            {/* TILE 1: PORTFOLIO */}
            {renderTile(1, "PROJECT DEPTH", (
              <>
                <PortfolioTop />
                <PortfolioAnalysis data={results.find((r: any) => r.domain === 'portfolio') || results[1]} />
              </>
            ), "WEB_PORTFOLIO")}

            {/* TILE 2: LEETCODE */}
            {renderTile(2, "PROBLEM SOLVING", (
              <>
                <LeetCodeTop />
                <LeetCodeAnalysis data={results.find((r: any) => r.domain === 'leetcode') || results[2]} />
              </>
            ), "LEETCODE_STATS")}

            {/* TILE 3: EXECUTIVE VERDICT */}
            {renderTile(3, "EXECUTIVE VERDICT", (
              <>
                <ExecutiveTop />
                <ExecutiveVerdict summary={overallResult} />
              </>
            ), "AI_SYNTHESIS")}
          </div>
        ) : (
          <SourceViewer activeView={activeView} selectedCandidate={selectedCandidate} />
        )}
      </div>
    </div>
  );
};

const SourceViewer = ({ activeView, selectedCandidate }: any) => {
  if (!activeView) return <div style={styles.empty}>STREAMS_IDLE // AWAITING_SELECTION</div>;
  const isFile = activeView.type === 'file';
  const source = isFile ? selectedCandidate?.resumeUrl : activeView.content;
  return (
    <div style={styles.viewerFrame}>
      <div style={styles.browserBar}>
        <div style={styles.address}>{isFile ? "SOURCE_DOC.PDF" : source}</div>
      </div>
      <iframe src={source} style={styles.iframe} title="viewer" />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  outerContainer: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    background: '#09090b', 
    height: '100%', 
    width: '100%',
    overflow: 'hidden' 
  },
  header: { padding: '15px 30px', borderBottom: '1px solid #1e293b', flexShrink: 0 },
  title: { fontSize: '10px', fontWeight: 900, color: '#475569', letterSpacing: '2px' },
  mainContent: { 
    flex: 1, 
    padding: '25px', 
    overflow: 'hidden',
    display: 'flex'
  },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(2, 1fr)', 
    gridTemplateRows: 'repeat(2, minmax(0, 1fr))', // Forces rigid 50/50 split
    gap: '25px', 
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
    overflow: 'hidden', 
    position: 'relative',
    boxSizing: 'border-box'
  },
  expanded: { gridColumn: '1 / -1', gridRow: '1 / -1', border: '1px solid #be185d', zIndex: 10 },
  tileHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', flexShrink: 0 },
  tileTitle: { fontSize: '11px', fontWeight: 900, color: '#f8fafc' },
  tileLabel: { fontSize: '9px', fontWeight: 800, color: '#be185d' },
  scrollWrapper: { 
    flex: 1, 
    overflowY: 'auto', 
    textAlign: 'left',
    paddingRight: '10px'
  },
  zoomHint: { position: 'absolute', bottom: '12px', right: '15px', fontSize: '8px', color: '#334155' },
  viewerFrame: { height: '100%', width: '100%', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  browserBar: { background: '#1e293b', padding: '10px' },
  address: { background: '#0f172a', color: '#94a3b8', fontSize: '10px', padding: '4px 10px', borderRadius: '4px' },
  iframe: { flex: 1, border: 'none', background: '#fff' },
  empty: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b', fontWeight: 900 }
};

export default MiddleSection;