import React from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';

const AllCandidates = ({ jobDescription, setJobDescription, candidates, onSave, onSelect }: any) => {
  return (
    <div style={styles.viewPort}>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div style={styles.appContainer}>
        
        {/* PANEL 1: NAV */}
        <aside style={styles.leftPanel}>
          <div style={styles.panelHeader}>
            <div style={styles.activeDot} />
            <span style={styles.panelLabel}>SYSTEM_DIRECTORY</span>
          </div>
          <div className="hide-scrollbar" style={styles.scrollContent}>
            <LeftSection candidates={candidates} onSelect={onSelect} />
          </div>
        </aside>

        {/* PANEL 2: MAIN ANALYSIS (High Shine) */}
        <main style={styles.mainPanel}>
          <div style={styles.panelHeader}>
            <div style={styles.activeDot} />
            <span style={styles.panelLabel}>NEURAL_ANALYSIS</span>
          </div>
          <div className="hide-scrollbar" style={styles.scrollContent}>
            <MiddleSection onSave={onSave} />
          </div>
        </main>

        {/* PANEL 3: DATA */}
        <aside style={styles.rightPanel}>
          <div style={styles.panelHeader}>
            <div style={styles.activeDot} />
            <span style={styles.panelLabel}>DATA_SYNTHESIS</span>
          </div>
          <div className="hide-scrollbar" style={styles.scrollContent}>
            <RightSection 
            jobDescription = {jobDescription}
            setJobDescription = {setJobDescription}
            />
          </div>
        </aside>

      </div>
    </div>
  );
};

const styles = {
  viewPort: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#020617', // Deep midnight base
    display: 'flex',
    overflow: 'hidden',
    padding: '16px', // Increased viewport inset to frame the panels
    boxSizing: 'border-box' as const,
  },
  appContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    gap: '16px', // Increased space between the glowing panels
  },
  
  // Base style definition for the "High Shine" container
  panelBase: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    minWidth: 0,
    borderRadius: '16px',
    backgroundColor: 'rgba(15, 23, 42, 0.4)', // Darker, cleaner glass
    
    // TRIPLE-LAYER SHINE DEFINITION:
    // 1. The main "shiny" edge (1px solid white/30% opacity)
    border: '1px solid rgba(255, 255, 255, 0.3)',
    
    boxShadow: `
      /* 2. Soft outer white glow for depth */
      0 0 12px rgba(255, 255, 255, 0.05),
      /* 3. Viciously sharp INSET white glow (this is the key to shine) */
      inset 0 0 15px rgba(255, 255, 255, 0.15),
      /* 4. Secondary inset "rim light" for complex reflections */
      inset 0 0 1px rgba(255, 255, 255, 0.4)
    `,
  },

  leftPanel: {
    // Inherit base shine logic
    flex: 25,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    minWidth: 0,
    borderRadius: '16px',
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: `
      0 0 12px rgba(255, 255, 255, 0.05),
      inset 0 0 15px rgba(255, 255, 255, 0.15),
      inset 0 0 1px rgba(255, 255, 255, 0.4)
    `,
  },
  mainPanel: {
    flex: 37.5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    minWidth: 0,
    borderRadius: '16px',
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: `
      /* Standard complex white shine */
      0 0 12px rgba(255, 255, 255, 0.05),
      inset 0 0 15px rgba(255, 255, 255, 0.15),
      inset 0 0 1px rgba(255, 255, 255, 0.4),
      /* EXTRA NEON BLOOM: Add an outer bloom using the accent color for active panels */
      0 0 30px rgba(190, 24, 93, 0.2) 
    `,
  },
  rightPanel: {
    // Inherit base shine logic
    flex: 37.5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    minWidth: 0,
    borderRadius: '16px',
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: `
      0 0 12px rgba(255, 255, 255, 0.05),
      inset 0 0 15px rgba(255, 255, 255, 0.15),
      inset 0 0 1px rgba(255, 255, 255, 0.4)
    `,
  },
  
  panelHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)', // Sharp divider
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  activeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#be185d', // Pink active accent
    boxShadow: '0 0 12px #be185d',
  },
  panelLabel: {
    fontSize: '9px',
    fontWeight: 500, // Roboto 500
    color: '#94a3b8',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '2px', // Expanded tracking for "system" look
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
  }
};

export default AllCandidates;