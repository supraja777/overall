import React from 'react';
import { Candidate } from '../../../App';

interface LeftSectionProps {
  candidates: Candidate[];
  onSelect: (c: Candidate) => void;
}

const LeftSection = ({ candidates, onSelect }: LeftSectionProps) => {
  return (
    <div style={styles.sidebar} className="hide-scrollbar">
      {/* BRANDING HEADER */}
      <div style={styles.brand}>
        <div style={styles.logo}>✦</div>
        <h2 style={styles.brandName}>NEURAL_ANALYST</h2>
      </div>

      <div style={styles.content}>
        <span style={styles.label}>SAVED_CANDIDATES ({candidates.length})</span>
        
        <div style={styles.list}>
          {candidates.map((c) => (
            <div key={c.id} style={styles.itemCard} onClick={() => onSelect(c)}>
              <div 
                style={{
                  ...styles.avatar,
                  backgroundImage: c.photo ? `url(${c.photo})` : 'none',
                  border: c.photo ? '1px solid #be185d' : '1px solid rgba(255,255,255,0.05)'
                }} 
              >
                {!c.photo && <span style={styles.avatarInitial}>{c.name.charAt(0)}</span>}
              </div>
              
              <div style={styles.itemInfo}>
                <div style={styles.itemName}>{c.name.toUpperCase()}</div>
                <div style={styles.itemStatus}>INITIALIZE_ANALYSIS →</div>
              </div>
            </div>
          ))}

          {candidates.length === 0 && (
            <div style={styles.emptyHint}>NO_DATA_AVAILABLE</div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: { 
    width: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    background: '#020617', 
    height: '100%',
    overflowY: 'auto'
  },
  brand: { 
    padding: '24px 0', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    marginBottom: '24px'
  },
  logo: { 
    background: '#be185d', 
    width: '24px', 
    height: '24px', 
    borderRadius: '4px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: '#fff',
    fontSize: '14px',
    boxShadow: '0 0 10px rgba(190, 24, 93, 0.4)'
  },
  brandName: { 
    fontSize: '11px', 
    fontWeight: 900, 
    color: '#f1f5f9', 
    letterSpacing: '1.5px', 
    margin: 0,
    fontFamily: 'var(--font-mono)'
  },
  content: { 
    flex: 1, 
    display: 'flex',
    flexDirection: 'column'
  },
  label: { 
    fontSize: '9px', 
    fontWeight: 800, 
    color: '#475569', 
    letterSpacing: '1.2px', 
    marginBottom: '16px', 
    display: 'block',
    fontFamily: 'var(--font-mono)'
  },
  list: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px' 
  },
  itemCard: { 
    padding: '12px', 
    background: 'rgba(15, 23, 42, 0.4)', 
    borderRadius: '8px', 
    border: '1px solid rgba(255, 255, 255, 0.05)', 
    display: 'flex', 
    gap: '12px', 
    alignItems: 'center', 
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  avatar: { 
    width: '32px', 
    height: '32px', 
    borderRadius: '6px', // Square-ish avatar to match UI
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#0f172a'
  },
  avatarInitial: {
    color: '#be185d',
    fontSize: '12px',
    fontWeight: 800,
    fontFamily: 'var(--font-mono)'
  },
  itemInfo: { 
    overflow: 'hidden' 
  },
  itemName: { 
    fontSize: '11px', 
  //  fontWeight: 800, 
    color: '#f1f5f9', 
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.5px',
    fontWeight: 500, // Roboto looks best at 500 for semi-bold
  },
  itemStatus: { 
    fontSize: '9px', 
    color: '#be185d', 
    fontWeight: 700,
    marginTop: '2px',
    fontFamily: 'var(--font-mono)'
  },
  emptyHint: { 
    fontSize: '10px', 
    color: '#334155', 
    textAlign: 'center', 
    marginTop: '40px',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '1px'
  }
};

export default LeftSection;