import React, { useMemo } from 'react';
import PortfolioTop from './portfolio_top';
import PortfolioAnalysis from './portfolio_analysis';

interface PortfolioMasterProps {
  data: any;           // The object from aiResults: { domain: string, content: string }
  isExpanded: boolean; 
}

const PortfolioMaster = ({ data, isExpanded }: PortfolioMasterProps) => {
  /**
   * RECURSIVE PARSER: 
   * Ensures 'parsed' is a JS Object even if 'content' was stringified multiple times.
   */
  console.log("Data in master ", data)
  const parsed = useMemo(() => {
    if (!data) return null;
    
    // 1. Get the raw string from the 'content' field
    let current = data.content || data; 

    // 2. Keep parsing until we have a real object (handles double-stringification)
    try {
      while (typeof current === 'string') {
        current = JSON.parse(current);
      }
      return current;
    } catch (e) {
      console.log("Here??")
      console.error("Critical Parse Error in PortfolioMaster:", e);
      return null;
    }
  }, [data]);

  // Handle empty or failed states
  if (!parsed || !parsed.overall_portfolio_strength) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.pulse}>INITIALIZING_PORTFOLIO_ENGINE...</div>
      </div>
    );
  }

  return (
    <div 
      style={{
        ...styles.container,
        ...(isExpanded ? styles.expandedLayout : styles.standardLayout)
      }} 
      className="custom-scroll"
    >
      {/* SECTION 1: Dynamic Top Summary */}
      <PortfolioTop 
        data = {parsed}
      />

      {/* SECTION 2: AI Verdict & Tech Badges */}
      <PortfolioAnalysis verdict = {parsed.portfolio_verdict} projects = {parsed.main_projects} data={parsed} />

      {/* SECTION 3: Deep Project Logs (Only visible in Expanded Grid) */}
      {isExpanded && parsed.main_projects && (
        <div style={styles.projectList}>
          <div style={styles.subHeader}>
            <span style={styles.line} />
            <span style={styles.subTitle}>DETAILED_PROJECT_LOGS</span>
          </div>

          <div style={styles.grid}>
            {parsed.main_projects.map((project: any, i: number) => (
              <div key={i} style={styles.card}>
                <div style={styles.cardTop}>
                  <h4 style={styles.title}>{project.title}</h4>
                  <div style={styles.relevanceTag}>RELEVANCE: {project.jd_relevance_score}%</div>
                </div>

                <p style={styles.desc}>{project.description}</p>

                <div style={styles.techRow}>
                  {project.tech_stack?.map((t: string) => (
                    <span key={t} style={styles.miniBadge}>{t}</span>
                  ))}
                </div>

                <div style={styles.depthContainer}>
                  <span style={styles.label}>TECHNICAL_DEPTH</span>
                  <p style={styles.depthText}>{project.technical_depth}</p>
                </div>

                {project.impact && (
                  <div style={styles.impactContainer}>
                    <span style={styles.impactLabel}>METRIC_IMPACT</span>
                    <p style={styles.impactText}>{project.impact}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { 
    height: '100%', 
    overflowY: 'auto', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '20px',
    backgroundColor: '#020617',
    color: '#f8fafc'
  },
  standardLayout: { padding: '16px' },
  expandedLayout: { padding: '32px' },
  emptyState: { 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    fontFamily: 'var(--font-mono)' 
  },
  pulse: { color: '#475569', fontSize: '10px', letterSpacing: '2px' },
  projectList: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px' },
  subHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
  line: { flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' },
  subTitle: { fontSize: '8px', color: '#be185d', fontWeight: 900, fontFamily: 'var(--font-mono)' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
    gap: '20px' 
  },
  card: { 
    background: 'rgba(255,255,255,0.01)', 
    border: '1px solid #1e293b', 
    padding: '20px', 
    borderRadius: '12px',
    transition: 'border-color 0.2s ease'
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  title: { margin: 0, fontSize: '15px', fontWeight: 700, color: '#f1f5f9' },
  relevanceTag: { fontSize: '9px', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' },
  desc: { fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '16px' },
  techRow: { display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' },
  miniBadge: { 
    fontSize: '9px', 
    background: '#0f172a', 
    border: '1px solid #1e293b', 
    padding: '2px 8px', 
    borderRadius: '4px', 
    color: '#64748b' 
  },
  depthContainer: { 
    background: '#09090b', 
    padding: '12px', 
    borderRadius: '6px', 
    borderLeft: '2px solid #334155',
    marginBottom: '10px'
  },
  label: { fontSize: '8px', fontWeight: 900, color: '#475569', display: 'block', marginBottom: '4px' },
  depthText: { fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5' },
  impactContainer: { 
    background: 'rgba(190, 24, 93, 0.05)', 
    padding: '12px', 
    borderRadius: '6px', 
    borderLeft: '2px solid #be185d' 
  },
  impactLabel: { fontSize: '8px', fontWeight: 900, color: '#be185d', display: 'block', marginBottom: '4px' },
  impactText: { fontSize: '12px', color: '#f8fafc', fontWeight: 500 }
};

export default PortfolioMaster;